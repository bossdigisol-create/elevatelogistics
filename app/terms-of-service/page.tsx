import PageHero from "@/components/PageHero";
import JsonLd from "@/components/JsonLd";
import { pageMeta, breadcrumbJsonLd } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMeta({
  title: "Terms of Service",
  description:
    "The terms and conditions that govern your access to and use of the Elevate Logistic Solutions website.",
  path: "/terms-of-service",
});

const sections = [
  {
    h: "1. Acceptance of Terms",
    p: "By using our website, you agree to these Terms of Service, our Privacy Policy, and any other policies or guidelines posted on the site.",
  },
  {
    h: "2. Use of the Site",
    p: "You agree to use the website for lawful purposes only. You may not use the site:",
    list: [
      "In any way that violates any applicable federal, state, local, or international law or regulation.",
      "To send, knowingly receive, upload, download, use, or re-use any material that does not comply with our content standards.",
    ],
  },
  {
    h: "3. Intellectual Property Rights",
    p: "All content on this website, including text, graphics, logos, and software, is the property of Elevate Logistic Solutions or its licensors and is protected by copyright, trademark, and other intellectual property laws.",
  },
  {
    h: "4. User Accounts",
    p: "You may be required to create an account to access certain features of the site. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.",
  },
  {
    h: "5. Limitation of Liability",
    p: "Elevate Logistic Solutions shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising from your access to or use of the website, including but not limited to any damages related to loss of data or profits.",
  },
  {
    h: "6. Changes to Terms",
    p: "We may revise these Terms of Service from time to time. Any changes will be effective immediately upon posting. Your continued use of the site following any changes constitutes your acceptance of the new terms.",
  },
  {
    h: "7. Governing Law",
    p: "These terms are governed by and construed in accordance with the law, without regard to its conflict of law provisions.",
  },
  {
    h: "8. Contact Information",
    p: "For any questions or concerns regarding these terms, please contact us directly.",
  },
];

export default function TermsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Terms of Service", path: "/terms-of-service" },
        ])}
      />
      <PageHero title="Terms of Service" />

      <section className="section-x py-16 md:py-24">
        <div className="mx-auto max-w-3xl space-y-8 leading-relaxed text-muted">
          <p>
            Welcome to Elevate Logistic Solutions. By accessing or using our website,
            you agree to comply with and be bound by the following terms and
            conditions. If you do not agree to these terms, please do not use our site.
          </p>

          {sections.map((s) => (
            <div key={s.h}>
              <h2 className="text-xl font-bold text-ink">{s.h}</h2>
              <p className="mt-3">{s.p}</p>
              {s.list ? (
                <ul className="mt-3 list-disc space-y-2 pl-6">
                  {s.list.map((li) => (
                    <li key={li}>{li}</li>
                  ))}
                </ul>
              ) : null}
            </div>
          ))}

          <p>
            Questions? Reach us at{" "}
            <a
              href={`mailto:${site.email}`}
              className="font-semibold text-brand-berry hover:underline"
            >
              {site.email}
            </a>
            .
          </p>
        </div>
      </section>
    </>
  );
}
