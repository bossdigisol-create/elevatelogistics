import Link from "next/link";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import JsonLd from "@/components/JsonLd";
import { pageMeta, breadcrumbJsonLd } from "@/lib/seo";
import { careEnvironments, whyChooseUs } from "@/lib/site";

export const metadata = pageMeta({
  title: "About Us",
  description:
    "Elevate Logistic Solutions is a women-owned, vendor-neutral healthcare workforce MSP built by clinicians, researchers, data scientists, and healthcare executives. Real-world impact, data-informed, human-first.",
  path: "/about-us",
});

const differentiators = [
  {
    title: "We Manage the Full Workforce Lifecycle",
    body: "From per diem placements to workforce planning and credentialing oversight, we provide end-to-end support. Our clients gain back time, improve continuity of care, and reduce turnover by working with a partner who handles it all.",
  },
  {
    title: "We’re Vendor-Neutral",
    body: "We deliver vendor neutral services. We acknowledge that each organization has different needs and we prioritize that. This approach allows us to provide tailored solutions that best support health care teams and streamline operations. This allows us to maintain impartiality and transparency in every aspect of our service.",
  },
  {
    title: "We Use Data to Unlock Workforce Potential",
    body: "We analyze workforce data through a different lens—identifying inefficiencies, predicting gaps, and modeling for the future. The result? Smarter scheduling, better utilization, and measurable performance gains.",
  },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "About Us", path: "/about-us" },
        ])}
      />

      <PageHero
        title="Elevating the Healthcare Workforce, From the Inside Out"
        subtitle="Built by healthcare professionals. Designed for real-world impact. Vendor-neutral, data-informed, and always human-first."
        ctaLabel="Connect with Us"
      />

      {/* Tagline strip */}
      <div className="bg-grad-footer text-white">
        <p className="mx-auto max-w-[1240px] px-6 py-4 text-center text-sm font-semibold tracking-[0.25em] md:text-base">
          WOMEN OWNED <span className="mx-3 text-white/50">|</span> VENDOR NEUTRAL{" "}
          <span className="mx-3 text-white/50">|</span> CLINICIAN LED
        </p>
      </div>

      {/* Story / Mission / Beliefs */}
      <section className="section-x py-20 md:py-28">
        <div className="mx-auto max-w-[900px]">
          <div className="flex flex-wrap justify-center gap-3">
            {["Our Story", "Mission", "Beliefs"].map((t, i) => (
              <span
                key={t}
                className={`rounded-full px-6 py-2 text-sm font-semibold ${
                  i === 0
                    ? "bg-grad-primary text-white"
                    : "bg-soft text-muted"
                }`}
              >
                {t}
              </span>
            ))}
          </div>
          <div className="mt-10 space-y-6 text-lg leading-relaxed text-muted">
            <p className="font-semibold text-ink">
              Elevate Logistic Solutions (ELS) is not your typical workforce partner.
              We’re a woman-owned, vendor-neutral Managed Service Provider (MSP) led by
              a team of clinicians, researchers, data scientists, and healthcare
              executives with decades of experience across every level of care
              delivery.
            </p>
            <p>
              We’ve been on the front lines. We’ve built care teams, managed compliance
              audits, launched new facilities, and navigated workforce crises. That’s
              why we created ELS—to deliver smarter, faster, and more human-centered
              workforce solutions for healthcare organizations of all sizes and
              specialties.
            </p>
            <p>
              Whether you’re managing a multi-site health system or a single-site care
              facility, we partner with you to build, manage, and evolve your workforce
              with speed, precision, and empathy—because our mission is to strengthen
              healthcare delivery by elevating the people behind it.
            </p>
          </div>
          <div className="mt-8 text-center">
            <Link href="/our-services" className="btn-pill">
              Explore Our Services
            </Link>
          </div>
        </div>
      </section>

      {/* What Makes Us Different */}
      <section className="section-x bg-soft py-20 md:py-28">
        <div className="mx-auto max-w-[1240px]">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-extrabold md:text-4xl">
              What Makes Us Different
            </h2>
            <p className="mt-4 text-muted">
              We don’t just understand healthcare—we’ve practiced it. Our firsthand
              experience across clinical and operational settings allows us to solve
              workforce problems that others may not recognize.
            </p>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {differentiators.map((d, idx) => (
              <Reveal key={d.title} delay={idx * 80} dir="up">
                <article className="h-full rounded-2xl bg-white p-8 shadow-card">
                  <div className="text-gradient text-4xl font-black">
                    0{idx + 1}
                  </div>
                  <h3 className="mt-4 text-xl font-bold">{d.title}</h3>
                  <p className="mt-3 leading-relaxed text-muted">{d.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Built for every care environment */}
      <section className="section-x py-20 md:py-28">
        <div className="mx-auto max-w-[1000px] text-center">
          <h2 className="text-3xl font-extrabold md:text-4xl">
            We’re Built for Every Care Environment
          </h2>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {careEnvironments.map((c) => (
              <div
                key={c}
                className="flex items-center gap-3 rounded-2xl border border-black/10 bg-soft px-6 py-5 text-left"
              >
                <span className="bg-grad-primary h-2.5 w-2.5 shrink-0 rounded-full" />
                <span className="font-medium text-ink">{c}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Work With Elevate? */}
      <section className="section-x bg-soft py-20 md:py-28">
        <div className="mx-auto max-w-[1240px]">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-extrabold md:text-4xl">
              Why Work With Elevate?
            </h2>
            <p className="mt-4 text-muted">
              Hospitals choose ELS because we go beyond workforce management — we build
              partnerships that drive long-term success.
            </p>
          </div>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {whyChooseUs.map((w, idx) => (
              <Reveal key={w.title} delay={(idx % 3) * 80} dir="up">
                <article className="flex h-full items-start gap-4 rounded-2xl bg-white p-7 shadow-card">
                  <span className="bg-grad-primary mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white">
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </span>
                  <div>
                    <h3 className="text-lg font-bold">{w.title}</h3>
                    <p className="mt-2 leading-relaxed text-muted">{w.body}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
          <div className="mt-12 text-center">
            <p className="text-lg font-semibold text-ink">
              Ready to experience a new standard in healthcare workforce strategy?
            </p>
            <Link href="/contact" className="btn-pill mt-6">
              Let&apos;s Connect!
            </Link>
          </div>
        </div>
      </section>

      {/* Elevate is Recognized For */}
      <section className="section-x py-20 md:py-24">
        <div className="mx-auto max-w-[1000px]">
          <div className="bg-grad-cta relative overflow-hidden rounded-[2rem] px-8 py-14 text-center text-white md:px-16">
            <div className="blob left-[10%] top-[-40px] h-52 w-52" />
            <div className="blob right-[12%] bottom-[-60px] h-64 w-64" />
            <div className="relative">
              <h2 className="text-3xl font-extrabold md:text-4xl">
                Elevate is Recognized For
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-lg text-white/90">
                Our commitment to rigorous screening, credentialing, and compliance
                tracking means you can trust every professional we place.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
