"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { nav, site } from "@/lib/site";

// Layout effect on the client (measures the underline before paint → no flash),
// plain effect on the server so there is no SSR "useLayoutEffect does nothing"
// warning. Named so it isn't treated as a raw effect that sets state in its body.
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Close the mobile menu when the route changes. Adjusting state during render
  // (comparing against the previous value) is React's recommended alternative
  // to a setState-in-effect, and avoids an extra render pass.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

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
  useIsomorphicLayoutEffect(() => {
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

  // Shadow-only scroll flag. This toggles a box-shadow (no layout change, so it
  // can never cause the sticky rows to reflow) — the row show/hide behaviour is
  // handled entirely by CSS `position: sticky`, which is what keeps it smooth.
  useEffect(() => {
    let ticking = false;
    const update = () => {
      setScrolled(window.scrollY > 8);
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* Row 1 (banner): logo + (desktop) Contact / (mobile) menu button.
          Sticky on mobile so the menu button is always reachable; STATIC on
          desktop so it scrolls away naturally on scroll-down while the nav bar
          (Row 2) stays pinned. Row 1 and Row 2 are BOTH direct children of the
          document flow (not wrapped in a shared box) so `position: sticky`
          resolves against the page, not a short parent. Pure CSS — no JS on the
          scroll path, so it never flickers. */}
      <header
        className={`sticky top-0 z-50 bg-header/95 backdrop-blur transition-shadow duration-300 md:static ${
          scrolled ? "shadow-[0_6px_24px_-16px_rgba(28,27,34,0.5)] md:shadow-none" : ""
        }`}
      >
        <div className="mx-auto flex max-w-[1240px] items-center justify-between px-5 py-3 md:py-4">
          <Link href="/" aria-label={site.name} className="shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={site.logo}
              alt={site.name}
              className="h-14 w-auto md:h-24"
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
      </header>

      {/* Row 2: desktop nav with sliding underline + menu (bar) button.
          A sibling of Row 1 (not nested) so it sticks to the top of the page
          once Row 1 scrolls away on desktop. */}
      <div
        className={`sticky top-0 z-40 hidden border-t border-black/5 bg-header/95 backdrop-blur transition-shadow duration-300 md:block ${
          scrolled ? "shadow-[0_6px_24px_-16px_rgba(28,27,34,0.5)]" : ""
        }`}
      >
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

            {/* Desktop menu (bar) button — pinned to the right of the sticky nav */}
            <button
              type="button"
              aria-label="Open menu"
              aria-expanded={open}
              onClick={() => setOpen(true)}
              className="group ml-auto flex h-10 w-10 flex-col items-center justify-center gap-[5px] rounded-xl text-ink transition hover:bg-black/[0.06]"
            >
              <span className="block h-[2.5px] w-5 rounded-full bg-current transition-all duration-300 group-hover:w-6" />
              <span className="block h-[2.5px] w-6 rounded-full bg-current" />
              <span className="block h-[2.5px] w-5 rounded-full bg-current transition-all duration-300 group-hover:w-6" />
            </button>

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

      {/* Slide-in menu (mobile toggle + desktop bar button) — rendered OUTSIDE the
          sticky rows so `position: fixed` resolves against the viewport (full
          height, on top). */}
      <div
        className={`fixed inset-0 z-[60] overflow-hidden ${
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
            {/* Contact is omitted here — the "Contact Us" button below covers it. */}
            {nav
              .filter((item) => item.href !== "/contact")
              .map((item) => (
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
