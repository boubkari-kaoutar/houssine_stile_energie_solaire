"use client";

import { useEffect, useRef } from "react";
import { useTranslations, useLocale } from "next-intl";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import WhyUsGrid from "@/components/ui/WhyUsGrid";

gsap.registerPlugin(ScrollTrigger);

export default function WhyUs() {
  const t      = useTranslations("whyUs");
  const tAbout = useTranslations("about");
  const locale = useLocale();
  const isRTL  = locale === "ar";
  const sectionRef = useRef<HTMLElement>(null);
  const barsRef    = useRef<HTMLDivElement>(null);

  const BARS = [
    { pct: 70,  label: tAbout("stat1"), color: "#F8A700" },
    { pct: 85,  label: tAbout("stat2"), color: "#17A73D" },
    { pct: 55,  label: tAbout("stat3"), color: "#1D1D1B" },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".why-card").forEach((el) => {
        gsap.fromTo(el,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 85%" } }
        );
      });
      gsap.fromTo(".why-metric",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power2.out",
          scrollTrigger: { trigger: ".why-metric", start: "top 85%" } }
      );
      ScrollTrigger.create({
        trigger: ".gauge-wrapper",
        start: "top 82%",
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
    <section ref={sectionRef}>

      {/* ── Part 1 : dark 2×2 grid ── */}
      <div className="py-24 bg-[#1D1D1B] relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#F8A700]/30 to-transparent" />

        <div className="max-w-7xl mx-auto px-6">
          <div className={`mb-16 ${isRTL ? "text-right font-cairo" : ""}`}>
            <p className="text-[#F8A700] text-xs font-bold uppercase tracking-[0.3em] mb-4">
              {locale === "ar" ? "مميزاتنا" : "Nos avantages"}
            </p>
            <h2 className="text-5xl md:text-6xl font-extrabold text-white leading-[0.95] tracking-tight max-w-2xl">
              {locale === "ar" ? "لماذا تختار صنست إنرجي؟" : "Pourquoi choisir Sunset Energy ?"}
            </h2>
          </div>

          <WhyUsGrid animClass="why-card" />
        </div>
      </div>

      {/* ── Part 2 : progress bars + metric cards ── */}
      <div className="py-20 bg-[#F9F6F1]">
        <div className="max-w-5xl mx-auto px-6">
          <div ref={barsRef}
            className="bg-white rounded-3xl p-8 md:p-12 shadow-[0_8px_60px_rgba(0,0,0,0.08)] border border-gray-100">

            <h3 className={`font-extrabold text-2xl text-[#1D1D1B] mb-1 ${isRTL ? "text-right font-cairo" : ""}`}>
              {locale === "ar" ? "توفير الطاقة المحقق" : "Économies d'énergie réalisées"}
            </h3>
            <p className={`text-gray-400 text-sm mb-10 ${isRTL ? "text-right" : ""}`}>
              {locale === "ar" ? "حسب قطاع النشاط" : "Par secteur d'activité"}
            </p>

            {/* Bars */}
            <div className="gauge-wrapper space-y-6 mb-12">
              {BARS.map((b, i) => (
                <div key={i}>
                  <div className={`flex justify-between items-center mb-2 ${isRTL ? "flex-row-reverse" : ""}`}>
                    <span className="font-semibold text-sm text-[#1D1D1B]">{b.label}</span>
                    <span className="font-bold text-sm" style={{ color: b.color }}>{b.pct}%</span>
                  </div>
                  <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="bar-fill h-full rounded-full"
                      style={{ width: "0%", backgroundColor: b.color }}
                      data-pct={b.pct}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Metric cards */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="why-metric bg-gray-50 rounded-2xl p-6 text-center border border-gray-100">
                <div className="text-4xl font-extrabold text-[#F8A700]">25 ans</div>
                <div className="text-gray-500 text-xs mt-2 uppercase tracking-wide">{t("guarantee")}</div>
              </div>
              <div className="why-metric bg-[#F8A700] rounded-2xl p-6 text-center">
                <div className="text-4xl font-extrabold text-[#1D1D1B]">~5 ans</div>
                <div className="text-[#3d3c39] text-xs mt-2 uppercase tracking-wide">{t("roi")}</div>
              </div>
            </div>

            {/* Color legend */}
            <div className="flex gap-2">
              {BARS.map((b, i) => (
                <div key={i} className="flex-1 h-1 rounded-full" style={{ backgroundColor: b.color }} />
              ))}
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
