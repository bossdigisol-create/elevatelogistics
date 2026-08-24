import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import FaqAccordion from "@/components/FaqAccordion";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Answers to common questions about Elevate Logistic Solutions—staffing speed, roles we place, quality, transparency, and how to get started.",
};

export default function FaqPage() {
  return (
    <>
      <PageHero
        title="Frequently Asked Questions"
        subtitle="Everything you need to know about partnering with Elevate Logistic Solutions."
      />

      <section className="section-x py-20 md:py-28">
        <FaqAccordion />

        <div className="mx-auto mt-14 max-w-3xl rounded-3xl bg-soft p-10 text-center">
          <h2 className="text-2xl font-bold">Still have questions?</h2>
          <p className="mt-3 text-muted">
            Reach out and our team will get back to you within one business day.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <Link href="/contact" className="btn-pill">
              Contact Us
            </Link>
            <a
              href={`mailto:${site.email}`}
              className="font-semibold text-brand-berry hover:underline"
            >
              {site.email}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
