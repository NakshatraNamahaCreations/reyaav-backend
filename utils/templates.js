function escapeHtml(str = "") {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export function buildContactEmail({ name, email, phone, subject, message }) {
  const safe = {
    name: escapeHtml(name),
    email: escapeHtml(email),
    phone: escapeHtml(phone || "—"),
    subject: escapeHtml(subject || "—"),
    message: escapeHtml(message).replace(/\n/g, "<br/>"),
  };

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color:#111;border-bottom:2px solid #eee;padding-bottom:8px;">
        New enquiry from Reya AV website
      </h2>
      <table style="width:100%;border-collapse:collapse;">
        <tr><td style="padding:6px 0;"><strong>Name:</strong></td><td>${safe.name}</td></tr>
        <tr><td style="padding:6px 0;"><strong>Email:</strong></td><td>${safe.email}</td></tr>
        <tr><td style="padding:6px 0;"><strong>Phone:</strong></td><td>${safe.phone}</td></tr>
        <tr><td style="padding:6px 0;"><strong>Subject:</strong></td><td>${safe.subject}</td></tr>
      </table>
      <h3 style="margin-top:20px;">Message</h3>
      <p style="line-height:1.5;color:#333;">${safe.message}</p>
    </div>
  `;

  const text = [
    `New enquiry from Reya AV website`,
    ``,
    `Name: ${name}`,
    `Email: ${email}`,
    `Phone: ${phone || "—"}`,
    `Subject: ${subject || "—"}`,
    ``,
    `Message:`,
    message,
  ].join("\n");

  return { html, text };
}

export function buildNewsletterEmail({ email }) {
  const safeEmail = escapeHtml(email);
  const when = new Date().toISOString();

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color:#111;border-bottom:2px solid #eee;padding-bottom:8px;">
        New newsletter subscriber
      </h2>
      <p style="line-height:1.5;color:#333;">
        <strong>${safeEmail}</strong> subscribed to the Reya AV newsletter.
      </p>
      <p style="color:#666;font-size:12px;">Subscribed at ${when}</p>
    </div>
  `;

  const text = [
    `New newsletter subscriber`,
    ``,
    `Email: ${email}`,
    `Subscribed at: ${when}`,
  ].join("\n");

  return { html, text };
}
