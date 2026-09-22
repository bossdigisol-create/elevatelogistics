import PageHero from "@/components/PageHero";
import ContactForm from "@/components/ContactForm";
import Reveal from "@/components/Reveal";
import JsonLd from "@/components/JsonLd";
import { pageMeta, breadcrumbJsonLd } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMeta({
  title: "Contact Us",
  titleTag: "Contact Us | Elevate Logistic Solutions",
  description:
    "Contact Elevate Logistic Solutions for healthcare staffing and workforce management—serving hospitals and healthcare facilities nationwide from Rochester, NY.",
  path: "/contact",
  keywords: [
    "contact healthcare staffing agency",
    "healthcare staffing Rochester NY",
    "healthcare workforce solutions",
    "hospital staffing nationwide",
    "managed service provider healthcare",
  ],
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

      {/* Form */}
      <section className="section-x py-16 md:py-24">
        <div className="mx-auto max-w-2xl">
          <ContactForm />
        </div>
      </section>

      {/* Prefer to reach us directly? — contact info + Rochester, NY map */}
      <section className="section-x bg-soft py-16 md:py-24">
        <div className="mx-auto grid max-w-[1140px] items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Left: contact info */}
          <Reveal dir="left">
            <p className="text-sm font-semibold tracking-[0.3em] text-brand-berry">
              CONTACT US
            </p>
            <h2 className="mt-3 text-3xl font-extrabold text-ink md:text-4xl">
              Prefer to reach us directly?
            </h2>
            <p className="mt-5 max-w-xl leading-relaxed text-muted">
              Elevate Logistic Solutions provides staffing and workforce management
              solutions to{" "}
              <span className="font-semibold text-ink">
                hospitals and healthcare facilities nationwide
              </span>
              .
            </p>

            <ul className="mt-8 space-y-5">
              <li className="flex items-center gap-4">
                <span className="bg-grad-primary flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-white shadow-pill">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 6-9 12-9 12s-9-6-9-12a9 9 0 0118 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </span>
                <span className="text-lg text-ink">
                  Offices are located in {site.officeCityShort}
                </span>
              </li>
              <li className="flex items-center gap-4">
                <span className="bg-grad-primary flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-white shadow-pill">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <path d="M3 7l9 6 9-6" />
                  </svg>
                </span>
                <a
                  href={`mailto:${site.email}`}
                  className="text-lg font-semibold text-brand-berry hover:underline"
                >
                  {site.email}
                </a>
              </li>
            </ul>
          </Reveal>

          {/* Right: Google Map — Rochester, NY */}
          <Reveal dir="right" delay={120}>
            <div className="overflow-hidden rounded-3xl shadow-card ring-1 ring-black/5">
              <iframe
                title={`${site.name} — ${site.officeCity}`}
                src="https://www.google.com/maps?q=Rochester,+New+York&z=10&output=embed"
                className="block h-[360px] w-full border-0 md:h-[440px]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
