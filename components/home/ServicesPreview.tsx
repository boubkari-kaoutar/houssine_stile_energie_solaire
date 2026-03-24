"use client";

import { useEffect, useRef } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionBadge from "@/components/ui/SectionBadge";

gsap.registerPlugin(ScrollTrigger);

const SERVICE_KEYS = ["solar", "audit", "maintenance", "conseil"] as const;

const ICONS = {
  solar: (
    <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="4" />
      <line x1="12" y1="2" x2="12" y2="4" /><line x1="12" y1="20" x2="12" y2="22" />
      <line x1="2" y1="12" x2="4" y2="12" /><line x1="20" y1="12" x2="22" y2="12" />
      <line x1="4.93" y1="4.93" x2="6.34" y2="6.34" /><line x1="17.66" y1="17.66" x2="19.07" y2="19.07" />
      <line x1="4.93" y1="19.07" x2="6.34" y2="17.66" /><line x1="17.66" y1="6.34" x2="19.07" y2="4.93" />
    </svg>
  ),
  audit: (
    <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  ),
  maintenance: (
    <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  ),
  conseil: (
    <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  ),
};

export default function ServicesPreview() {
  const t = useTranslations("services");
  const locale = useLocale();
  const isRTL = locale === "ar";
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".services-header",
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: "power2.out",
          scrollTrigger: { trigger: ".services-header", start: "top 85%" },
        }
      );
      cardRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { y: 40, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.65, delay: i * 0.1, ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 82%" },
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="services-preview" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className={`services-header text-center mb-16 ${isRTL ? "font-cairo" : ""}`}>
          <SectionBadge>{t("badge")}</SectionBadge>
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#1D1D1B] mt-4 mb-4">
            {t("title")}
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">{t("subtitle")}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICE_KEYS.map((key, i) => (
            <div
              key={key}
              ref={(el) => { cardRefs.current[i] = el; }}
              className="service-card card-shine bg-white rounded-2xl p-7 border border-gray-100 shadow-sm flex flex-col group"
            >
              <div
                className={`w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-colors duration-300 ${
                  i === 1
                    ? "bg-[#F8A700] text-[#1D1D1B] group-hover:bg-[#D48F00]"
                    : "bg-[#FFF3CC] text-[#F8A700] group-hover:bg-[#F8A700] group-hover:text-[#1D1D1B]"
                }`}
              >
                {ICONS[key]}
              </div>

              <p className="text-[#F8A700] text-xs font-bold uppercase tracking-widest mb-2">
                {t(`${key}.tagline`)}
              </p>

              <h3
                className={`font-extrabold text-[#1D1D1B] text-lg mb-3 ${
                  isRTL ? "text-right font-cairo" : ""
                }`}
              >
                {t(`${key}.title`)}
              </h3>

              <p className="text-gray-500 text-sm leading-relaxed flex-1 mb-5">
                {t(`${key}.desc`)}
              </p>

              <ul className="space-y-1.5 mb-6">
                {(t.raw(`${key}.features`) as string[]).map((f: string) => (
                  <li key={f} className={`flex items-center gap-2 text-sm text-gray-600 ${isRTL ? "flex-row-reverse" : ""}`}>
                    <svg className="w-4 h-4 text-[#17A73D] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>

              <Link
                href="/services"
                className={`flex items-center gap-1.5 text-sm font-bold text-[#F8A700] hover:text-[#D48F00] transition-colors mt-auto ${
                  isRTL ? "flex-row-reverse" : ""
                }`}
              >
                {t("learnMore")}
                <svg
                  className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${isRTL ? "rotate-180 group-hover:-translate-x-1" : ""}`}
                  fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
