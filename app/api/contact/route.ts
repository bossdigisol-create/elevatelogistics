import { sanitizeContact, validateContact } from "@/lib/contact";
import { adminEmail, thankYouEmail, LOGO_CID } from "@/lib/email-templates";
import { emailLogoPng } from "@/lib/email-logo";
import { mailerConfigured, sendMail, type MailAttachment } from "@/lib/mailer";
import { site } from "@/lib/site";

export const runtime = "nodejs";

export async function POST(req: Request) {
  if (!mailerConfigured()) {
    console.error("Contact form: no email backend is configured (Graph or SMTP env vars missing).");
    return Response.json(
      { ok: false, error: "Email service is not configured. Please try again later." },
      { status: 500 },
    );
  }

  // Public "from" address shown to recipients (e.g. info@...), the mailbox that
  // receives inquiries, and a friendly sender name. All overridable by env.
  const fromAddress = process.env.MAIL_FROM || process.env.MAIL_SENDER_UPN || site.email;
  const inboxAddress = process.env.MAIL_TO || process.env.MAIL_SENDER_UPN || fromAddress;

  let raw: Record<string, unknown>;
  try {
    raw = await req.json();
    if (!raw || typeof raw !== "object") throw new Error("bad body");
  } catch {
    return Response.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: real users never fill the hidden "website" field.
  if (typeof raw.website === "string" && raw.website.trim() !== "") {
    return Response.json({ ok: true });
  }

  const data = sanitizeContact(raw);
  const errors = validateContact(data);
  if (Object.keys(errors).length > 0) {
    return Response.json(
      { ok: false, error: "Please correct the highlighted fields.", errors },
      { status: 422 },
    );
  }

  const logo: MailAttachment = {
    filename: "elevate-logo.png",
    content: Buffer.from(emailLogoPng, "base64"),
    contentType: "image/png",
    cid: LOGO_CID,
  };

  const submittedAt = new Date().toLocaleString("en-US", {
    timeZone: "America/New_York",
    dateStyle: "long",
    timeStyle: "short",
  }) + " ET";

  const admin = adminEmail(data, submittedAt);
  const thanks = thankYouEmail(data);

  try {
    await sendMail({
      from: { name: `${site.name} Website`, address: fromAddress },
      to: { address: inboxAddress },
      replyTo: { name: data.fullName, address: data.email },
      subject: admin.subject,
      html: admin.html,
      text: admin.text,
      attachments: [logo],
    });
  } catch (err) {
    console.error("Contact form: failed to send admin email", err);
    return Response.json(
      { ok: false, error: "We couldn't send your message right now. Please try again shortly." },
      { status: 502 },
    );
  }

  // The inquiry is already delivered; a failed confirmation shouldn't fail the request.
  try {
    await sendMail({
      from: { name: site.name, address: fromAddress },
      to: { name: data.fullName, address: data.email },
      replyTo: { name: site.name, address: fromAddress },
      subject: thanks.subject,
      html: thanks.html,
      text: thanks.text,
      attachments: [logo],
    });
  } catch (err) {
    console.error("Contact form: failed to send confirmation email", err);
  }

  return Response.json({ ok: true });
}
