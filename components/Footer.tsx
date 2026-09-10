import Link from "next/link";
import { nav, site } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="mt-auto">
      {/* Gradient panel */}
      <div className="bg-grad-footer relative overflow-hidden text-white">
        {/* decorative translucent circles */}
        <div className="blob left-[40%] top-[-60px] h-64 w-64" />
        <div className="blob left-[42%] top-[120px] h-56 w-56" />
        <div className="blob right-[6%] top-[40px] h-72 w-72" />
        <div className="blob right-[16%] bottom-[-90px] h-64 w-64" />

        <div className="relative mx-auto grid max-w-[1240px] gap-10 px-6 py-16 md:grid-cols-3 md:py-20">
          {/* Brand */}
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={site.logoWhite} alt={site.name} className="h-14 w-auto" />
            <p className="mt-5 text-xl font-semibold">
              <span className="font-light italic">Elevating</span> Workforce
              Strategy.
            </p>
            <p className="mt-2 max-w-xs text-sm leading-relaxed text-white/85">
              Supporting workforce operations through innovation, transparency &
              precision.
            </p>
          </div>

          {/* Nav */}
          <nav className="flex flex-col gap-4 md:items-start md:pt-4">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-lg text-white/90 transition hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Where */}
          <div className="md:pt-4">
            <h3 className="text-xl font-semibold">Where are we?</h3>
            <p className="mt-3 max-w-xs text-white/90">
              Our Offices are located in {site.officeCity}
            </p>
            <Link
              href="/contact"
              className="btn-pill mt-6 text-sm"
              style={{ boxShadow: "0 12px 24px -10px rgba(0,0,0,0.35)" }}
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="bg-header">
        <div className="mx-auto flex max-w-[1240px] flex-col items-center justify-between gap-3 px-6 py-5 text-sm text-ink sm:flex-row">
          <p>{site.copyright}</p>
          <div className="flex items-center gap-3">
            <Link href="/privacy-policy" className="hover:text-brand-berry">
              Privacy &amp; Policy
            </Link>
            <span className="text-brand-berry">•</span>
            <Link href="/terms-of-service" className="hover:text-brand-berry">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
