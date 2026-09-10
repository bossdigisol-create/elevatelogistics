import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { site } from "@/lib/site";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default:
      "Elevate Logistic Solutions — Strategic Healthcare Workforce Solutions",
    template: "%s — Elevate Logistic Solutions",
  },
  description:
    "Elevate Logistic Solutions is a women-owned, vendor-neutral healthcare workforce MSP. We deliver data-informed staffing, workforce management, and consulting that improves care and scales with your needs.",
  keywords: site.keywords,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  category: "Healthcare Staffing",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    title:
      "Elevate Logistic Solutions — Strategic Healthcare Workforce Solutions",
    description:
      "Women-owned, vendor-neutral healthcare workforce MSP delivering data-informed staffing, workforce management, and consulting.",
    url: site.url,
    locale: "en_US",
    images: [{ url: site.ogImage, width: 1200, height: 630, alt: site.name }],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Elevate Logistic Solutions — Strategic Healthcare Workforce Solutions",
    description:
      "Women-owned, vendor-neutral healthcare workforce MSP delivering data-informed staffing, workforce management, and consulting.",
    images: [site.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    apple: site.iconOutline,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${archivo.variable} h-full`}>
      <body className="flex min-h-full flex-col bg-surface antialiased">
        <JsonLd data={[organizationJsonLd(), websiteJsonLd()]} />
        <Header />
        <main className="flex-1 overflow-x-clip">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
