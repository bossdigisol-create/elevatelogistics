import Link from "next/link";
import { Users, SlidersHorizontal, Lightbulb } from "lucide-react";
import Reveal from "@/components/Reveal";
import RotatingWords from "@/components/RotatingWords";
import StatsCounter from "@/components/StatsCounter";
import Testimonials from "@/components/Testimonials";
import Parallax from "@/components/Parallax";
import HeroVideo from "@/components/HeroVideo";
import JsonLd from "@/components/JsonLd";
import { pageMeta, breadcrumbJsonLd } from "@/lib/seo";
import {
  differentiators,
  homeServices,
  idealWorkforceBullets,
  site,
} from "@/lib/site";

export const metadata = pageMeta({
  title: "Strategic Healthcare Workforce Solutions",
  description:
    "Women-owned, vendor-neutral healthcare workforce MSP. Elevate Logistic Solutions delivers data-informed staffing, workforce management, and consulting that improves care and scales with your needs.",
  path: "/",
});

// Icons for the "Our Services at a Glance" cards — one per homeServices entry.
const homeServiceIcons = [Users, SlidersHorizontal, Lightbulb];

const cardIcons = [
  "M12 2l2.6 5.9L21 9l-4.8 4.2L17.6 20 12 16.6 6.4 20l1.4-6.8L3 9l6.4-1.1z", // insight
  "M12 3a4 4 0 100 8 4 4 0 000-8zM4 21a8 8 0 0116 0z", // service
  "M4 6h16M4 12h16M4 18h10", // support
  "M4 19V5m5 14V9m5 10V4m5 15v-7", // data
  "M12 3l8 4v6c0 5-3.5 7.5-8 8-4.5-.5-8-3-8-8V7z", // neutral
  "M3 12h4l3-8 4 16 3-8h4", // scalable
];

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([{ name: "Home", path: "/" }])}
      />

      {/* ---------- Hero ---------- */}
      <section className="relative isolate flex min-h-[82vh] items-center overflow-hidden bg-grad-primary">
        <HeroVideo />
        <div
          className="absolute inset-0"
          style={{ backgroundImage: "var(--grad-hero-overlay)" }}
        />
        <div className="relative mx-auto w-full max-w-[1080px] px-6 py-24 text-center text-white">
          <h1 className="hero-in hero-in-1 text-4xl font-extrabold leading-[1.1] drop-shadow-[0_2px_10px_rgba(0,0,0,0.35)] md:text-6xl">
            Strategic Workforce Solutions Built by Healthcare Experts
          </h1>
          <p className="hero-in hero-in-2 mx-auto mt-6 max-w-2xl text-lg text-white/90 md:text-xl">
            End-to-end workforce support that improves care and scales with your
            needs
          </p>
          <div className="hero-in hero-in-3 mt-9">
            <Link href="/contact" className="btn-pill text-base">
              Let&apos;s Connect!
            </Link>
          </div>
        </div>
      </section>

      {/* ---------- Tagline strip ---------- */}
      <div className="bg-grad-footer text-white">
        <p className="mx-auto max-w-[1240px] px-6 py-4 text-center text-sm font-semibold tracking-[0.25em] md:text-base">
          CLINICIAN LED <span className="mx-3 text-white/50">|</span> VENDOR NEUTRAL{" "}
          <span className="mx-3 text-white/50">|</span> DATA INFORMED
        </p>
      </div>

      {/* ---------- Intro (animated heading left · copy + CTA right) ---------- */}
      <section className="section-x py-20 md:py-28">
        <div className="mx-auto grid max-w-[1240px] items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Left: animated heading + lead */}
          <Reveal dir="left">
            <h2 className="text-3xl font-extrabold leading-tight md:text-5xl">
              <RotatingWords
                words={["Transforming", "Elevating", "Optimizing"]}
              />{" "}
              <br className="hidden sm:block" />
              Healthcare Logistics
            </h2>
            <p className="mt-8 text-lg font-semibold text-ink">
              At Elevate Logistic Solutions (ELS), we bring a fresh perspective to
              workforce challenges in healthcare—because we’ve been on every side of
              the system.
            </p>
          </Reveal>

          {/* Right: supporting copy + CTA */}
          <Reveal delay={120} dir="right">
            <div className="space-y-5 text-muted">
              <p>
                Our team is made up of clinicians, data scientists, researchers, and
                executive leaders who understand the pressure points hospitals and
                health systems face. We designed ELS to offer a smarter, more agile
                way to manage your workforce—one that prioritizes outcomes,
                transparency, and long-term sustainability.
              </p>
              <p>
                As a woman-owned, vendor-neutral Managed Service Provider (MSP), we
                work alongside healthcare organizations of all sizes to design and
                deliver tailored, data-informed workforce strategies. Whether you’re
                responding to urgent gaps in coverage or developing a five-year
                workforce plan, we’re here to help.
              </p>
              <p>
                We are passionate about helping develop sustainable change for your
                workforce strategy. We elevate your workforce, from the inside out.
              </p>
            </div>
            <Link href="/contact" className="btn-pill mt-9">
              Talk With Our Team
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ---------- Parallax band (Home-BG-Slide) — simple image, no overlay ---------- */}
      <Parallax
        image={site.parallaxImage}
        overlay="none"
        minHeight="clamp(340px, 55vh, 560px)"
      />

      {/* ---------- What Makes Us Different ---------- */}
      <section className="section-x bg-soft py-20 md:py-28">
        <div className="mx-auto max-w-[1240px]">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-extrabold md:text-4xl">
              What Makes Us Different
            </h2>
            <p className="mt-4 text-muted">
              At Elevate Logistic Solutions, we empower organizations to create
              streamlined, high-performance workforce operations that drive long-term
              success.
            </p>
          </div>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {differentiators.map((d, idx) => (
              <Reveal key={d.title} delay={(idx % 3) * 80} dir="up">
                <article className="h-full rounded-2xl bg-white p-8 shadow-card transition hover:-translate-y-1">
                  <div className="bg-grad-primary flex h-14 w-14 items-center justify-center rounded-2xl text-white">
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d={cardIcons[idx]} />
                    </svg>
                  </div>
                  <h3 className="mt-6 text-xl font-bold">{d.title}</h3>
                  <p className="mt-3 leading-relaxed text-muted">{d.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Our Services at a Glance ---------- */}
      <section className="section-x py-20 md:py-28">
        <div className="mx-auto max-w-[1240px]">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-extrabold md:text-4xl">
              Our Services at a Glance
            </h2>
            <p className="mt-4 text-muted">
              Our team understands that every care environment has unique workforce
              demands. Whether you’re experiencing a surge in patient volume, building
              a succession plan, or trying to reduce agency dependency, we provide
              flexible, scalable, and data-informed solutions tailored to your goals.
            </p>
            <p className="mt-4 text-muted">
              We go beyond traditional staffing—we serve as an extension of your
              leadership team, delivering full-cycle workforce support that balances
              quality care, compliance, and cost control.
            </p>
          </div>

          <div className="mt-14 space-y-6">
            {homeServices.map((s, idx) => {
              const Icon = homeServiceIcons[idx];
              return (
                <Reveal key={s.title} dir={idx % 2 === 1 ? "right" : "left"}>
                  <article className="flex flex-col gap-5 rounded-3xl bg-soft p-8 md:grid md:grid-cols-[1.4fr_1fr] md:items-center md:gap-8 md:p-10">
                    {/* Icon badge — small centered badge on mobile (top), full side
                        panel on desktop. DOM-first so mobile shows it above content. */}
                    <div
                      className={`bg-grad-primary mx-auto flex h-14 w-14 items-center justify-center rounded-2xl text-white shadow-pill md:mx-0 md:h-44 md:w-auto md:rounded-3xl md:shadow-none ${
                        idx % 2 === 1 ? "md:order-1" : "md:order-2"
                      }`}
                    >
                      <Icon
                        className="h-7 w-7 md:h-16 md:w-16"
                        strokeWidth={1.6}
                        aria-hidden
                      />
                    </div>
                    <div className={idx % 2 === 1 ? "md:order-2" : "md:order-1"}>
                      <h3 className="text-2xl font-bold">{s.title}</h3>
                      <p className="mt-4 leading-relaxed text-muted">{s.body}</p>
                      <Link href="/our-services" className="btn-pill mt-6 text-sm">
                        {s.cta}
                      </Link>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------- Our Team ---------- */}
      <section className="section-x bg-soft py-20 md:py-28">
        <div className="mx-auto max-w-[900px] text-center">
          <h2 className="text-3xl font-extrabold md:text-4xl">Our Team</h2>
          <p className="mt-6 leading-relaxed text-muted">
            Elevate Logistic Solutions (ELS) is not your typical workforce partner. We
            are led by a team of clinicians, researchers, data scientists, and
            healthcare executives with decades of experience across every level of
            care delivery. We’ve been on the front lines building care teams, managing
            compliance audits and workforce crises, and launching new facilities.
            That’s why we created ELS—to deliver more human-centered workforce
            solutions for healthcare organizations of all sizes and specialties.
          </p>
          <Link href="/about-us" className="btn-pill mt-8">
            Read Our Story
          </Link>
        </div>
      </section>

      {/* ---------- The Elevate Experience (stats) ---------- */}
      <section className="bg-grad-footer relative overflow-hidden py-20 text-white md:py-28">
        <div className="blob left-[10%] top-[-40px] h-64 w-64" />
        <div className="blob right-[8%] bottom-[-80px] h-72 w-72" />
        <div className="relative mx-auto max-w-[1240px] px-6">
          <div className="text-center">
            <p className="text-sm font-semibold tracking-[0.3em] text-white/70">
              BUILDING YOUR IDEAL WORKFORCE
            </p>
            <h2 className="mt-3 text-3xl font-extrabold md:text-4xl">
              The Elevate Experience
            </h2>
          </div>
          <div className="mt-16">
            <StatsCounter />
          </div>
        </div>
      </section>

      {/* ---------- Let's Build Your Ideal Workforce (Contact-BG parallax) ---------- */}
      <Parallax
        image={site.contactBg}
        overlay="linear-gradient(100deg, rgba(250,247,251,0.94) 0%, rgba(250,247,251,0.82) 55%, rgba(207,39,127,0.28) 100%)"
        minHeight="auto"
        className="py-20 md:py-28"
      >
        <div className="mx-auto grid max-w-[1240px] items-center gap-12 lg:grid-cols-2">
          <Reveal dir="left">
            <p className="text-sm font-semibold tracking-[0.3em] text-brand-berry">
              START TODAY!
            </p>
            <h2 className="mt-3 text-3xl font-extrabold text-ink md:text-5xl">
              Let’s Build Your Ideal Workforce
            </h2>
            <p className="mt-5 text-muted">
              We’re not just here to fill roles—we’re here to build long-term workforce
              health with the same level of care and expertise you bring to your
              patients.
            </p>
            <p className="mt-6 font-semibold text-ink">
              Let’s build a workforce that performs today—and thrives tomorrow.
            </p>
            <Link href="/contact" className="btn-pill mt-8">
              Let&apos;s Connect!
            </Link>
          </Reveal>

          <Reveal delay={120} dir="right">
            <ul className="space-y-4 rounded-3xl bg-white/90 p-8 shadow-card backdrop-blur md:p-10">
              {idealWorkforceBullets.map((b) => (
                <li key={b} className="flex items-start gap-4">
                  <span className="bg-grad-primary mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-white">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </span>
                  <span className="text-lg text-ink">{b}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Parallax>

      {/* ---------- Testimonials ---------- */}
      <section className="section-x bg-soft py-20 md:py-28">
        <div className="mx-auto max-w-[1240px]">
          <h2 className="text-center text-3xl font-extrabold md:text-4xl">
            What Our Partners Say
          </h2>
          <div className="mt-14">
            <Testimonials />
          </div>
        </div>
      </section>
    </>
  );
}
