import nodemailer from "nodemailer";

const {
  SMTP_HOST,
  SMTP_PORT,
  SMTP_SECURE,
  SMTP_USER,
  SMTP_PASS,
} = process.env;

export const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: Number(SMTP_PORT) || 587,
  secure: SMTP_SECURE === "true",
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS,
  },
});

export async function verifyMailer() {
  try {
    await transporter.verify();
    console.log("SMTP transporter ready");
  } catch (err) {
    console.error("SMTP transporter failed to verify:", err.message);
  }
}
