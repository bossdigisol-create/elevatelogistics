// Sends transactional email for the contact form.
//
// Two backends, chosen at runtime by which env vars are present:
//   1. Microsoft Graph (preferred) — when MS_TENANT_ID / MS_CLIENT_ID /
//      MS_CLIENT_SECRET are set. Uses the OAuth2 client-credentials flow, so
//      no mailbox password is ever shared and it keeps working even though
//      Microsoft disables SMTP AUTH on new mailboxes by default.
//   2. SMTP (fallback) — when SMTP_USER / SMTP_PASS are set. Kept so the form
//      never breaks before the Graph credentials are in place.
import nodemailer from "nodemailer";

export type MailAddress = { name?: string; address: string };

export type MailAttachment = {
  filename: string;
  content: Buffer;
  contentType: string;
  cid: string;
};

export type OutgoingMail = {
  to: MailAddress;
  from: MailAddress;
  replyTo?: MailAddress;
  subject: string;
  html: string;
  text: string;
  attachments: MailAttachment[];
};

export function mailerConfigured(): "graph" | "smtp" | null {
  const { MS_TENANT_ID, MS_CLIENT_ID, MS_CLIENT_SECRET, SMTP_USER, SMTP_PASS } = process.env;
  if (MS_TENANT_ID && MS_CLIENT_ID && MS_CLIENT_SECRET) return "graph";
  if (SMTP_USER && SMTP_PASS) return "smtp";
  return null;
}

export async function sendMail(mail: OutgoingMail): Promise<void> {
  const backend = mailerConfigured();
  if (backend === "graph") return sendViaGraph(mail);
  if (backend === "smtp") return sendViaSmtp(mail);
  throw new Error("No email backend configured.");
}

// ---------------------------------------------------------------------------
// Microsoft Graph

async function graphToken(): Promise<string> {
  const tenant = process.env.MS_TENANT_ID!;
  const body = new URLSearchParams({
    client_id: process.env.MS_CLIENT_ID!,
    client_secret: process.env.MS_CLIENT_SECRET!,
    scope: "https://graph.microsoft.com/.default",
    grant_type: "client_credentials",
  });

  const res = await fetch(`https://login.microsoftonline.com/${tenant}/oauth2/v2.0/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });

  if (!res.ok) {
    throw new Error(`Graph token request failed (${res.status}): ${await res.text()}`);
  }
  const json = (await res.json()) as { access_token?: string };
  if (!json.access_token) throw new Error("Graph token response had no access_token.");
  return json.access_token;
}

function toGraphRecipient(a: MailAddress) {
  return { emailAddress: { address: a.address, name: a.name } };
}

async function sendViaGraph(mail: OutgoingMail): Promise<void> {
  const token = await graphToken();

  // The mailbox Graph acts on. Falls back to the From address.
  const sender = process.env.MAIL_SENDER_UPN || mail.from.address;

  const message = {
    subject: mail.subject,
    body: { contentType: "HTML", content: mail.html },
    from: toGraphRecipient(mail.from),
    toRecipients: [toGraphRecipient(mail.to)],
    ...(mail.replyTo ? { replyTo: [toGraphRecipient(mail.replyTo)] } : {}),
    attachments: mail.attachments.map((att) => ({
      "@odata.type": "#microsoft.graph.fileAttachment",
      name: att.filename,
      contentType: att.contentType,
      contentBytes: att.content.toString("base64"),
      isInline: true,
      contentId: att.cid,
    })),
  };

  const res = await fetch(
    `https://graph.microsoft.com/v1.0/users/${encodeURIComponent(sender)}/sendMail`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message, saveToSentItems: true }),
    },
  );

  // Graph returns 202 Accepted on success, with an empty body.
  if (!res.ok) {
    throw new Error(`Graph sendMail failed (${res.status}): ${await res.text()}`);
  }
}

// ---------------------------------------------------------------------------
// SMTP (fallback)

async function sendViaSmtp(mail: OutgoingMail): Promise<void> {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: Number(process.env.SMTP_PORT || 465),
    secure: Number(process.env.SMTP_PORT || 465) === 465,
    auth: { user: process.env.SMTP_USER!, pass: process.env.SMTP_PASS! },
  });

  await transporter.sendMail({
    from: mail.from,
    to: mail.to,
    replyTo: mail.replyTo,
    subject: mail.subject,
    html: mail.html,
    text: mail.text,
    attachments: mail.attachments.map((att) => ({
      filename: att.filename,
      content: att.content,
      contentType: att.contentType,
      cid: att.cid,
    })),
  });
}
