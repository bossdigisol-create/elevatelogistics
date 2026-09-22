// Shared contact-form schema: the same sanitize + validate rules run in the
// browser (instant feedback) and in /api/contact (the source of truth).

export const interests = [
  "Staffing Solutions",
  "Workforce Management",
  "Healthcare Consulting",
  "Other",
] as const;

export type ContactField =
  | "fullName"
  | "email"
  | "phone"
  | "org"
  | "interest"
  | "message";

export type ContactData = Record<ContactField, string>;
export type ContactErrors = Partial<Record<ContactField, string>>;

export const contactFields: ContactField[] = [
  "fullName",
  "email",
  "phone",
  "org",
  "interest",
  "message",
];

export const limits: Record<ContactField, number> = {
  fullName: 80,
  email: 254,
  phone: 20,
  org: 120,
  interest: 40,
  message: 3000,
};

// Strip HTML tags, control characters and (for single-line fields) line
// breaks — the latter also blocks email header injection.
export function sanitize(value: unknown, multiline = false): string {
  if (typeof value !== "string") return "";
  let v = value.normalize("NFKC").replace(/<[^>]*>/g, "");
  v = multiline
    ? v
        .replace(/\r\n?/g, "\n")
        .replace(/[\u0000-\u0009\u000B-\u001F\u007F]/g, "")
        .replace(/\n{3,}/g, "\n\n")
    : v.replace(/[\u0000-\u001F\u007F]/g, " ").replace(/\s+/g, " ");
  return v.trim();
}

export function sanitizeContact(input: Record<string, unknown>): ContactData {
  const out = {} as ContactData;
  for (const f of contactFields) {
    out[f] = sanitize(input[f], f === "message").slice(0, limits[f]);
  }
  out.email = out.email.toLowerCase();
  return out;
}

const nameRe = /^[\p{L}][\p{L}\p{M} .'-]*$/u;
const emailRe = /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)*\.[a-z]{2,}$/i;
const phoneRe = /^\+?[0-9\s().-]+$/;

export function validateContact(d: ContactData): ContactErrors {
  const e: ContactErrors = {};

  if (!d.fullName) e.fullName = "Please enter your full name.";
  else if (d.fullName.length < 2) e.fullName = "Name must be at least 2 characters.";
  else if (!nameRe.test(d.fullName))
    e.fullName = "Name can only contain letters, spaces, hyphens and apostrophes.";

  if (!d.email) e.email = "Please enter your email address.";
  else if (!emailRe.test(d.email)) e.email = "Please enter a valid email address.";

  const digits = d.phone.replace(/\D/g, "");
  if (!d.phone) e.phone = "Please enter your phone number.";
  else if (!phoneRe.test(d.phone) || digits.length < 10 || digits.length > 15)
    e.phone = "Please enter a valid phone number (10–15 digits).";

  if (!d.org) e.org = "Please enter your hospital or organization name.";
  else if (d.org.length < 2) e.org = "Organization name must be at least 2 characters.";

  if (!d.interest) e.interest = "Please select what you're interested in.";
  else if (!(interests as readonly string[]).includes(d.interest))
    e.interest = "Please select a valid option.";

  if (!d.message) e.message = "Please enter a message.";
  else if (d.message.length < 10) e.message = "Message must be at least 10 characters.";

  return e;
}
