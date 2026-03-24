"use client";

import { useEffect, useRef } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import gsap from "gsap";
import { useFrameSequence } from "@/hooks/useFrameSequence";

const STATS = [
  { value: "+500", key: "stat1" },
  { value: "98%",  key: "stat2" },
  { value: "10+",  key: "stat3" },
];

const TRUST = ["trust1", "trust2", "trust3", "trust4"] as const;

export default function Hero() {
  const t = useTranslations("hero");
  const locale = useLocale();
  const isRTL = locale === "ar";

  const contentRef = useRef<HTMLDivElement>(null);
  const raysRef    = useRef<HTMLDivElement>(null);
  const slide1Ref  = useRef<HTMLDivElement>(null);
  const slide2Ref  = useRef<HTMLDivElement>(null);

  const { loadProgress, isReady, sectionRef, canvasRef } = useFrameSequence();

  // ── GSAP entrance animation ────────────────────────────────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 });
      tl.from(".hero-line",   { y: 60, opacity: 0, duration: 0.8, stagger: 0.15, ease: "power3.out" })
        .from(".hero-sub",    { y: 20, opacity: 0, duration: 0.7, ease: "power2.out" }, "-=0.4")
        .from(".hero-btns",   { y: 20, opacity: 0, duration: 0.6, ease: "power2.out" }, "-=0.3")
        .from(".hero-trust",  { y: 16, opacity: 0, duration: 0.5, stagger: 0.1, ease: "power2.out" }, "-=0.2")
        .from(".hero-stat",   { y: 16, opacity: 0, duration: 0.5, stagger: 0.1, ease: "power2.out" }, "-=0.3");
    }, contentRef);
    return () => ctx.revert();
  }, []);

  // ── Parallax sun rays + scroll slide swap ──────────────────────────────────
  useEffect(() => {
    const onScroll = () => {
      if (raysRef.current) {
        raysRef.current.style.transform = `rotate(${window.scrollY * 0.02}deg)`;
      }
      const section = sectionRef.current as HTMLElement | null;
      const s1 = slide1Ref.current;
      const s2 = slide2Ref.current;
      if (!section || !s1 || !s2) return;

      const rect = section.getBoundingClientRect();
      const totalScroll = section.offsetHeight - window.innerHeight;
      const scrolled = -rect.top;
      const p = Math.max(0, Math.min(1, scrolled / totalScroll));

      // Slide 1: visible 0→40%, fade out 40→55%
      const op1 = p < 0.40 ? 1 : p < 0.55 ? 1 - (p - 0.40) / 0.15 : 0;
      // Slide 2: fade in 45→60%, visible 60→100%
      const op2 = p < 0.45 ? 0 : p < 0.60 ? (p - 0.45) / 0.15 : 1;

      s1.style.opacity = String(op1);
      s1.style.transform = `translateY(${p < 0.40 ? 0 : -(p - 0.40) * 60}px)`;
      s2.style.opacity = String(op2);
      s2.style.transform = `translateY(${p < 0.60 ? (1 - (p - 0.45) / 0.15) * 40 : 0}px)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative bg-[#1D1D1B]"
      style={{ height: "300vh" }}
    >
      {/* ── Loading screen ──────────────────────────────────────────────────── */}
      {!isReady && (
        <div
          className="fixed inset-0 z-[60] bg-[#1D1D1B] flex flex-col items-center justify-center gap-6"
          aria-live="polite"
        >
          <div className="relative" style={{ animation: "sunPulse 2s ease-in-out infinite" }}>
            <Image src="/logo.png" alt="Sunset Energy" width={140} height={56} className="object-contain" priority />
          </div>

          {/* Tagline */}
          <p className="text-white/30 text-xs uppercase tracking-[0.3em] font-medium">
            Énergie solaire · Maroc
          </p>

          <div className="w-56 flex flex-col items-center gap-2">
            <div className="w-full h-[2px] bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#F8A700] rounded-full transition-all duration-200 ease-out"
                style={{ width: `${loadProgress}%` }}
              />
            </div>
            <span className="text-white/40 text-xs font-medium tabular-nums">
              {loadProgress}%
            </span>
          </div>
        </div>
      )}

      {/* ── Sticky viewport wrapper ─────────────────────────────────────────── */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">

        {/* Canvas — cinematic frame sequence background */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full block"
          style={{
            opacity: isReady ? 1 : 0,
            transition: "opacity 0.6s ease",
          }}
        />

        {/* Dark overlay to keep text readable */}
        <div className="absolute inset-0 bg-[#1D1D1B]/60 pointer-events-none" />

        {/* Vignette for cinematic depth */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 50%, rgba(29,29,27,0.55) 100%)",
          }}
        />

        {/* Solar accent glow */}
        <div
          className="absolute top-20 right-[15%] w-72 h-72 rounded-full pointer-events-none animate-sun-pulse"
          style={{
            background:
              "radial-gradient(circle, rgba(248,167,0,0.25) 0%, rgba(248,167,0,0.06) 45%, transparent 70%)",
          }}
        />

        {/* Sun rays */}
        <div
          ref={raysRef}
          className="absolute top-20 right-[15%] w-72 h-72 pointer-events-none transition-transform duration-100"
          style={{ transformOrigin: "center" }}
        >
          {Array.from({ length: 16 }).map((_, i) => (
            <div
              key={i}
              className="absolute top-1/2 left-1/2 origin-left"
              style={{
                width: "200px",
                height: "1px",
                background: "linear-gradient(to right, rgba(248,167,0,0.18), transparent)",
                transform: `rotate(${i * 22.5}deg) translateY(-50%)`,
              }}
            />
          ))}
        </div>

        {/* Bottom fade into next section */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#1D1D1B] to-transparent pointer-events-none" />

        {/* ── Hero content wrapper ───────────────────────────────────────────── */}
        <div
          ref={contentRef}
          className={`relative z-10 h-full pt-20 ${isRTL ? "font-cairo" : ""}`}
        >

          {/* ── Slide 1 : headline + subtitle + buttons + trust ── */}
          <div
            ref={slide1Ref}
            className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center pt-20"
            style={{ transition: "opacity 0.1s, transform 0.1s" }}
          >
            <div className="hero-line inline-flex items-center gap-2 bg-white/[0.07] border border-white/10 px-4 py-1.5 rounded-full mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F8A700] animate-pulse" />
              <span className="text-white/60 text-xs uppercase tracking-[0.25em] font-semibold">{t("badge")}</span>
            </div>

            <h1 className="max-w-4xl mx-auto font-extrabold leading-[1.05] mb-6"
              style={{ fontSize: "clamp(2rem, 5vw, 3.8rem)" }}>
              <span className="hero-line block text-white">{t("headline1")}</span>
              <span className="hero-line block gradient-text-solar animate-shimmer">{t("headline2")}</span>
            </h1>

            <p className="hero-sub text-base md:text-lg text-gray-400 max-w-xl mx-auto mb-10 leading-[1.8]">
              {t("subheadline")}
            </p>

            <div className={`hero-btns flex flex-col sm:flex-row items-center gap-3 justify-center mb-10 ${isRTL ? "sm:flex-row-reverse" : ""}`}>
              <Link href="/contact"
                className="group relative overflow-hidden bg-[#F8A700] text-[#1D1D1B] font-extrabold px-9 py-4 rounded-full text-base transition-all duration-200 hover:scale-105 shadow-[0_0_30px_rgba(248,167,0,0.35)]">
                <span className="absolute inset-0 w-0 group-hover:w-full transition-all duration-500 ease-in-out bg-[#17A73D] rounded-full z-0" />
                <span className="relative z-10">{t("cta")}</span>
              </Link>
              <Link href="/services"
                className="group flex items-center gap-2 border border-white/20 hover:border-[#F8A700]/60 text-white/80 hover:text-white font-semibold px-9 py-4 rounded-full text-base transition-all duration-200 hover:scale-105 hover:bg-white/[0.04]">
                {t("ctaSecondary")}
                <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            <div className={`flex flex-wrap justify-center gap-3 ${isRTL ? "flex-row-reverse" : ""}`}>
              {TRUST.map((key) => (
                <div key={key} className="hero-trust flex items-center gap-1.5 bg-white/[0.05] border border-white/[0.08] px-3.5 py-1.5 rounded-full text-xs text-gray-400">
                  <svg className="w-3 h-3 text-[#17A73D] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {t(key)}
                </div>
              ))}
            </div>
          </div>

          {/* ── Slide 2 : stats ── */}
          <div
            ref={slide2Ref}
            className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center pt-20"
            style={{ opacity: 0, transform: "translateY(40px)", transition: "opacity 0.1s, transform 0.1s" }}
          >
            <p className="text-[#F8A700] text-xs font-bold uppercase tracking-[0.3em] mb-6">
              {locale === "ar" ? "أرقامنا تتحدث" : "Nos chiffres parlent"}
            </p>
            <h2 className="font-extrabold text-white leading-[1.05] mb-4"
              style={{ fontSize: "clamp(2.2rem, 6vw, 4.5rem)" }}>
              {locale === "ar" ? "ثقة أكثر من 500 عميل" : "Plus de 500 clients"}
              <br />
              <span style={{ color: "#F8A700" }}>
                {locale === "ar" ? "في كل المغرب." : "nous font confiance."}
              </span>
            </h2>
            <p className="text-gray-400 text-base max-w-md mx-auto mb-14 leading-[1.8]">
              {locale === "ar"
                ? "خفّض فاتورتك بنسبة تصل إلى 70% مع ضمان أداء 25 سنة."
                : "Réduisez votre facture jusqu'à 70% avec une garantie performance 25 ans."}
            </p>
            <div className={`flex flex-wrap justify-center gap-14 md:gap-20 ${isRTL ? "flex-row-reverse" : ""}`}>
              {STATS.map((s) => (
                <div key={s.key} className="hero-stat text-center">
                  <div className="text-4xl md:text-5xl font-extrabold text-[#F8A700]">{s.value}</div>
                  <div className="text-gray-400 text-xs mt-2 uppercase tracking-widest">{t(s.key)}</div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
