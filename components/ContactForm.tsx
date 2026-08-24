"use client";

import { useState } from "react";
import { site } from "@/lib/site";

const interests = [
  "Staffing Solutions",
  "Workforce Management",
  "Healthcare Consulting",
  "Other",
];

const fieldClass =
  "mt-2 w-full rounded-lg border border-black/15 bg-white px-4 py-3 text-ink outline-none transition focus:border-brand-berry focus:ring-2 focus:ring-brand-berry/20";

export default function ContactForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // No backend is wired up yet — this confirms locally.
    // Connect an email service / API route to actually deliver messages.
    setSent(true);
  }

  if (sent) {
    return (
      <div className="rounded-3xl bg-white p-10 text-center shadow-card">
        <div className="bg-grad-primary mx-auto flex h-16 w-16 items-center justify-center rounded-full text-white">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>
        <h3 className="mt-6 text-2xl font-bold">Thank you!</h3>
        <p className="mx-auto mt-3 max-w-md text-muted">
          Your message is ready to send. Our team gets back to you within one
          business day. You can also reach us directly at{" "}
          <a href={`mailto:${site.email}`} className="font-semibold text-brand-berry">
            {site.email}
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl bg-white p-8 shadow-card md:p-10"
    >
      <div className="text-center">
        <h2 className="text-2xl font-bold md:text-3xl">
          Looking for a trusted workforce solution partner?
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-muted">
          Fill out the form below, and our team will get back to you within one
          business day.
        </p>
      </div>

      <div className="mt-8 space-y-6">
        <div>
          <label className="font-semibold" htmlFor="fullName">
            Full Name
          </label>
          <input id="fullName" name="fullName" type="text" required className={fieldClass} />
        </div>

        <div>
          <label className="font-semibold" htmlFor="email">
            Email Address
          </label>
          <input id="email" name="email" type="email" required className={fieldClass} />
        </div>

        <div>
          <label className="font-semibold" htmlFor="phone">
            Phone Number
          </label>
          <input id="phone" name="phone" type="tel" className={fieldClass} />
        </div>

        <div>
          <label className="font-semibold" htmlFor="org">
            Hospital/Organization Name
          </label>
          <input
            id="org"
            name="org"
            type="text"
            placeholder="If Applicable"
            className={fieldClass}
          />
        </div>

        <fieldset>
          <legend className="font-semibold">I&apos;m Interested In:</legend>
          <div className="mt-3 space-y-2">
            {interests.map((opt) => (
              <label key={opt} className="flex items-center gap-3 text-ink">
                <input
                  type="radio"
                  name="interest"
                  value={opt}
                  className="h-4 w-4 accent-brand-berry"
                />
                {opt}
              </label>
            ))}
          </div>
        </fieldset>

        <div>
          <label className="font-semibold" htmlFor="message">
            Message
          </label>
          <textarea id="message" name="message" rows={6} className={fieldClass} />
        </div>

        <div className="text-center">
          <button type="submit" className="btn-pill w-full sm:w-auto sm:px-14">
            SUBMIT
          </button>
        </div>
      </div>
    </form>
  );
}
