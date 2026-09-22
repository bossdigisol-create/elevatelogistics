// Table-based, inline-styled HTML emails (the only layout that renders
// consistently across Gmail, Outlook and Apple Mail).
import type { ContactData } from "@/lib/contact";
import { site } from "@/lib/site";

export const LOGO_CID = "elevate-logo@elevatelogistic";

const BERRY = "#ad1765";
const BLUE = "#1600b5";
const INK = "#1b1530";
const MUTED = "#5f5a70";
const FONT = "'Segoe UI',Helvetica,Arial,sans-serif";

export function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

const nl2br = (s: string) => escapeHtml(s).replace(/\n/g, "<br>");

function layout(preheader: string, body: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="light">
<title>${escapeHtml(site.name)}</title>
</head>
<body style="margin:0;padding:0;background:#f4f2f8;">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;">${escapeHtml(preheader)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f4f2f8;">
<tr><td align="center" style="padding:32px 12px;">
  <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 8px 30px rgba(22,0,181,0.08);">
    <!-- Header -->
    <tr><td align="center" bgcolor="#ffffff" style="padding:32px 24px 24px;border-bottom:4px solid ${BERRY};">
      <img src="cid:${LOGO_CID}" width="72" height="72" alt="${escapeHtml(site.name)}" style="display:block;margin:0 auto;border:0;outline:none;">
      <div style="margin-top:12px;font-family:${FONT};font-size:20px;font-weight:700;letter-spacing:0.5px;color:${BLUE};">${escapeHtml(site.name)}</div>
      <div style="margin-top:4px;font-family:${FONT};font-size:12px;letter-spacing:2px;text-transform:uppercase;color:${BERRY};">Healthcare Workforce Solutions</div>
    </td></tr>
    <!-- Body -->
    <tr><td style="padding:32px 32px 24px;font-family:${FONT};color:${INK};font-size:15px;line-height:1.6;">
      ${body}
    </td></tr>
    <!-- Footer -->
    <tr><td align="center" bgcolor="${BLUE}" style="background:${BLUE};background-image:linear-gradient(90deg,${BERRY},${BLUE});padding:22px 24px;font-family:${FONT};font-size:13px;color:#ffffff;">
      © 2026 Elevate Logistic Solutions. All rights reserved.
    </td></tr>
  </table>
</td></tr>
</table>
</body>
</html>`;
}

const labels: [keyof ContactData, string][] = [
  ["fullName", "Full Name"],
  ["email", "Email Address"],
  ["phone", "Phone Number"],
  ["org", "Hospital / Organization"],
  ["interest", "Interested In"],
];

export function adminEmail(d: ContactData, submittedAt: string) {
  const rows = labels
    .map(([k, label], i) => {
      let value = escapeHtml(d[k]);
      if (k === "email") value = `<a href="mailto:${value}" style="color:${BERRY};text-decoration:none;">${value}</a>`;
      if (k === "phone") value = `<a href="tel:${escapeHtml(d.phone.replace(/[^\d+]/g, ""))}" style="color:${BERRY};text-decoration:none;">${value}</a>`;
      const bg = i % 2 === 0 ? "#faf8fc" : "#ffffff";
      return `<tr>
        <td width="38%" style="padding:12px 16px;background:${bg};font-size:13px;font-weight:600;color:${MUTED};border-bottom:1px solid #eee9f3;">${label}</td>
        <td style="padding:12px 16px;background:${bg};font-size:15px;color:${INK};border-bottom:1px solid #eee9f3;">${value}</td>
      </tr>`;
    })
    .join("");

  const body = `
    <h1 style="margin:0 0 6px;font-size:22px;color:${INK};">New Contact Form Submission</h1>
    <p style="margin:0 0 24px;color:${MUTED};font-size:14px;">Received ${escapeHtml(submittedAt)} via the website contact form.</p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid #eee9f3;border-radius:10px;overflow:hidden;font-family:${FONT};">
      ${rows}
    </table>
    <h2 style="margin:28px 0 10px;font-size:15px;text-transform:uppercase;letter-spacing:1.5px;color:${BERRY};">Message</h2>
    <div style="padding:16px 18px;background:#faf8fc;border-left:4px solid ${BLUE};border-radius:6px;color:${INK};">${nl2br(d.message)}</div>
    <p style="margin:28px 0 0;text-align:center;">
      <a href="mailto:${escapeHtml(d.email)}" style="display:inline-block;padding:12px 30px;border-radius:999px;background:${BERRY};color:#ffffff;font-weight:600;text-decoration:none;">Reply to ${escapeHtml(d.fullName)}</a>
    </p>`;

  const text = [
    "New Contact Form Submission",
    `Received ${submittedAt}`,
    "",
    ...labels.map(([k, label]) => `${label}: ${d[k]}`),
    "",
    "Message:",
    d.message,
    "",
    "© 2026 Elevate Logistic Solutions. All rights reserved.",
  ].join("\n");

  return {
    subject: `New inquiry from ${d.fullName} — ${d.interest}`,
    html: layout(`New inquiry from ${d.fullName} (${d.org})`, body),
    text,
  };
}

export function thankYouEmail(d: ContactData) {
  const first = d.fullName.split(" ")[0];
  const body = `
    <h1 style="margin:0 0 16px;font-size:22px;color:${INK};">Thank you for contacting us, ${escapeHtml(first)}!</h1>
    <p style="margin:0 0 14px;">We've received your message and appreciate you reaching out to <strong>${escapeHtml(site.name)}</strong>. A member of our team will review your inquiry and get back to you within <strong>one business day</strong>.</p>
    <p style="margin:0 0 24px;">Here's a quick summary of what you sent us:</p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#faf8fc;border-radius:10px;font-family:${FONT};">
      <tr><td style="padding:18px 20px;font-size:14px;line-height:1.8;color:${INK};">
        <strong style="color:${MUTED};">Interested In:</strong> ${escapeHtml(d.interest)}<br>
        <strong style="color:${MUTED};">Organization:</strong> ${escapeHtml(d.org)}<br>
        <strong style="color:${MUTED};">Phone:</strong> ${escapeHtml(d.phone)}
        <div style="margin-top:12px;padding-top:12px;border-top:1px solid #eee9f3;color:${INK};">${nl2br(d.message)}</div>
      </td></tr>
    </table>
    <p style="margin:24px 0 0;">If anything is urgent, simply reply to this email or write to us at <a href="mailto:${site.email}" style="color:${BERRY};text-decoration:none;font-weight:600;">${site.email}</a>.</p>
    <p style="margin:24px 0 0;">Warm regards,<br><strong style="color:${BLUE};">The ${escapeHtml(site.name)} Team</strong></p>`;

  const text = [
    `Thank you for contacting us, ${first}!`,
    "",
    `We've received your message and a member of the ${site.name} team will get back to you within one business day.`,
    "",
    `Interested In: ${d.interest}`,
    `Organization: ${d.org}`,
    `Phone: ${d.phone}`,
    "",
    d.message,
    "",
    `Warm regards,\nThe ${site.name} Team`,
    "",
    "© 2026 Elevate Logistic Solutions. All rights reserved.",
  ].join("\n");

  return {
    subject: `Thank you for contacting ${site.name}`,
    html: layout("We've received your message and will be in touch within one business day.", body),
    text,
  };
}
