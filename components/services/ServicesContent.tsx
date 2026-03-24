"use client";

import { useEffect, useRef } from "react";
import { useTranslations, useLocale } from "next-intl";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "@/i18n/navigation";
import ServicesCards from "@/components/ui/ServicesCards";
import ServiceBlocks from "@/components/ui/ServiceBlocks";

gsap.registerPlugin(ScrollTrigger);



// ─── Component ─────────────────────────────────────────────────────────────────
export default function ServicesContent() {
  const t = useTranslations("services");
  const locale = useLocale();
  const isRTL = locale === "ar";
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero text
      gsap.from(".srv-hero-line", {
        y: 60, opacity: 0, duration: 0.9, stagger: 0.12, ease: "power3.out", delay: 0.2,
      });


    }, mainRef);
    return () => ctx.revert();
  }, [locale]);

  return (
    <main ref={mainRef} className={isRTL ? "font-cairo" : ""}>

      {/* ── Hero with video bg ─────────────────────────────────────────────── */}
      <section className="relative min-h-[65vh] flex items-end pb-24 overflow-hidden bg-[#1D1D1B]">
        <video autoPlay muted loop playsInline suppressHydrationWarning
          className="absolute inset-0 w-full h-full object-cover">
          <source src="/videos/video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[#1D1D1B]/65" />
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#1D1D1B] to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-36 w-full">
          <p className="srv-hero-line text-[#F8A700] text-xs font-bold uppercase tracking-[0.25em] mb-5">
            {t("badge")}
          </p>
          <h1 className={`srv-hero-line text-5xl md:text-7xl font-extrabold text-white leading-[1.0] mb-6 ${isRTL ? "text-right" : ""}`}>
            {t("title")}
          </h1>
          <p className={`srv-hero-line text-gray-400 text-lg md:text-xl max-w-2xl leading-relaxed ${isRTL ? "text-right mr-auto" : ""}`}>
            {t("subtitle")}
          </p>
        </div>
      </section>

      {/* ── Service sections ───────────────────────────────────────────────── */}
      <ServiceBlocks />

      {/* ── Quel service vous correspond ? ─────────────────────────────────── */}
      <section className="relative py-24 lg:py-32 bg-[#1D1D1B] border-t border-white/[0.06] overflow-hidden">
        {/* Gold glow bottom-center */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none"
          style={{ background: "radial-gradient(ellipse at center bottom, rgba(248,167,0,0.07) 0%, transparent 70%)" }} />

        <div className="relative z-10 max-w-7xl mx-auto px-6">

          {/* Section title */}
          <div className={`mb-16 ${isRTL ? "text-right" : ""}`}>
            <p className="text-[#F8A700] text-xs font-bold uppercase tracking-[0.25em] mb-4">
              {locale === "ar" ? "أي خدمة تناسبك" : "Votre profil"}
            </p>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight tracking-tight">
              {locale === "ar" ? "ابحث عن الحل المناسب لك" : "Trouvez votre solution"}
            </h2>
          </div>

          {/* 4 service cards */}
          <ServicesCards />
        </div>
      </section>

      {/* ── CTA Banner ─────────────────────────────────────────────────────── */}
      <section className="relative py-32 overflow-hidden bg-[#1D1D1B] border-t border-white/[0.06]">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at 50% 100%, rgba(248,167,0,0.08) 0%, transparent 70%)",
          }}
        />
        <div className={`relative z-10 max-w-4xl mx-auto px-6 text-center ${isRTL ? "font-cairo" : ""}`}>
          <p className="text-[#F8A700] text-xs font-bold uppercase tracking-[0.25em] mb-6">
            {t("badge")}
          </p>
          <h2 className="text-4xl md:text-6xl font-extrabold text-white leading-[1.05] mb-6 tracking-tight">
            {t("title")}
          </h2>
          <p className="text-gray-400 text-lg mb-12 max-w-2xl mx-auto leading-relaxed">
            {t("subtitle")}
          </p>
          <Link
            href="/contact"
            className="group inline-flex items-center gap-3 bg-[#F8A700] hover:bg-[#D48F00] text-[#1D1D1B] font-extrabold px-10 py-5 rounded-full text-base transition-all duration-200 hover:scale-105 shadow-glow-solar"
          >
            {t("learnMore")}
            <svg className={`w-5 h-5 transition-transform duration-300 group-hover:translate-x-2 ${isRTL ? "rotate-180 group-hover:-translate-x-2 group-hover:translate-x-0" : ""}`} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>

    </main>
  );
}
