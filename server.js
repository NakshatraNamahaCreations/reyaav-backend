import "dotenv/config";
import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";

import mailRouter from "./routes/mail.js";
import { verifyMailer } from "./config/mailer.js";

const app = express();
const PORT = process.env.PORT || 5000;

// Render (and most PaaS) put a proxy in front of the app; trust one hop so
// express-rate-limit can read the real client IP from X-Forwarded-For.
app.set("trust proxy", 1);

app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
  })
);
app.use(express.json({ limit: "100kb" }));

const mailLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: "Too many requests. Please try again later.",
  },
});

app.get("/api/health", (_req, res) => res.json({ ok: true }));
app.use("/api/mail", mailLimiter, mailRouter);

app.listen(PORT, () => {
  console.log(`Backend listening on http://localhost:${PORT}`);
  verifyMailer();
});
