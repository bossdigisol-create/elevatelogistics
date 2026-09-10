"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { nav, site } from "@/lib/site";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Sliding underline state (desktop nav)
  const [hover, setHover] = useState<number | null>(null);
  const [bar, setBar] = useState({ left: 0, width: 0, ready: false });
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  const isActive = useCallback(
    (href: string) =>
      href === "/" ? pathname === "/" : pathname.startsWith(href),
    [pathname]
  );

  const activeIndex = nav.findIndex((i) => isActive(i.href));
  const shown = hover ?? (activeIndex >= 0 ? activeIndex : null);

  const measure = useCallback(() => {
    const el = shown != null ? linkRefs.current[shown] : null;
    if (!el) {
      setBar((b) => ({ ...b, ready: false }));
      return;
    }
    setBar({ left: el.offsetLeft, width: el.offsetWidth, ready: true });
  }, [shown]);

  // Recompute underline on active/hover change and on route change.
  useEffect(() => {
    measure();
  }, [measure, pathname]);

  // Recompute on resize and once webfonts settle (widths shift after swap).
  useEffect(() => {
    const onResize = () => measure();
    window.addEventListener("resize", onResize);
    const fonts = (document as Document & { fonts?: FontFaceSet }).fonts;
    fonts?.ready.then(() => measure());
    return () => window.removeEventListener("resize", onResize);
  }, [measure]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the menu on route change.
  useEffect(() => setOpen(false), [pathname]);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`sticky top-0 z-50 bg-header/95 backdrop-blur transition-shadow ${
          scrolled ? "shadow-[0_6px_24px_-16px_rgba(28,27,34,0.5)]" : ""
        }`}
      >
        {/* Row 1: logo + (desktop) Contact / (mobile) menu button */}
        <div className="mx-auto flex max-w-[1240px] items-center justify-between px-5 py-3 md:py-4">
          <Link href="/" aria-label={site.name} className="shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={site.logo}
              alt={site.name}
              className="h-20 w-auto md:h-28"
            />
          </Link>

          {/* Desktop Contact button — wrapped so `hidden` wins over .btn-pill's display */}
          <div className="hidden md:block">
            <Link href="/contact" className="btn-pill text-sm">
              Contact Us
            </Link>
          </div>

          {/* Mobile: unique animated bar → X */}
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="bg-grad-primary relative flex h-12 w-12 flex-col items-center justify-center gap-[5px] rounded-2xl shadow-pill md:hidden"
          >
            <span
              className={`block h-[3px] w-6 rounded-full bg-white transition-transform duration-300 ease-out ${
                open ? "translate-y-[8px] rotate-45" : ""
              }`}
            />
            <span
              className={`block h-[3px] w-6 rounded-full bg-white transition-all duration-200 ${
                open ? "scale-x-0 opacity-0" : ""
              }`}
            />
            <span
              className={`block h-[3px] w-6 rounded-full bg-white transition-transform duration-300 ease-out ${
                open ? "-translate-y-[8px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>

        {/* Row 2: desktop nav with sliding underline */}
        <div className="hidden border-t border-black/5 md:block">
          <nav className="relative mx-auto flex max-w-[1240px] items-center gap-9 px-5">
            {nav.map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                ref={(el) => {
                  linkRefs.current[i] = el;
                }}
                onMouseEnter={() => setHover(i)}
                onMouseLeave={() => setHover(null)}
                className={`py-3.5 text-[15px] font-semibold transition-colors ${
                  isActive(item.href)
                    ? "text-brand-berry"
                    : "text-ink hover:text-brand-berry"
                }`}
              >
                {item.label}
              </Link>
            ))}
            {/* animated dark-pink underline */}
            <span
              className="pointer-events-none absolute bottom-0 h-[3px] rounded-full transition-[transform,width,opacity] duration-300 ease-out"
              style={{
                transform: `translateX(${bar.left}px)`,
                width: `${bar.width}px`,
                opacity: bar.ready ? 1 : 0,
                backgroundImage:
                  "linear-gradient(90deg, #ad1765 0%, #f2295b 100%)",
              }}
            />
          </nav>
        </div>
      </header>

      {/* Mobile slide-in menu — rendered OUTSIDE the backdrop-blurred header so
          `position: fixed` resolves against the viewport (full height, on top). */}
      <div
        className={`fixed inset-0 z-[60] overflow-hidden md:hidden ${
          open ? "" : "pointer-events-none"
        }`}
        aria-hidden={!open}
      >
        <div
          className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${
            open ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setOpen(false)}
        />
        <aside
          className={`bg-grad-footer absolute right-0 top-0 flex h-full w-[320px] max-w-[86vw] flex-col gap-7 p-7 text-white shadow-2xl transition-transform duration-300 ease-out ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={site.logoWhite}
              alt={site.name}
              className="h-12 w-auto"
            />
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white transition hover:bg-white/25"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>

          <nav className="mt-2 flex flex-col gap-1">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-xl px-4 py-3 text-lg font-semibold transition ${
                  isActive(item.href)
                    ? "bg-white/15 text-white"
                    : "text-white/85 hover:bg-white/10 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <Link
            href="/contact"
            className="mt-auto inline-flex items-center justify-center rounded-full bg-white px-6 py-3 font-semibold text-brand-berry"
          >
            Contact Us
          </Link>
        </aside>
      </div>
    </>
  );
}
