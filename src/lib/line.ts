import { messagingApi } from "@line/bot-sdk";
import type { BookingRow } from "@/lib/db/bookings";

function getClient() {
  return new messagingApi.MessagingApiClient({
    channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN!,
  });
}

export async function sendLineBookingConfirmation(booking: BookingRow) {
  const token = process.env.LINE_CHANNEL_ACCESS_TOKEN;
  if (!token || !booking.line_user_id) return;

  const client = getClient();

  const dateFormatted = booking.date.replace(
    /(\d{4})-(\d{2})-(\d{2})/,
    "$1年$2月$3日"
  );

  await client.pushMessage({
    to: booking.line_user_id,
    messages: [
      {
        type: "flex",
        altText: "予約が確定しました",
        contents: {
          type: "bubble",
          header: {
            type: "box",
            layout: "vertical",
            contents: [
              {
                type: "text",
                text: "予約確定",
                weight: "bold",
                size: "lg",
                color: "#1DB446",
              },
            ],
            paddingBottom: "sm",
          },
          body: {
            type: "box",
            layout: "vertical",
            contents: [
              {
                type: "text",
                text: `${dateFormatted} ${booking.time}`,
                weight: "bold",
                size: "md",
              },
              {
                type: "separator",
                margin: "md",
              },
              {
                type: "box",
                layout: "vertical",
                margin: "md",
                spacing: "sm",
                contents: [
                  {
                    type: "box",
                    layout: "horizontal",
                    contents: [
                      { type: "text", text: "診察内容", size: "sm", color: "#999999", flex: 0 },
                      { type: "text", text: booking.consultation_type, size: "sm", align: "end" },
                    ],
                  },
                  {
                    type: "box",
                    layout: "horizontal",
                    contents: [
                      { type: "text", text: "ペット", size: "sm", color: "#999999", flex: 0 },
                      { type: "text", text: `${booking.pet_name}（${booking.pet_species}）`, size: "sm", align: "end" },
                    ],
                  },
                  {
                    type: "box",
                    layout: "horizontal",
                    contents: [
                      { type: "text", text: "飼い主", size: "sm", color: "#999999", flex: 0 },
                      { type: "text", text: booking.name, size: "sm", align: "end" },
                    ],
                  },
                ],
              },
            ],
          },
          footer: {
            type: "box",
            layout: "vertical",
            contents: [
              {
                type: "text",
                text: "ご来院をお待ちしております",
                size: "xs",
                color: "#999999",
                align: "center",
              },
            ],
          },
        },
      },
    ],
  });
}

export async function sendLineMessage(lineUserId: string, text: string) {
  const token = process.env.LINE_CHANNEL_ACCESS_TOKEN;
  if (!token) return;

  const client = getClient();
  await client.pushMessage({
    to: lineUserId,
    messages: [{ type: "text", text }],
  });
}
