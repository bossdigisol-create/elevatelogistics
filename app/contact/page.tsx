import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ContactForm from "@/components/ContactForm";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Tell us what you need, and we’ll create a workforce solution for you. Our team gets back to you within one business day.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        title="Let’s Build Your Healthcare Workforce Together"
        subtitle="Tell us what you need, and we’ll create a workforce solution for you."
      />

      <section className="section-x py-16 md:py-24">
        <div className="mx-auto max-w-2xl">
          <ContactForm />

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-black/10 bg-soft p-6">
              <h3 className="font-bold">Email us</h3>
              <a
                href={`mailto:${site.email}`}
                className="mt-1 block break-all font-medium text-brand-berry hover:underline"
              >
                {site.email}
              </a>
            </div>
            <div className="rounded-2xl border border-black/10 bg-soft p-6">
              <h3 className="font-bold">Where are we?</h3>
              <p className="mt-1 text-muted">
                Our offices are located in {site.officeCity}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
