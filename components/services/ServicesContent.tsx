"use client";

import { useEffect, useRef } from "react";
import { useTranslations, useLocale } from "next-intl";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "@/i18n/navigation";
import SectionBadge from "@/components/ui/SectionBadge";

gsap.registerPlugin(ScrollTrigger);

const SERVICE_KEYS = ["solar", "audit", "maintenance", "conseil"] as const;

const ICONS = {
  solar: (
    <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="4" />
      <line x1="12" y1="2" x2="12" y2="4" /><line x1="12" y1="20" x2="12" y2="22" />
      <line x1="2" y1="12" x2="4" y2="12" /><line x1="20" y1="12" x2="22" y2="12" />
      <line x1="4.93" y1="4.93" x2="6.34" y2="6.34" /><line x1="17.66" y1="17.66" x2="19.07" y2="19.07" />
      <line x1="4.93" y1="19.07" x2="6.34" y2="17.66" /><line x1="17.66" y1="6.34" x2="19.07" y2="4.93" />
    </svg>
  ),
  audit: (
    <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" />
    </svg>
  ),
  maintenance: (
    <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  ),
  conseil: (
    <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  ),
};

export default function ServicesContent() {
  const t = useTranslations("services");
  const locale = useLocale();
  const isRTL = locale === "ar";
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".srv-reveal").forEach((el, i) => {
        gsap.fromTo(
          el,
          { y: 40, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.75, delay: i * 0.08, ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 82%" },
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <main ref={sectionRef} className={`${isRTL ? "font-cairo" : ""}`}>

      {/* ── Hero ── */}
      <section className="bg-[#1D1D1B] pt-36 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className={`srv-reveal max-w-3xl ${isRTL ? "mr-auto text-right" : ""}`}>
            <SectionBadge variant="dark">{t("badge")}</SectionBadge>
            <h1 className="text-5xl md:text-6xl font-extrabold text-white mt-5 mb-6 leading-tight">
              {t("title")}
            </h1>
            <p className="text-gray-400 text-xl leading-relaxed">{t("subtitle")}</p>
          </div>
        </div>
      </section>

      {/* ── Services list ── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 space-y-16">
          {SERVICE_KEYS.map((key, i) => {
            const isEven = i % 2 === 0;
            return (
              <div
                key={key}
                className={`srv-reveal grid md:grid-cols-2 gap-12 items-center ${
                  isRTL
                    ? !isEven ? "md:flex-row" : ""
                    : !isEven ? "md:[grid-template-columns:1fr_1fr]" : ""
                }`}
              >
                {/* Visual */}
                <div
                  className={`rounded-3xl aspect-[4/3] flex items-center justify-center relative overflow-hidden ${
                    (!isEven && !isRTL) || (isEven && isRTL) ? "md:order-2" : "md:order-1"
                  }`}
                  style={{
                    background: [
                      "linear-gradient(135deg, #FFF3CC 0%, #FFE88A 100%)",
                      "linear-gradient(135deg, #E8F5E9 0%, #A5D6A7 100%)",
                      "linear-gradient(135deg, #F3F4F6 0%, #E5E7EB 100%)",
                      "linear-gradient(135deg, #FFF3CC 0%, #F8A700 100%)",
                    ][i],
                  }}
                >
                  <div
                    className="w-24 h-24 rounded-2xl flex items-center justify-center"
                    style={{
                      backgroundColor: ["#F8A700", "#17A73D", "#1D1D1B", "#F8A700"][i],
                      color: "white",
                    }}
                  >
                    {ICONS[key]}
                  </div>
                  {/* Decorative blob */}
                  <div
                    className="absolute -top-8 -right-8 w-32 h-32 rounded-full opacity-30 animate-blob"
                    style={{ backgroundColor: ["#F8A700", "#17A73D", "#9CA3AF", "#F8A700"][i] }}
                  />
                </div>

                {/* Text */}
                <div
                  className={`${
                    (!isEven && !isRTL) || (isEven && isRTL) ? "md:order-1" : "md:order-2"
                  } ${isRTL ? "text-right" : ""}`}
                >
                  <p className="text-[#F8A700] text-xs font-bold uppercase tracking-widest mb-3">
                    {t(`${key}.tagline`)}
                  </p>
                  <h2 className="text-3xl md:text-4xl font-extrabold text-[#1D1D1B] mb-4 leading-tight">
                    {t(`${key}.title`)}
                  </h2>
                  <p className="text-gray-500 leading-relaxed mb-6">{t(`${key}.desc`)}</p>

                  <ul className="space-y-3 mb-8">
                    {(t.raw(`${key}.features`) as string[]).map((f: string) => (
                      <li
                        key={f}
                        className={`flex items-center gap-3 text-[#1D1D1B] font-medium ${
                          isRTL ? "flex-row-reverse" : ""
                        }`}
                      >
                        <span className="w-6 h-6 rounded-full bg-[#E8F5E9] text-[#17A73D] flex items-center justify-center flex-shrink-0">
                          <svg width="12" height="12" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 bg-[#F8A700] hover:bg-[#D48F00] text-[#1D1D1B] font-extrabold px-7 py-3.5 rounded-full transition-all duration-200 hover:scale-105 shadow-sm"
                  >
                    {t("learnMore")}
                    <svg className={`w-4 h-4 ${isRTL ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
