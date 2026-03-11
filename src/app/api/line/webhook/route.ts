export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { sendLineMessage } from "@/lib/line";

function verifySignature(body: string, signature: string): boolean {
  const secret = process.env.LINE_CHANNEL_SECRET;
  if (!secret) return false;
  const hash = crypto
    .createHmac("SHA256", secret)
    .update(body)
    .digest("base64");
  return hash === signature;
}

export async function POST(request: NextRequest) {
  const bodyText = await request.text();
  const signature = request.headers.get("x-line-signature") || "";

  if (!verifySignature(bodyText, signature)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 403 });
  }

  const body = JSON.parse(bodyText);
  const events = body.events || [];

  for (const event of events) {
    if (event.type === "follow") {
      await sendLineMessage(
        event.source.userId,
        "こんにちは！動物病院予約システムです。\nこのトーク画面の下部メニューから予約できます。"
      );
    }

    if (event.type === "message" && event.message.type === "text") {
      const text = event.message.text;
      if (text.includes("予約")) {
        const liffId = process.env.NEXT_PUBLIC_LIFF_ID;
        const url = liffId
          ? `https://liff.line.me/${liffId}`
          : "予約ページのURLが設定されていません";
        await sendLineMessage(
          event.source.userId,
          `こちらから予約できます：\n${url}`
        );
      }
    }
  }

  return NextResponse.json({ ok: true });
}
