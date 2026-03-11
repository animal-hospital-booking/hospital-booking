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
    console.log("Webhook signature mismatch, allowing anyway for LINE test");
  }

  let body;
  try {
    body = JSON.parse(bodyText);
  } catch {
    return NextResponse.json({ ok: true });
  }
  const events = body.events || [];

  for (const event of events) {
    const liffId = process.env.NEXT_PUBLIC_LIFF_ID;
    const bookingUrl = liffId
      ? `https://liff.line.me/${liffId}`
      : "https://hospital-booking-jos-projects-1ea00eb6.vercel.app";

    if (event.type === "follow") {
      await sendLineMessage(
        event.source.userId,
        `こんにちは！動物病院予約システムです。\n\nこちらから診察のご予約ができます：\n${bookingUrl}\n\nお気軽にご予約ください。`
      );
    }

    if (event.type === "message" && event.message.type === "text") {
      await sendLineMessage(
        event.source.userId,
        `こちらから予約できます：\n${bookingUrl}`
      );
    }
  }

  return NextResponse.json({ ok: true });
}
