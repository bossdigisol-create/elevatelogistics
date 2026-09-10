import type { Metadata } from "next";
import { site } from "@/lib/site";

/**
 * Build consistent, keyword-rich page metadata (canonical + Open Graph + Twitter)
 * from a single call. Keeps on-page SEO uniform across every route.
 */
export function pageMeta({
  title,
  description,
  path,
  keywords,
}: {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
}): Metadata {
  const url = path === "/" ? site.url : `${site.url}${path}`;
  const fullTitle =
    path === "/" ? `${site.name} — ${title}` : `${title} — ${site.name}`;

  return {
    title,
    description,
    keywords: keywords ?? site.keywords,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: site.name,
      title: fullTitle,
      description,
      url,
      locale: "en_US",
      images: [
        {
          url: site.ogImage,
          width: 1200,
          height: 630,
          alt: site.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [site.ogImage],
    },
  };
}

/* ------------------------------------------------------------------ */
/*  JSON-LD structured data                                           */
/* ------------------------------------------------------------------ */

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "LocalBusiness"],
    "@id": `${site.url}/#organization`,
    name: site.name,
    alternateName: site.shortName,
    url: site.url,
    email: site.email,
    logo: `${site.url}${site.logo}`,
    image: `${site.url}${site.ogImage}`,
    description:
      "A women-owned, vendor-neutral Managed Service Provider (MSP) delivering data-informed healthcare workforce solutions—staffing, workforce management, and consulting.",
    slogan: site.tagline,
    areaServed: "US",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Rochester",
      addressRegion: "NY",
      addressCountry: "US",
    },
    contactPoint: {
      "@type": "ContactPoint",
      email: site.email,
      contactType: "customer service",
      areaServed: "US",
      availableLanguage: "English",
    },
    knowsAbout: site.keywords,
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    url: site.url,
    name: site.name,
    publisher: { "@id": `${site.url}/#organization` },
    inLanguage: "en-US",
  };
}

export function faqJsonLd(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function servicesJsonLd(groups: { group: string; intro: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: groups.map((g, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Service",
        name: g.group,
        description: g.intro,
        provider: { "@id": `${site.url}/#organization` },
        areaServed: "US",
        serviceType: "Healthcare workforce solutions",
      },
    })),
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${site.url}${it.path}`,
    })),
  };
}
