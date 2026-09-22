import Link from "next/link";
import PageHero from "@/components/PageHero";
import FaqAccordion from "@/components/FaqAccordion";
import JsonLd from "@/components/JsonLd";
import { pageMeta, faqJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { faqs, site } from "@/lib/site";

export const metadata = pageMeta({
  title: "Healthcare Staffing FAQ",
  titleTag: "Healthcare Staffing FAQ | Elevate Logistic Solutions",
  description:
    "Answers about staffing speed, the healthcare roles we place, quality, compliance, transparency, and how to start a workforce partnership with ELS.",
  path: "/faq",
  keywords: [
    "healthcare staffing FAQ",
    "healthcare staffing agency",
    "nurse staffing solutions",
    "credentialing and compliance",
    "healthcare workforce management",
    "crisis response staffing",
  ],
});

export default function FaqPage() {
  return (
    <>
      <JsonLd
        data={[
          faqJsonLd(faqs),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "FAQ", path: "/faq" },
          ]),
        ]}
      />

      <PageHero
        title="Frequently Asked Questions"
        subtitle="Everything you need to know about partnering with Elevate Logistic Solutions."
      />

      <section className="section-x py-20 md:py-28">
        <FaqAccordion />

        <div className="mx-auto mt-14 max-w-3xl rounded-3xl bg-soft p-10 text-center">
          <h2 className="text-2xl font-bold">
            We don’t just fill positions—we create workforce solutions that drive
            long-term success.
          </h2>
          <p className="mt-3 text-muted">
            Still have questions? Reach out and our team will get back to you within
            one business day.
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
