import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Elevate Logistic Solutions collects, uses, and protects your personal information.",
};

export default function PrivacyPage() {
  return (
    <>
      <PageHero title="Privacy Policy" />

      <section className="section-x py-16 md:py-24">
        <div className="mx-auto max-w-3xl space-y-8 leading-relaxed text-muted">
          <p>
            Elevate Logistic Solutions respects your privacy and is committed to
            protecting your personal information. This Privacy Policy outlines how we
            collect, use, and protect your information.
          </p>

          <div>
            <h2 className="text-xl font-bold text-ink">1. Information We Collect</h2>
            <p className="mt-3">We may collect the following types of information:</p>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>
                <strong className="text-ink">Personal information:</strong> Name, email
                address, phone number, and any other information you provide when you
                create an account, apply for jobs, or contact us.
              </li>
              <li>
                <strong className="text-ink">Usage Data:</strong> Information about how
                you use our website, including your IP address, browser type, pages
                visited, and the time and date of your visit.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold text-ink">2. How We Use Your Information</h2>
            <p className="mt-3">We use your information for the following purposes:</p>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>To provide and maintain our services.</li>
              <li>To communicate with you regarding your applications or inquiries.</li>
              <li>To improve our website and services based on user feedback.</li>
              <li>
                To send you newsletters, job alerts, and promotional materials (you may
                opt out at any time).
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold text-ink">3. Sharing Your Information</h2>
            <p className="mt-3">
              We do not sell or rent your personal information to third parties. We may
              share your information in the following circumstances:
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>With your consent.</li>
              <li>
                With third-party service providers who assist us in operating our
                website and conducting our business.
              </li>
              <li>
                To comply with legal obligations, respond to subpoenas, or protect our
                rights.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold text-ink">4. Data Security</h2>
            <p className="mt-3">
              We implement reasonable security measures to protect your personal
              information from unauthorized access, use, or disclosure. However, no
              method of transmission over the internet or electronic storage is 100%
              secure.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-ink">5. Your Rights</h2>
            <p className="mt-3">You have the right to:</p>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>Access and obtain a copy of your personal information.</li>
              <li>Request correction of inaccurate or incomplete information.</li>
              <li>
                Request deletion of your personal information, subject to certain
                exceptions.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold text-ink">6. Changes to This Privacy Policy</h2>
            <p className="mt-3">
              We may update this Privacy Policy from time to time. Any changes will be
              posted on this page with an updated effective date. Your continued use of
              the website after any changes indicates your acceptance of the new policy.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-ink">7. Contact Us</h2>
            <p className="mt-3">
              If you have any questions or concerns about this Privacy Policy, please
              contact us at:{" "}
              <a
                href={`mailto:${site.email}`}
                className="font-semibold text-brand-berry hover:underline"
              >
                {site.email}
              </a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
