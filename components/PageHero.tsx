import Link from "next/link";

export default function PageHero({
  title,
  subtitle,
  ctaLabel,
  ctaHref = "/contact",
}: {
  title: string;
  subtitle?: string;
  ctaLabel?: string;
  ctaHref?: string;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-grad-primary text-white">
      <div
        className="absolute inset-0"
        style={{ backgroundImage: "var(--grad-hero-overlay)" }}
      />
      <div className="blob left-[8%] top-[-30px] h-52 w-52" />
      <div className="blob right-[10%] bottom-[-60px] h-64 w-64" />
      <div className="relative mx-auto max-w-[1000px] px-6 py-24 text-center md:py-32">
        <h1 className="text-4xl font-extrabold leading-[1.1] drop-shadow-[0_2px_10px_rgba(0,0,0,0.35)] md:text-5xl">
          {title}
        </h1>
        {subtitle ? (
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/90">{subtitle}</p>
        ) : null}
        {ctaLabel ? (
          <Link
            href={ctaHref}
            className="mt-9 inline-flex items-center justify-center rounded-full bg-white px-8 py-3.5 font-semibold text-brand-berry transition hover:bg-white/90"
          >
            {ctaLabel}
          </Link>
        ) : null}
      </div>
    </section>
  );
}
