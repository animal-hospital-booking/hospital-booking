import emailjs from "@emailjs/browser";

// EmailJS の設定
// 1. https://www.emailjs.com/ でアカウント作成
// 2. Email Service を追加（Gmail等）
// 3. Email Template を作成（下記テンプレート変数を使用）
// 4. 以下の値を設定

const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "";
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "";
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "";

export type EmailParams = {
  to_email: string;
  patient_name: string;
  booking_date: string;
  booking_time: string;
  symptoms: string;
};

export async function sendConfirmationEmail(
  params: EmailParams
): Promise<boolean> {
  if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
    console.warn("EmailJS is not configured. Skipping email.");
    return false;
  }

  try {
    await emailjs.send(SERVICE_ID, TEMPLATE_ID, params, PUBLIC_KEY);
    return true;
  } catch (error) {
    console.error("Failed to send email:", error);
    return false;
  }
}
