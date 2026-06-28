function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
}

export interface ContactEmailPayload {
  name: string
  email: string
  subject: string
  message: string
  siteUrl?: string
}

export function buildContactEmailText(payload: ContactEmailPayload): string {
  const { name, email, subject, message } = payload
  return [
    "New portfolio contact message",
    "─────────────────────────────",
    `Name: ${name}`,
    `Email: ${email}`,
    `Subject: ${subject}`,
    "",
    "Message:",
    message,
  ].join("\n")
}

export function buildContactEmailHtml(payload: ContactEmailPayload): string {
  const { name, email, subject, message, siteUrl = "https://arnold-rho.vercel.app" } = payload
  const safeName = escapeHtml(name)
  const safeEmail = escapeHtml(email)
  const safeSubject = escapeHtml(subject)
  const safeMessage = escapeHtml(message).replace(/\n/g, "<br />")
  const timestamp = new Date().toUTCString()

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Portfolio Contact</title>
</head>
<body style="margin:0;padding:0;background-color:#0a0f0c;font-family:'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#0a0f0c;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:560px;background:linear-gradient(180deg,#111916 0%,#0d1210 100%);border:1px solid #22c55e33;border-radius:16px;overflow:hidden;">
          <tr>
            <td style="padding:28px 32px 20px;background:linear-gradient(135deg,#14532d 0%,#0a0f0c 100%);border-bottom:1px solid #22c55e44;">
              <p style="margin:0 0 8px;font-size:11px;letter-spacing:0.28em;text-transform:uppercase;color:#86efac;">ARNOLD.DEV</p>
              <h1 style="margin:0;font-size:24px;line-height:1.3;color:#f0fdf4;font-weight:700;">New contact message</h1>
              <p style="margin:10px 0 0;font-size:13px;color:#86efac;">Portfolio inquiry · ${escapeHtml(timestamp)}</p>
            </td>
          </tr>
          <tr>
            <td style="padding:28px 32px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-bottom:20px;">
                <tr>
                  <td style="padding:14px 16px;background:#0a0f0c;border:1px solid #22c55e22;border-radius:10px;">
                    <p style="margin:0 0 4px;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:#86efac;">From</p>
                    <p style="margin:0;font-size:16px;color:#f0fdf4;font-weight:600;">${safeName}</p>
                    <p style="margin:6px 0 0;font-size:14px;color:#bbf7d0;">
                      <a href="mailto:${safeEmail}" style="color:#4ade80;text-decoration:none;">${safeEmail}</a>
                    </p>
                  </td>
                </tr>
              </table>
              <p style="margin:0 0 8px;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:#86efac;">Subject</p>
              <p style="margin:0 0 22px;font-size:17px;color:#f0fdf4;font-weight:600;">${safeSubject}</p>
              <p style="margin:0 0 8px;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:#86efac;">Message</p>
              <div style="padding:18px 20px;background:#0a0f0c;border:1px solid #22c55e22;border-radius:10px;font-size:15px;line-height:1.65;color:#d1fae5;">${safeMessage}</div>
              <table role="presentation" cellspacing="0" cellpadding="0" style="margin-top:28px;">
                <tr>
                  <td style="border-radius:8px;background:#22c55e;">
                    <a href="mailto:${safeEmail}?subject=Re:%20${encodeURIComponent(subject)}" style="display:inline-block;padding:12px 22px;font-size:14px;font-weight:600;color:#052e16;text-decoration:none;">Reply to ${safeName}</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:18px 32px 24px;border-top:1px solid #22c55e22;background:#0a0f0c;">
              <p style="margin:0;font-size:12px;line-height:1.5;color:#6ee7b7;text-align:center;">
                Sent from <a href="${escapeHtml(siteUrl)}/contact" style="color:#4ade80;text-decoration:none;">${escapeHtml(siteUrl)}/contact</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}
