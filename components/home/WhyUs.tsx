"use client";

import { useEffect, useRef } from "react";
import { useTranslations, useLocale } from "next-intl";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionBadge from "@/components/ui/SectionBadge";

gsap.registerPlugin(ScrollTrigger);

const ADVANTAGE_KEYS = ["a1", "a2", "a3", "a4"] as const;

const ICONS = [
  <svg key="a1" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </svg>,
  <svg key="a2" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>,
  <svg key="a3" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <circle cx="12" cy="8" r="6" /><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
  </svg>,
  <svg key="a4" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>,
];

const BARS = [
  { pct: 70, labelKey: "stat1" as const, color: "#F8A700" },
  { pct: 85, labelKey: "stat2" as const, color: "#17A73D" },
  { pct: 55, labelKey: "stat3" as const, color: "#1D1D1B" },
];

export default function WhyUs() {
  const t = useTranslations("whyUs");
  const tAbout = useTranslations("about");
  const locale = useLocale();
  const isRTL = locale === "ar";
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".why-text",
        { x: isRTL ? 40 : -40, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.9, ease: "power2.out",
          scrollTrigger: { trigger: ".why-text", start: "top 80%" },
        }
      );
      gsap.fromTo(
        ".why-item",
        { x: isRTL ? 30 : -30, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.6, stagger: 0.12, ease: "power2.out",
          scrollTrigger: { trigger: ".why-item", start: "top 82%" },
        }
      );
      gsap.fromTo(
        ".why-visual",
        { x: isRTL ? -40 : 40, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.9, ease: "power2.out",
          scrollTrigger: { trigger: ".why-visual", start: "top 80%" },
        }
      );
      // Animate bars when they come into view
      ScrollTrigger.create({
        trigger: ".gauge-wrapper",
        start: "top 80%",
        onEnter: () => {
          document.querySelectorAll<HTMLElement>(".bar-fill").forEach((el) => {
            gsap.fromTo(el, { width: "0%" }, { width: el.dataset.pct + "%", duration: 1.2, ease: "power2.out" });
          });
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [isRTL]);

  return (
    <section ref={sectionRef} className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className={`grid md:grid-cols-2 gap-16 items-center ${isRTL ? "md:flex-row-reverse" : ""}`}>

          {/* Text */}
          <div className={`why-text ${isRTL ? "text-right font-cairo" : ""}`}>
            <SectionBadge>{t("badge")}</SectionBadge>
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#1D1D1B] mt-4 mb-4 leading-tight">
              {t("title")}
            </h2>
            <p className="text-gray-500 text-lg mb-10">{t("subtitle")}</p>

            <div className="space-y-7">
              {ADVANTAGE_KEYS.map((key, i) => (
                <div
                  key={key}
                  className={`why-item flex items-start gap-5 ${isRTL ? "flex-row-reverse" : ""}`}
                >
                  <div className="w-12 h-12 rounded-xl bg-[#FFF3CC] text-[#F8A700] flex items-center justify-center flex-shrink-0">
                    {ICONS[i]}
                  </div>
                  <div>
                    <h4 className="font-bold text-[#1D1D1B] text-base mb-1">
                      {t(`${key}.title`)}
                    </h4>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      {t(`${key}.desc`)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Visual */}
          <div className="why-visual">
            <div className="bg-gradient-to-br from-gray-50 to-[#FFF3CC]/30 rounded-3xl p-8 border border-gray-100 shadow-lg">
              <h3 className={`font-extrabold text-xl text-[#1D1D1B] mb-1 ${isRTL ? "text-right font-cairo" : ""}`}>
                {locale === "ar" ? "توفير الطاقة المحقق" : "Économies d'énergie réalisées"}
              </h3>
              <p className={`text-gray-400 text-sm mb-8 ${isRTL ? "text-right" : ""}`}>
                {locale === "ar" ? "حسب قطاع النشاط" : "Par secteur d'activité"}
              </p>

              <div className="gauge-wrapper space-y-5 mb-10">
                {BARS.map((b, i) => (
                  <div key={i}>
                    <div className={`flex justify-between items-center mb-2 ${isRTL ? "flex-row-reverse" : ""}`}>
                      <span className="font-semibold text-sm text-[#1D1D1B]">
                        {tAbout(b.labelKey)}
                      </span>
                      <span className="font-bold text-sm" style={{ color: b.color }}>
                        {b.pct}%
                      </span>
                    </div>
                    <div className="h-2.5 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="bar-fill h-full rounded-full"
                        style={{ width: "0%", backgroundColor: b.color }}
                        data-pct={b.pct}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-2xl p-5 text-center shadow-sm border border-gray-100">
                  <div className="text-3xl font-extrabold text-[#F8A700]">25 ans</div>
                  <div className="text-gray-500 text-xs mt-1">{t("guarantee")}</div>
                </div>
                <div className="bg-[#F8A700] rounded-2xl p-5 text-center">
                  <div className="text-3xl font-extrabold text-[#1D1D1B]">~5 ans</div>
                  <div className="text-[#3d3c39] text-xs mt-1">{t("roi")}</div>
                </div>
              </div>

              <div className="flex gap-2 mt-6">
                <div className="flex-1 h-1 rounded-full bg-[#F8A700]" />
                <div className="flex-1 h-1 rounded-full bg-[#17A73D]" />
                <div className="flex-1 h-1 rounded-full bg-[#1D1D1B]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
