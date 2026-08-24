import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import CtaBanner from "@/components/CtaBanner";
import Testimonials from "@/components/Testimonials";
import { serviceGroups } from "@/lib/site";

export const metadata: Metadata = {
  title: "Our Services",
  description:
    "Flexible, scalable, and data-informed workforce solutions—staffing, workforce management, and healthcare consulting built around your goals.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        title="Our Services"
        subtitle="Flexible, scalable, and data-informed workforce solutions—built around your goals, your care environment, and your people."
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
                <Reveal key={item.title} delay={(i % 2) * 80}>
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

      <CtaBanner heading="Our Insights Go Beyond Compliance And Operations—We Help Clinical, HR, And Executive Leaders Align Around Data That Drives Decisions." />

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
