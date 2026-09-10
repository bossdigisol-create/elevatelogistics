import PageHero from "@/components/PageHero";
import ContactForm from "@/components/ContactForm";
import JsonLd from "@/components/JsonLd";
import { pageMeta, breadcrumbJsonLd } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMeta({
  title: "Contact",
  description:
    "Tell us what you need, and we’ll create a workforce solution for you. Elevate Logistic Solutions provides staffing and workforce management to hospitals and healthcare facilities nationwide.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />

      <PageHero
        title="Let’s Build Your Healthcare Workforce Together"
        subtitle="Tell us what you need, and we’ll create a workforce solution for you."
      />

      <section className="section-x py-16 md:py-24">
        <div className="mx-auto max-w-2xl">
          <ContactForm />

          <div className="mt-10 rounded-3xl border border-black/10 bg-soft p-8 text-center md:p-10">
            <h3 className="text-xl font-bold">Prefer to reach us directly?</h3>
            <p className="mx-auto mt-3 max-w-xl text-muted">
              Elevate Logistic Solutions provides staffing and workforce management
              solutions to hospitals and healthcare facilities nationwide.
            </p>
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-8">
              <p className="text-ink">
                <span className="font-semibold">Offices:</span>{" "}
                {site.officeCityShort}
              </p>
              <a
                href={`mailto:${site.email}`}
                className="font-semibold text-brand-berry hover:underline"
              >
                {site.email}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
