import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import CtaBanner from "@/components/CtaBanner";
import Testimonials from "@/components/Testimonials";
import JsonLd from "@/components/JsonLd";
import { pageMeta, servicesJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { analytics, serviceGroups } from "@/lib/site";

export const metadata = pageMeta({
  title: "Our Services",
  description:
    "End-to-end healthcare workforce solutions—per diem, travel, temp-to-hire and crisis staffing, credentialing and compliance, workforce optimization, consulting, and data analytics.",
  path: "/our-services",
});

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={[
          servicesJsonLd(serviceGroups),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Our Services", path: "/our-services" },
          ]),
        ]}
      />

      <PageHero
        title="End-to-End Workforce Solutions for the Healthcare Industry"
        subtitle="From surgical centers to long-term care facilities, Elevate Logistic Solutions helps healthcare organizations build, manage, and optimize their workforce—with speed, insight, and precision."
        ctaLabel="Let's Connect!"
      />

      {serviceGroups.map((group, gIdx) => (
        <section
          key={group.group}
          className={`section-x py-20 md:py-24 ${gIdx % 2 === 1 ? "bg-soft" : ""}`}
        >
          <div className="mx-auto max-w-[1240px]">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-semibold tracking-[0.3em] text-brand-berry">
                0{gIdx + 1}
              </p>
              <h2 className="mt-3 text-3xl font-extrabold md:text-4xl">
                {group.group}
              </h2>
              <p className="mt-4 text-muted">{group.intro}</p>
            </div>

            <div className="mt-14 grid gap-6 md:grid-cols-2">
              {group.items.map((item, i) => (
                <Reveal key={item.title} delay={(i % 2) * 80} dir={i % 2 === 0 ? "left" : "right"}>
                  <article className="h-full rounded-2xl border border-black/5 bg-white p-8 shadow-card">
                    <h3 className="text-xl font-bold text-ink">{item.title}</h3>
                    <p className="mt-3 leading-relaxed text-muted">{item.body}</p>
                    <ul className="mt-5 space-y-2.5">
                      {item.points.map((p) => (
                        <li key={p} className="flex items-start gap-3 text-sm text-ink">
                          <span className="bg-grad-primary mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-white">
                            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M20 6L9 17l-5-5" />
                            </svg>
                          </span>
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Credentials strip */}
      <div className="bg-grad-footer text-white">
        <p className="mx-auto max-w-[1240px] px-6 py-4 text-center text-sm font-semibold tracking-[0.25em] md:text-base">
          WOMEN OWNED <span className="mx-3 text-white/50">|</span> VENDOR NEUTRAL{" "}
          <span className="mx-3 text-white/50">|</span> CLINICIAN LED
        </p>
      </div>

      {/* Workforce Data & Analytics */}
      <section className="section-x py-20 md:py-28">
        <div className="mx-auto max-w-[1240px]">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-extrabold md:text-4xl">
              Workforce Data &amp; Analytics
            </h2>
            <p className="mt-5 text-lg font-semibold text-ink">{analytics.intro}</p>
            <p className="mt-4 text-muted">{analytics.body}</p>
          </div>

          <h3 className="mt-14 text-center text-xl font-bold text-brand-berry">
            What We Deliver
          </h3>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {analytics.deliverables.map((d, idx) => (
              <Reveal key={d.title} delay={(idx % 3) * 80} dir="up">
                <article className="h-full rounded-2xl border border-black/5 bg-soft p-7 shadow-card">
                  <div className="text-gradient text-3xl font-black">
                    0{idx + 1}
                  </div>
                  <h4 className="mt-3 text-lg font-bold text-ink">{d.title}</h4>
                  <p className="mt-2 leading-relaxed text-muted">{d.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner heading="Our insights go beyond compliance and operations—we help clinical, HR, and executive leaders align around data that drives decisions." />

      <section className="section-x bg-soft py-20 md:py-24">
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
