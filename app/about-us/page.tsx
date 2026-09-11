import Link from "next/link";
import Reveal from "@/components/Reveal";
import HeroVideo from "@/components/HeroVideo";
import Testimonials from "@/components/Testimonials";
import JsonLd from "@/components/JsonLd";
import { pageMeta, breadcrumbJsonLd } from "@/lib/seo";
import {
  careEnvironments,
  careEnvironmentsIntro,
  careEnvironmentsClosing,
  recognizedFor,
  whyChooseUs,
  site,
} from "@/lib/site";

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

// Stroke icons for the "Why Work With Elevate?" cards (order matches whyChooseUs).
const whyIcons = [
  "M4 14v-1a8 8 0 0116 0v1M5 14h2v5H6a2 2 0 01-2-2v-2a1 1 0 011-1zm14 0h-2v5h1a2 2 0 002-2v-2a1 1 0 00-1-1z", // concierge / headset
  "M12 15a4 4 0 100-8 4 4 0 000 8zM8.5 13.5L7 22l5-3 5 3-1.5-8.5", // expertise / medal
  "M12 3l9 5-9 5-9-5 9-5zM3 13l9 5 9-5", // comprehensive / layers
  "M4 19V5M4 19h16M8 15l3-4 3 2 4-6", // proven results / chart up
  "M12 2v20M16 6H10a3 3 0 000 6h4a3 3 0 010 6H8", // cost efficiency / dollar
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

      {/* ---------- Hero (about-hero-section video behind) ---------- */}
      <section className="relative isolate flex min-h-[70vh] items-center overflow-hidden bg-grad-primary md:min-h-[78vh]">
        <HeroVideo src={site.aboutHeroVideo} poster={site.aboutHeroPoster} />
        <div
          className="absolute inset-0"
          style={{ backgroundImage: "var(--grad-hero-overlay)" }}
        />
        <div className="relative mx-auto w-full max-w-[1000px] px-6 py-24 text-center text-white">
          <h1 className="hero-in hero-in-1 text-4xl font-extrabold leading-[1.1] drop-shadow-[0_2px_10px_rgba(0,0,0,0.35)] md:text-6xl">
            Elevating the Healthcare Workforce, From the Inside Out
          </h1>
          <p className="hero-in hero-in-2 mx-auto mt-6 max-w-2xl text-lg text-white/90 md:text-xl">
            Built by healthcare professionals. Designed for real-world impact.
            Vendor-neutral, data-informed, and always human-first.
          </p>
          <div className="hero-in hero-in-3 mt-9">
            <Link href="/contact" className="btn-pill text-base">
              Connect with Us
            </Link>
          </div>
        </div>
      </section>

      {/* ---------- Tagline strip ---------- */}
      <div className="bg-grad-footer text-white">
        <p className="mx-auto max-w-[1240px] px-6 py-4 text-center text-sm font-semibold tracking-[0.25em] md:text-base">
          WOMEN OWNED <span className="mx-3 text-white/50">|</span> VENDOR NEUTRAL{" "}
          <span className="mx-3 text-white/50">|</span> CLINICIAN LED
        </p>
      </div>

      {/* ---------- Our Story / Mission / Beliefs ---------- */}
      <section className="section-x py-20 md:py-28">
        <div className="mx-auto max-w-[900px]">
          <div className="flex flex-wrap justify-center gap-3">
            {["Our Story", "Mission", "Beliefs"].map((t, i) => (
              <span
                key={t}
                className={`rounded-full px-6 py-2 text-sm font-semibold ${
                  i === 0 ? "bg-grad-primary text-white" : "bg-soft text-muted"
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

      {/* ---------- What Makes Us Different ---------- */}
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
                <article className="h-full rounded-2xl bg-white p-8 shadow-card transition hover:-translate-y-1">
                  <div className="text-gradient text-4xl font-black">
                    0{idx + 1}
                  </div>
                  <h3 className="mt-4 text-xl font-bold">{d.title}</h3>
                  <p className="mt-3 leading-relaxed text-muted">{d.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link href="/contact" className="btn-pill">
              Start Today!
            </Link>
          </div>
        </div>
      </section>

      {/* ---------- Built for Every Care Environment ---------- */}
      <section className="section-x py-20 md:py-28">
        <div className="mx-auto max-w-[1000px] text-center">
          <h2 className="text-3xl font-extrabold md:text-4xl">
            We’re Built for Every Care Environment
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted">
            {careEnvironmentsIntro}
          </p>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {careEnvironments.map((c, idx) => (
              <Reveal key={c} delay={(idx % 3) * 70} dir="up">
                <div className="flex h-full items-center gap-3 rounded-2xl border border-black/10 bg-soft px-6 py-5 text-left transition hover:border-brand-pink/40 hover:shadow-card">
                  <span className="bg-grad-primary h-2.5 w-2.5 shrink-0 rounded-full" />
                  <span className="font-medium text-ink">{c}</span>
                </div>
              </Reveal>
            ))}
          </div>
          <p className="mx-auto mt-12 max-w-2xl text-lg font-semibold text-ink">
            {careEnvironmentsClosing}
          </p>
          <Link href="/contact" className="btn-pill mt-8">
            Request a Consultation
          </Link>
        </div>
      </section>

      {/* ---------- Why Healthcare Providers Choose Elevate (testimonials) ---------- */}
      <section className="section-x bg-soft py-20 md:py-28">
        <div className="mx-auto max-w-[1240px]">
          <h2 className="text-center text-3xl font-extrabold md:text-4xl">
            Why Healthcare Providers Choose Elevate
          </h2>
          <div className="mt-14">
            <Testimonials />
          </div>
        </div>
      </section>

      {/* ---------- Why Work With Elevate? ---------- */}
      <section className="section-x py-20 md:py-28">
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
                <article className="flex h-full flex-col items-center rounded-2xl bg-white p-8 text-center shadow-card transition hover:-translate-y-1">
                  <div className="bg-grad-primary flex h-16 w-16 items-center justify-center rounded-full text-white shadow-pill">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d={whyIcons[idx]} />
                    </svg>
                  </div>
                  <h3 className="mt-6 text-lg font-bold">{w.title}</h3>
                  <p className="mt-3 leading-relaxed text-muted">{w.body}</p>
                </article>
              </Reveal>
            ))}
          </div>

          {/* CTA banner */}
          <div className="bg-grad-cta relative mt-16 overflow-hidden rounded-[2rem] px-8 py-14 text-center text-white md:px-16">
            <div className="blob left-[10%] top-[-40px] h-52 w-52" />
            <div className="blob right-[12%] bottom-[-60px] h-64 w-64" />
            <div className="relative">
              <h3 className="text-2xl font-extrabold md:text-3xl">
                Ready to experience a new standard in workforce strategy?
              </h3>
              <Link
                href="/contact"
                className="mt-8 inline-flex items-center justify-center rounded-full bg-white px-10 py-3.5 font-semibold text-brand-berry transition hover:-translate-y-0.5 hover:bg-white/90"
              >
                Let’s Go!
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Elevate is Recognized For (seal on the right) ---------- */}
      <section
        className="section-x py-20 md:py-28"
        style={{
          background:
            "linear-gradient(160deg, #eaf6fd 0%, #d6ecfb 55%, #cfe6f7 100%)",
        }}
      >
        <div className="mx-auto grid max-w-[1140px] items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          {/* Left: copy */}
          <Reveal dir="left">
            <p className="text-sm font-semibold tracking-[0.3em] text-brand-berry">
              ACCREDITED &amp; CERTIFIED
            </p>
            <h2 className="mt-3 text-3xl font-extrabold text-ink md:text-4xl">
              {recognizedFor.heading}
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-muted">
              {recognizedFor.body}
            </p>
            <ul className="mt-8 space-y-4">
              {recognizedFor.points.map((p) => (
                <li key={p} className="flex items-start gap-3">
                  <span className="bg-grad-primary mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-white">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </span>
                  <span className="text-ink">{p}</span>
                </li>
              ))}
            </ul>
            <span className="mt-8 inline-flex items-center gap-2 rounded-full bg-white/70 px-5 py-2.5 text-sm font-semibold text-ink shadow-card ring-1 ring-black/5 backdrop-blur">
              <span className="bg-grad-primary h-2.5 w-2.5 rounded-full" />
              {recognizedFor.badge}
            </span>
          </Reveal>

          {/* Right: gold Joint Commission seal */}
          <Reveal dir="right" delay={120}>
            <div className="relative mx-auto flex max-w-[380px] items-center justify-center">
              <div
                className="absolute inset-0 rounded-full opacity-70 blur-3xl"
                style={{ background: "radial-gradient(closest-side, rgba(240,196,25,0.55), transparent)" }}
                aria-hidden
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={site.jointCommission}
                alt={recognizedFor.sealAlt}
                width={760}
                height={760}
                loading="lazy"
                className="animate-float-soft relative w-full drop-shadow-[0_24px_50px_rgba(198,158,0,0.35)]"
              />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
