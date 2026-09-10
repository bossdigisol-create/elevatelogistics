"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav, site } from "@/lib/site";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={`sticky top-0 z-50 bg-header/95 backdrop-blur transition-shadow ${
        scrolled ? "shadow-[0_6px_24px_-16px_rgba(28,27,34,0.5)]" : ""
      }`}
    >
      {/* Row 1: logo + Contact Us */}
      <div className="mx-auto flex max-w-[1240px] items-center justify-between px-5 py-4">
        <Link href="/" aria-label={site.name} className="shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={site.logo} alt={site.name} className="h-12 w-auto md:h-14" />
        </Link>

        <Link href="/contact" className="btn-pill hidden text-sm sm:inline-flex">
          Contact Us
        </Link>
      </div>

      {/* Row 2: nav + hamburger */}
      <div className="border-t border-black/5">
        <div className="mx-auto flex max-w-[1240px] items-center justify-between px-5 py-3">
          <nav className="hidden items-center gap-8 md:flex">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-[15px] font-medium transition-colors hover:text-brand-berry ${
                  isActive(item.href) ? "text-brand-berry" : "text-ink"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Mobile: brand small text */}
          <span className="text-sm font-semibold text-ink md:hidden">Menu</span>

          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="bg-grad-radial flex h-11 w-11 items-center justify-center rounded-full text-white shadow-pill"
          >
            <span className="sr-only">Menu</span>
            {open ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Slide-in menu */}
      <div
        className={`fixed inset-0 z-40 overflow-hidden transition ${
          open ? "visible opacity-100" : "pointer-events-none invisible opacity-0"
        }`}
      >
        <div
          className="absolute inset-0 bg-black/40"
          onClick={() => setOpen(false)}
        />
        <aside
          className={`bg-grad-footer absolute right-0 top-0 flex h-full w-[300px] max-w-[85vw] flex-col gap-6 p-8 text-white transition-transform duration-300 ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={site.logoWhite} alt={site.name} className="h-12 w-auto self-start" />
          <nav className="mt-2 flex flex-col gap-4">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-lg font-semibold text-white/90 transition hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <Link
            href="/contact"
            className="mt-2 inline-flex items-center justify-center rounded-full bg-white px-6 py-3 font-semibold text-brand-berry"
          >
            Contact Us
          </Link>
        </aside>
      </div>
    </header>
  );
}
