import Link from "next/link";

export default function CtaBanner({
  heading,
  buttonLabel = "Let's Connect Today!",
  href = "/contact",
}: {
  heading: string;
  buttonLabel?: string;
  href?: string;
}) {
  return (
    <section className="section-x py-16 md:py-20">
      <div className="bg-grad-cta relative mx-auto max-w-[1240px] overflow-hidden rounded-[2rem] px-8 py-14 text-white md:px-16">
        <div className="blob right-[14%] top-[-40px] h-56 w-56" />
        <div className="blob right-[24%] bottom-[-70px] h-64 w-64" />
        <div className="blob left-[45%] top-[20%] h-40 w-40" />
        <div className="relative flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
          <h2 className="max-w-3xl text-2xl font-extrabold leading-snug md:text-4xl">
            {heading}
          </h2>
          <Link href={href} className="btn-outline shrink-0 text-base">
            {buttonLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
