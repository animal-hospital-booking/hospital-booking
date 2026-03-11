#!/usr/bin/env node

/**
 * 病院セットアップ自動化スクリプト
 *
 * 使い方: node scripts/setup-hospital.mjs
 *
 * 必要なもの:
 * - Supabase アクセストークン
 * - Vercel アクセストークン
 * - LINE Channel Access Token & Secret（任意）
 */

import readline from "readline";
import { execSync } from "child_process";

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const ask = (q) => new Promise((r) => rl.question(q, r));

async function fetchJSON(url, options = {}) {
  const res = await fetch(url, options);
  const text = await res.text();
  try {
    return JSON.parse(text);
  } catch {
    throw new Error(`API error (${res.status}): ${text}`);
  }
}

// ─── Step 1: 基本情報 ───
async function getConfig() {
  console.log("\n╔══════════════════════════════════════╗");
  console.log("║   動物病院予約システム セットアップ   ║");
  console.log("╚══════════════════════════════════════╝\n");

  const hospitalName = await ask("病院名 (例: さくら動物病院): ");
  const projectSlug = await ask("プロジェクト名 (英数字, 例: sakura-clinic): ");

  console.log("\n--- 認証トークン ---");
  const supabaseToken = await ask("Supabase アクセストークン: ");
  const vercelToken = await ask("Vercel アクセストークン (空でスキップ): ");

  console.log("\n--- LINE設定 (空でスキップ) ---");
  const lineChannelAccessToken = await ask("LINE Channel Access Token: ");
  const lineChannelSecret = await ask("LINE Channel Secret: ");
  const liffId = await ask("LIFF ID: ");

  const googleClientId = await ask("\nGoogle Client ID (空でスキップ): ");

  return {
    hospitalName,
    projectSlug,
    supabaseToken,
    vercelToken,
    lineChannelAccessToken,
    lineChannelSecret,
    liffId,
    googleClientId,
  };
}

// ─── Step 2: Supabase プロジェクト作成 ───
async function setupSupabase(config) {
  console.log("\n🔧 Supabase セットアップ中...");

  // Get or create org
  const orgs = await fetchJSON("https://api.supabase.com/v1/organizations", {
    headers: { Authorization: `Bearer ${config.supabaseToken}` },
  });

  let orgId;
  if (orgs.length > 0) {
    orgId = orgs[0].id;
    console.log(`  ✓ 組織: ${orgs[0].name}`);
  } else {
    const org = await fetchJSON("https://api.supabase.com/v1/organizations", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${config.supabaseToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: config.projectSlug }),
    });
    orgId = org.id;
    console.log(`  ✓ 組織作成: ${org.name}`);
  }

  // Create project
  const dbPass = `Hosp${Date.now()}!Aa`;
  const project = await fetchJSON("https://api.supabase.com/v1/projects", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.supabaseToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      organization_id: orgId,
      name: config.projectSlug,
      db_pass: dbPass,
      region: "ap-northeast-1",
      plan: "free",
    }),
  });
  console.log(`  ✓ プロジェクト作成: ${project.name} (${project.ref})`);

  // Wait for project to be ready
  console.log("  ⏳ プロジェクト起動待ち...");
  for (let i = 0; i < 30; i++) {
    await new Promise((r) => setTimeout(r, 3000));
    const status = await fetchJSON(
      `https://api.supabase.com/v1/projects/${project.ref}`,
      { headers: { Authorization: `Bearer ${config.supabaseToken}` } }
    );
    if (status.status === "ACTIVE_HEALTHY") {
      console.log("  ✓ プロジェクト起動完了");
      break;
    }
    if (i === 29) console.log("  ⚠ タイムアウト（手動で確認してください）");
  }

  // Get API keys
  const keys = await fetchJSON(
    `https://api.supabase.com/v1/projects/${project.ref}/api-keys`,
    { headers: { Authorization: `Bearer ${config.supabaseToken}` } }
  );
  const anonKey = keys.find((k) => k.name === "anon")?.api_key;
  const serviceKey = keys.find((k) => k.name === "service_role")?.api_key;

  // Create table
  console.log("  🗄️ テーブル作成中...");
  await fetchJSON(
    `https://api.supabase.com/v1/projects/${project.ref}/database/query`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${config.supabaseToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
          CREATE TABLE IF NOT EXISTS bookings (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            date TEXT NOT NULL,
            time TEXT NOT NULL,
            consultation_type TEXT NOT NULL DEFAULT '',
            name TEXT NOT NULL,
            phone TEXT NOT NULL,
            email TEXT NOT NULL DEFAULT '',
            symptoms TEXT DEFAULT '',
            pet_name TEXT NOT NULL DEFAULT '',
            pet_name_kana TEXT NOT NULL DEFAULT '',
            pet_species TEXT NOT NULL DEFAULT '',
            pet_breed TEXT DEFAULT '',
            pet_sex TEXT NOT NULL DEFAULT '',
            pet_birth_date TEXT DEFAULT '',
            status TEXT NOT NULL DEFAULT 'confirmed',
            google_event_id TEXT,
            line_user_id TEXT,
            created_at TIMESTAMPTZ DEFAULT NOW()
          );
          CREATE INDEX IF NOT EXISTS idx_bookings_date ON bookings(date);
          CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
          CREATE INDEX IF NOT EXISTS idx_bookings_line_user ON bookings(line_user_id);
          CREATE INDEX IF NOT EXISTS idx_bookings_created_at ON bookings(created_at DESC);
        `,
      }),
    }
  );
  console.log("  ✓ テーブル作成完了");

  return {
    url: `https://${project.ref}.supabase.co`,
    anonKey,
    serviceKey,
    ref: project.ref,
  };
}

