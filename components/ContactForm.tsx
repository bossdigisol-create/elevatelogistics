"use client";

import { useState } from "react";
import { ClipLoader } from "react-spinners";
import { site } from "@/lib/site";
import {
  interests,
  limits,
  sanitize,
  sanitizeContact,
  validateContact,
  type ContactData,
  type ContactErrors,
  type ContactField,
} from "@/lib/contact";

const fieldBase =
  "mt-2 w-full rounded-lg border bg-white px-4 py-3 text-ink outline-none transition focus:ring-2 disabled:opacity-60";
const fieldOk = "border-black/15 focus:border-brand-berry focus:ring-brand-berry/20";
const fieldBad = "border-red-500 focus:border-red-500 focus:ring-red-500/20";

const empty: ContactData = {
  fullName: "",
  email: "",
  phone: "",
  org: "",
  interest: "",
  message: "",
};

export default function ContactForm() {
  const [values, setValues] = useState<ContactData>(empty);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [touched, setTouched] = useState<Partial<Record<ContactField, boolean>>>({});
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [serverError, setServerError] = useState("");

  const sending = status === "sending";

  function update(field: ContactField, value: string) {
    const next = { ...values, [field]: value };
    setValues(next);
    if (touched[field]) {
      const err = validateContact(sanitizeContact(next))[field];
      setErrors((prev) => ({ ...prev, [field]: err }));
    }
  }

  function blur(field: ContactField) {
    setTouched((t) => ({ ...t, [field]: true }));
    const cleaned = sanitize(values[field], field === "message");
    setValues((v) => ({ ...v, [field]: cleaned }));
    const err = validateContact(sanitizeContact({ ...values, [field]: cleaned }))[field];
    setErrors((prev) => ({ ...prev, [field]: err }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (sending) return;
    setServerError("");

    const data = sanitizeContact(values);
    const errs = validateContact(data);
    setValues(data);
    setErrors(errs);
    setTouched({ fullName: true, email: true, phone: true, org: true, interest: true, message: true });
    if (Object.keys(errs).length > 0) {
      const first = Object.keys(errs)[0];
      document.getElementById(first === "interest" ? "interest-0" : first)?.focus();
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, website: honeypot }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json.ok) {
        if (json.errors) setErrors(json.errors);
        setServerError(json.error || "Something went wrong. Please try again.");
        setStatus("idle");
        return;
      }
      setStatus("sent");
    } catch {
      setServerError("Network error — please check your connection and try again.");
      setStatus("idle");
    }
  }

  if (status === "sent") {
    return (
      <div className="rounded-3xl bg-white p-10 text-center shadow-card" role="status">
        <div className="bg-grad-primary mx-auto flex h-16 w-16 items-center justify-center rounded-full text-white">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>
        <h3 className="mt-6 text-2xl font-bold">Thank you!</h3>
        <p className="mx-auto mt-3 max-w-md text-muted">
          Your message has been sent. We&apos;ve emailed a confirmation to{" "}
          <span className="font-semibold text-ink">{values.email}</span>, and our
          team will get back to you within one business day. You can also reach
          us directly at{" "}
          <a href={`mailto:${site.email}`} className="font-semibold text-brand-berry">
            {site.email}
          </a>
          .
        </p>
      </div>
    );
  }

  const cls = (f: ContactField) => `${fieldBase} ${errors[f] ? fieldBad : fieldOk}`;
  const errText = (f: ContactField) =>
    errors[f] ? (
      <p id={`${f}-error`} className="mt-1.5 text-sm text-red-600" role="alert">
        {errors[f]}
      </p>
    ) : null;
  const aria = (f: ContactField) => ({
    "aria-invalid": !!errors[f],
    "aria-describedby": errors[f] ? `${f}-error` : undefined,
  });
  const req = <span className="text-brand-berry" aria-hidden="true"> *</span>;

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-busy={sending}
      className="relative rounded-3xl bg-white p-8 shadow-card md:p-10"
    >
      <div className="text-center">
        <h2 className="text-2xl font-bold md:text-3xl">
          Looking for a trusted workforce solution partner?
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-muted">
          Fill out the form below, and our team will get back to you within one
          business day. All fields are required.
        </p>
      </div>

      {/* Honeypot — hidden from people, tempting to bots. */}
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      <fieldset disabled={sending} className="mt-8 space-y-6">
        <div>
          <label className="font-semibold" htmlFor="fullName">
            Full Name{req}
          </label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            autoComplete="name"
            required
            maxLength={limits.fullName}
            value={values.fullName}
            onChange={(e) => update("fullName", e.target.value)}
            onBlur={() => blur("fullName")}
            className={cls("fullName")}
            {...aria("fullName")}
          />
          {errText("fullName")}
        </div>

        <div>
          <label className="font-semibold" htmlFor="email">
            Email Address{req}
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            required
            maxLength={limits.email}
            value={values.email}
            onChange={(e) => update("email", e.target.value)}
            onBlur={() => blur("email")}
            className={cls("email")}
            {...aria("email")}
          />
          {errText("email")}
        </div>

        <div>
          <label className="font-semibold" htmlFor="phone">
            Phone Number{req}
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            required
            maxLength={limits.phone}
            placeholder="(555) 123-4567"
            value={values.phone}
            onChange={(e) => update("phone", e.target.value.replace(/[^\d\s()+.-]/g, ""))}
            onBlur={() => blur("phone")}
            className={cls("phone")}
            {...aria("phone")}
          />
          {errText("phone")}
        </div>

        <div>
          <label className="font-semibold" htmlFor="org">
            Hospital/Organization Name{req}
          </label>
          <input
            id="org"
            name="org"
            type="text"
            autoComplete="organization"
            required
            maxLength={limits.org}
            value={values.org}
            onChange={(e) => update("org", e.target.value)}
            onBlur={() => blur("org")}
            className={cls("org")}
            {...aria("org")}
          />
          {errText("org")}
        </div>

        <fieldset aria-describedby={errors.interest ? "interest-error" : undefined}>
          <legend className="font-semibold">I&apos;m Interested In:{req}</legend>
          <div className="mt-3 space-y-2">
            {interests.map((opt, i) => (
              <label key={opt} className="flex items-center gap-3 text-ink">
                <input
                  id={`interest-${i}`}
                  type="radio"
                  name="interest"
                  value={opt}
                  required
                  checked={values.interest === opt}
                  onChange={() => {
                    setValues((v) => ({ ...v, interest: opt }));
                    setTouched((t) => ({ ...t, interest: true }));
                    setErrors((prev) => ({ ...prev, interest: undefined }));
                  }}
                  className="h-4 w-4 accent-brand-berry"
                />
                {opt}
              </label>
            ))}
          </div>
          {errText("interest")}
        </fieldset>

        <div>
          <label className="font-semibold" htmlFor="message">
            Message{req}
          </label>
          <textarea
            id="message"
            name="message"
            rows={6}
            required
            maxLength={limits.message}
            value={values.message}
            onChange={(e) => update("message", e.target.value)}
            onBlur={() => blur("message")}
            className={cls("message")}
            {...aria("message")}
          />
          <div className="flex justify-between gap-4">
            {errText("message") ?? <span />}
            <span className="mt-1.5 shrink-0 text-xs text-muted">
              {values.message.length}/{limits.message}
            </span>
          </div>
        </div>

        {serverError && (
          <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
            {serverError}
          </p>
        )}

        <div className="text-center">
          <button
            type="submit"
            className="btn-pill inline-flex w-full items-center justify-center gap-3 disabled:cursor-not-allowed disabled:opacity-80 sm:w-auto sm:px-14"
          >
            {sending ? (
              <>
                <ClipLoader size={18} color="#ffffff" speedMultiplier={0.8} aria-label="Sending" />
                SENDING…
              </>
            ) : (
              "SUBMIT"
            )}
          </button>
        </div>
      </fieldset>
    </form>
  );
}
