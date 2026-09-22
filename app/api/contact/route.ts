import nodemailer from "nodemailer";
import { sanitizeContact, validateContact } from "@/lib/contact";
import { adminEmail, thankYouEmail, LOGO_CID } from "@/lib/email-templates";
import { emailLogoPng } from "@/lib/email-logo";
import { site } from "@/lib/site";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const { SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_USER || !SMTP_PASS) {
    console.error("Contact form: SMTP_USER / SMTP_PASS are not configured.");
    return Response.json(
      { ok: false, error: "Email service is not configured. Please try again later." },
      { status: 500 },
    );
  }

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

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: Number(process.env.SMTP_PORT || 465),
    secure: Number(process.env.SMTP_PORT || 465) === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  const logo = {
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
    await transporter.sendMail({
      from: { name: `${site.name} Website`, address: SMTP_USER },
      to: SMTP_USER,
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
    await transporter.sendMail({
      from: { name: site.name, address: SMTP_USER },
      to: { name: data.fullName, address: data.email },
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