// ─── Step 3: Vercel デプロイ ───
async function setupVercel(config, supabase) {
  if (!config.vercelToken) {
    console.log("\n⏭️  Vercel スキップ（トークン未設定）");
    return null;
  }

  console.log("\n🚀 Vercel セットアップ中...");

  // Get team/user info
  const user = await fetchJSON("https://api.vercel.com/v2/user", {
    headers: { Authorization: `Bearer ${config.vercelToken}` },
  });
  console.log(`  ✓ Vercelユーザー: ${user.user?.name || user.user?.username}`);

  // Create project
  const project = await fetchJSON("https://api.vercel.com/v10/projects", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.vercelToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: config.projectSlug,
      framework: "nextjs",
      gitRepository: {
        repo: "animal-hospital-booking/hospital-booking",
        type: "github",
      },
    }),
  });

  const projectId = project.id || project.projectId;
  if (!projectId) {
    // Project might already exist, try to get it
    console.log("  ⚠ プロジェクト作成失敗、既存プロジェクトを確認...");
  } else {
    console.log(`  ✓ プロジェクト作成: ${config.projectSlug}`);
  }

  // Set environment variables
  const envVars = [
    { key: "NEXT_PUBLIC_SUPABASE_URL", value: supabase.url },
    { key: "NEXT_PUBLIC_SUPABASE_ANON_KEY", value: supabase.anonKey },
    { key: "SUPABASE_SERVICE_ROLE_KEY", value: supabase.serviceKey },
  ];

  if (config.googleClientId) {
    envVars.push({ key: "NEXT_PUBLIC_GOOGLE_CLIENT_ID", value: config.googleClientId });
  }
  if (config.lineChannelAccessToken) {
    envVars.push({ key: "LINE_CHANNEL_ACCESS_TOKEN", value: config.lineChannelAccessToken });
  }
  if (config.lineChannelSecret) {
    envVars.push({ key: "LINE_CHANNEL_SECRET", value: config.lineChannelSecret });
  }
  if (config.liffId) {
    envVars.push({ key: "NEXT_PUBLIC_LIFF_ID", value: config.liffId });
  }
  envVars.push({ key: "NEXT_PUBLIC_HOSPITAL_NAME", value: config.hospitalName });

  console.log("  🔑 環境変数設定中...");
  for (const env of envVars) {
    await fetchJSON(
      `https://api.vercel.com/v10/projects/${projectId || config.projectSlug}/env`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${config.vercelToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          key: env.key,
          value: env.value,
          type: "encrypted",
          target: ["production", "preview"],
        }),
      }
    );
  }
  console.log(`  ✓ ${envVars.length}個の環境変数を設定`);

  // Disable deployment protection
  if (projectId) {
    await fetchJSON(`https://api.vercel.com/v9/projects/${projectId}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${config.vercelToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        vercelAuthentication: { deploymentType: "none" },
        passwordProtection: null,
      }),
    });
    console.log("  ✓ デプロイメント保護を無効化");
  }

  // Deploy using CLI
  console.log("  📦 デプロイ中...");
  try {
    const output = execSync("npx vercel deploy --prod --yes --skip-domain 2>&1", {
      encoding: "utf-8",
      timeout: 180000,
    });
    const urlMatch = output.match(/https:\/\/[^\s]+\.vercel\.app/);
    const deployUrl = urlMatch ? urlMatch[urlMatch.length - 1] : null;
    console.log(`  ✓ デプロイ完了: ${deployUrl || "(URL確認してください)"}`);
    return deployUrl;
  } catch (e) {
    console.log("  ⚠ CLIデプロイ失敗。Vercelダッシュボードから手動デプロイしてください");
    return null;
  }
}

// ─── Step 4: LINE Webhook 設定 ───
async function setupLineWebhook(config, deployUrl) {
  if (!config.lineChannelAccessToken || !deployUrl) {
    console.log("\n⏭️  LINE Webhook スキップ");
    return;
  }

  console.log("\n📱 LINE セットアップ中...");

  // Set webhook URL
  await fetchJSON("https://api.line.me/v2/bot/channel/webhook/endpoint", {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${config.lineChannelAccessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ endpoint: `${deployUrl}/api/line/webhook` }),
  });
  console.log("  ✓ Webhook URL 設定完了");

  // Create rich menu
  const richMenu = await fetchJSON("https://api.line.me/v2/bot/richmenu", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.lineChannelAccessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      size: { width: 2500, height: 843 },
      selected: true,
      name: "予約メニュー",
      chatBarText: "メニュー",
      areas: [
        {
          bounds: { x: 0, y: 0, width: 2500, height: 843 },
          action: {
            type: "uri",
            label: "予約はこちら",
            uri: config.liffId
              ? `https://liff.line.me/${config.liffId}`
              : deployUrl,
          },
        },
      ],
    }),
  });
  console.log(`  ✓ リッチメニュー作成: ${richMenu.richMenuId}`);

  // Create and upload rich menu image
  try {
    execSync(
      `python3 -c "
from PIL import Image, ImageDraw, ImageFont
import os
img = Image.new('RGB', (2500, 843), color=(0, 102, 204))
draw = ImageDraw.Draw(img)
font = None
for p in ['/System/Library/Fonts/ヒラギノ角ゴシック W6.ttc', '/System/Library/Fonts/Hiragino Sans GB.ttc']:
    if os.path.exists(p):
        try:
            font = ImageFont.truetype(p, 90)
            break
        except: pass
if not font:
    for p in ['/System/Library/Fonts/Supplemental/Arial Unicode.ttf']:
        if os.path.exists(p):
            try:
                font = ImageFont.truetype(p, 90)
                break
            except: pass
if not font: font = ImageFont.load_default()
text = '予約はこちら'
bbox = draw.textbbox((0,0), text, font=font)
tw, th = bbox[2]-bbox[0], bbox[3]-bbox[1]
draw.text(((2500-tw)/2, (843-th)/2-20), text, fill='white', font=font)
small = ImageFont.truetype(font.path, 40) if hasattr(font,'path') else font
sub = 'タップして診察予約ができます'
bbox2 = draw.textbbox((0,0), sub, font=small)
draw.text(((2500-(bbox2[2]-bbox2[0]))/2, (843-th)/2+th+10), sub, fill=(200,220,255), font=small)
img.save('/tmp/richmenu_setup.png')
"`,
      { encoding: "utf-8" }
    );

    // Upload image
    const imageData = (await import("fs")).readFileSync("/tmp/richmenu_setup.png");
    await fetch(
      `https://api-data.line.me/v2/bot/richmenu/${richMenu.richMenuId}/content`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${config.lineChannelAccessToken}`,
          "Content-Type": "image/png",
        },
        body: imageData,
      }
    );
    console.log("  ✓ リッチメニュー画像アップロード完了");
  } catch (e) {
    console.log("  ⚠ リッチメニュー画像作成失敗（手動で設定してください）");
  }

  // Set as default
  await fetchJSON(
    `https://api.line.me/v2/bot/user/all/richmenu/${richMenu.richMenuId}`,
    {
      method: "POST",
      headers: { Authorization: `Bearer ${config.lineChannelAccessToken}` },
    }
  );
  console.log("  ✓ デフォルトリッチメニュー設定完了");

  // Get bot info
  const botInfo = await fetchJSON("https://api.line.me/v2/bot/info", {
    headers: { Authorization: `Bearer ${config.lineChannelAccessToken}` },
  });
  return botInfo;
}

