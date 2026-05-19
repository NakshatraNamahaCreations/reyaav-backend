# Reya AV Backend

Small Express server that powers the contact form via Nodemailer.

## Setup

```bash
cd backend
npm install
cp .env.example .env   # then fill in real SMTP credentials
npm run dev
```

The server starts on `http://localhost:5000`.

## Endpoints

- `GET  /api/health` — health check
- `POST /api/mail/contact` — sends a contact email

### Contact payload

```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "phone": "+91 90000 00000",
  "subject": "Project enquiry",
  "message": "Hi, I'd like a quote..."
}
```

`name`, `email`, and `message` are required.

## Hostinger webmail SMTP

Hostinger SMTP settings (from hPanel → Emails → Email Accounts → Connect Apps & Devices):

| Setting       | Value                                       |
| ------------- | ------------------------------------------- |
| `SMTP_HOST`   | `smtp.hostinger.com`                        |
| `SMTP_PORT`   | `465` (SSL) — recommended, or `587` (TLS)   |
| `SMTP_SECURE` | `true` for port 465, `false` for port 587   |
| `SMTP_USER`   | full mailbox address, e.g. `info@reyaav.in`|
| `SMTP_PASS`   | the mailbox password you set in hPanel      |

`MAIL_FROM` **must** use the same address as `SMTP_USER` — Hostinger rejects sends where the From address doesn't match the authenticated mailbox.

If sends fail with an auth error, verify the mailbox password in hPanel (resetting it there is the fastest fix).

## Frontend usage

From the React app:

```js
await fetch("http://localhost:5000/api/mail/contact", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(formData),
});
```
