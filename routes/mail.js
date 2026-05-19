import { Router } from "express";
import { transporter } from "../config/mailer.js";
import {
  buildContactEmail,
  buildNewsletterEmail,
} from "../utils/templates.js";

const router = Router();

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

router.post("/contact", async (req, res) => {
  const { name, email, phone, subject, message } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      error: "name, email, and message are required",
    });
  }

  if (!emailPattern.test(email)) {
    return res.status(400).json({
      success: false,
      error: "Invalid email address",
    });
  }

  try {
    const { html, text } = buildContactEmail({
      name,
      email,
      phone,
      subject,
      message,
    });

    await transporter.sendMail({
      from: process.env.MAIL_FROM,
      to: process.env.MAIL_TO,
      replyTo: email,
      subject: subject
        ? `[Reya AV] ${subject}`
        : `[Reya AV] New enquiry from ${name}`,
      text,
      html,
    });

    return res.json({ success: true });
  } catch (err) {
    console.error("Failed to send contact email:", err);
    return res.status(500).json({
      success: false,
      error: "Failed to send message. Please try again later.",
    });
  }
});

router.post("/newsletter", async (req, res) => {
  const { email } = req.body || {};

  if (!email || !emailPattern.test(email)) {
    return res.status(400).json({
      success: false,
      error: "A valid email address is required",
    });
  }

  try {
    const { html, text } = buildNewsletterEmail({ email });

    await transporter.sendMail({
      from: process.env.MAIL_FROM,
      to: process.env.MAIL_TO,
      replyTo: email,
      subject: `[Reya AV] New newsletter subscriber: ${email}`,
      text,
      html,
    });

    return res.json({ success: true });
  } catch (err) {
    console.error("Failed to send newsletter email:", err);
    return res.status(500).json({
      success: false,
      error: "Subscription failed. Please try again later.",
    });
  }
});

export default router;