// ─── Main ───
async function main() {
  try {
    const config = await getConfig();

    // Supabase
    const supabase = await setupSupabase(config);

    // Vercel
    const deployUrl = await setupVercel(config, supabase);

    // LINE
    const botInfo = await setupLineWebhook(config, deployUrl);

    // Summary
    console.log("\n╔══════════════════════════════════════╗");
    console.log("║         セットアップ完了！            ║");
    console.log("╚══════════════════════════════════════╝\n");
    console.log(`  病院名:     ${config.hospitalName}`);
    console.log(`  Supabase:   ${supabase.url}`);
    if (deployUrl) {
      console.log(`  予約ページ: ${deployUrl}`);
      console.log(`  管理画面:   ${deployUrl}/admin`);
    }
    if (botInfo) {
      console.log(`  LINE ID:    ${botInfo.basicId}`);
      console.log(`  友だち追加: https://line.me/R/ti/p/${botInfo.basicId}`);
    }

    console.log("\n--- 環境変数 (.env.local) ---");
    console.log(`NEXT_PUBLIC_SUPABASE_URL=${supabase.url}`);
    console.log(`NEXT_PUBLIC_SUPABASE_ANON_KEY=${supabase.anonKey}`);
    console.log(`SUPABASE_SERVICE_ROLE_KEY=${supabase.serviceKey}`);
    if (config.googleClientId) console.log(`NEXT_PUBLIC_GOOGLE_CLIENT_ID=${config.googleClientId}`);
    if (config.liffId) console.log(`NEXT_PUBLIC_LIFF_ID=${config.liffId}`);
    if (config.lineChannelAccessToken) console.log(`LINE_CHANNEL_ACCESS_TOKEN=${config.lineChannelAccessToken}`);
    if (config.lineChannelSecret) console.log(`LINE_CHANNEL_SECRET=${config.lineChannelSecret}`);

  } catch (e) {
    console.error("\n❌ エラー:", e.message);
  } finally {
    rl.close();
  }
}

main();
