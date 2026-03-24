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

  const STATS = [
    { target: 70, suffix: "+", label: tAbout("stat1"), color: "#F8A700" },
    { target: 85, suffix: "%", label: tAbout("stat2"), color: "#17A73D" },
    { target: 55, suffix: "%", label: tAbout("stat3"), color: "#F8A700" },
    { target: 25, suffix: " ans", label: t("guarantee"), color: "#FFFFFF" },
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
      gsap.utils.toArray<HTMLElement>(".stat-num").forEach((el) => {
        const target = parseFloat(el.getAttribute("data-target") || "0");
        gsap.to(el, {
          textContent: target,
          duration: 2.5,
          ease: "power2.out",
          snap: { textContent: 1 },
          scrollTrigger: { trigger: ".stats-banner", start: "top 85%" }
        });
      });
      
      gsap.fromTo(".stat-item",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power2.out",
          scrollTrigger: { trigger: ".stats-banner", start: "top 85%" } }
      );
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

      {/* ── Part 2 : Stats Banner ── */}
      <div className="stats-banner py-16 md:py-20 bg-[#141412] relative overflow-hidden border-t border-white/[0.04]">
        {/* Ambient Glow */}
        <div className="absolute inset-x-0 bottom-0 h-full pointer-events-none" style={{ background: "radial-gradient(ellipse at center bottom, rgba(248,167,0,0.04) 0%, transparent 60%)" }} />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className={`grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-12 md:gap-8 divide-none md:divide-x divide-white/10 ${isRTL ? "md:divide-x-reverse" : ""}`}>
            {STATS.map((s, i) => (
              <div key={i} className={`stat-item flex flex-col items-center justify-center text-center px-4 ${i === 0 ? "md:border-l-0" : ""}`}>
                <div className={`flex items-baseline justify-center gap-1 mb-3 ${isRTL ? "flex-row-reverse" : ""}`}>
                  <span className="stat-num text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter" style={{ color: s.color }} data-target={s.target}>
                    0
                  </span>
                  <span className="text-2xl md:text-4xl font-bold" style={{ color: s.color }}>{s.suffix}</span>
                </div>
                <p className="text-gray-400 text-xs md:text-sm font-bold uppercase tracking-widest max-w-[200px]">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}
