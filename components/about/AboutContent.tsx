"use client";

import { useEffect, useRef } from "react";
import { useTranslations, useLocale } from "next-intl";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "@/i18n/navigation";
import WhyUsGrid from "@/components/ui/WhyUsGrid";

gsap.registerPlugin(ScrollTrigger);

// ─── Mission / Vision scroll-pinned component ──────────────────────────────────
function MissionVisionScroll({
  t, locale, isRTL,
}: {
  t: ReturnType<typeof useTranslations<"about">>;
  locale: string;
  isRTL: boolean;
}) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const missionRef = useRef<HTMLDivElement>(null);
  const visionRef  = useRef<HTMLDivElement>(null);
  const labelRef   = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const mission = missionRef.current;
    const vision  = visionRef.current;
    const label   = labelRef.current;
    if (!wrapper || !mission || !vision) return;

    // Initial state
    mission.style.opacity = "0";
    mission.style.transform = "translateY(40px)";
    vision.style.opacity = "0";
    vision.style.transform = "translateY(40px)";

    const onScroll = () => {
      const rect = wrapper.getBoundingClientRect();
      const totalScroll = wrapper.offsetHeight - window.innerHeight; // 200vh
      const scrolled = Math.max(0, -rect.top);
      const p = Math.min(1, scrolled / totalScroll);

      // Mission: fade-in 0→15%, hold 15→50%, fade-out 50→62%
      let mO = 0, mY = 40;
      if (p < 0.15) {
        mO = p / 0.15; mY = 40 * (1 - p / 0.15);
      } else if (p < 0.50) {
        mO = 1; mY = 0;
      } else if (p < 0.62) {
        const t2 = (p - 0.50) / 0.12;
        mO = 1 - t2; mY = -40 * t2;
      }

      // Vision: fade-in 62→78%, hold 78→100%
      let vO = 0, vY = 40;
      if (p >= 0.62 && p < 0.78) {
        const t2 = (p - 0.62) / 0.16;
        vO = t2; vY = 40 * (1 - t2);
      } else if (p >= 0.78) {
        vO = 1; vY = 0;
      }

      mission.style.opacity = String(Math.max(0, Math.min(1, mO)));
      mission.style.transform = `translateY(${mY}px)`;
      vision.style.opacity  = String(Math.max(0, Math.min(1, vO)));
      vision.style.transform  = `translateY(${vY}px)`;

      if (label) {
        if (p > 0.60) {
          label.textContent = locale === "ar" ? "رؤيتنا" : "Notre vision";
          label.style.color = "#17A73D";
        } else {
          label.textContent = locale === "ar" ? "مهمتنا" : "Notre mission";
          label.style.color = "#F8A700";
        }
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [locale]);

  return (
    <div ref={wrapperRef} style={{ height: "300vh" }}>
    <div className="sticky top-0 h-screen relative overflow-hidden bg-[#1D1D1B]">
      {/* Video background */}
      <video
        autoPlay muted loop playsInline suppressHydrationWarning
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/videos/mission_vision.mp4" type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-[#1D1D1B]/65" />
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(ellipse at 60% 50%, transparent 40%, rgba(29,29,27,0.8) 100%)" }}
      />

      {/* Floating label */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 z-20">
        <span
          ref={labelRef}
          className="text-xs font-bold uppercase tracking-[0.3em]"
          style={{ color: "#F8A700" }}
        >
          {locale === "ar" ? "مهمتنا" : "Notre mission"}
        </span>
      </div>

      {/* Scroll progress line */}
      <div className="absolute left-8 top-1/2 -translate-y-1/2 h-32 w-[1px] bg-white/10 z-20 hidden md:block">
        <div className="w-full bg-[#F8A700] h-1/2 origin-top" />
      </div>

      {/* MISSION text */}
      <div
        ref={missionRef}
        className={`absolute inset-0 flex flex-col justify-center px-10 md:px-24 opacity-0 ${isRTL ? "text-right items-end font-cairo" : ""}`}
        style={{ maxWidth: "720px", ...(isRTL ? { right: 0, left: "auto" } : {}) }}
      >
        <p className="text-[#F8A700] text-xs font-bold uppercase tracking-[0.3em] mb-6">
          {locale === "ar" ? "مهمتنا" : "Notre mission"}
        </p>
        <h2 className="text-5xl md:text-6xl font-extrabold text-white leading-[1.05] tracking-tight mb-8">
          {t("mission")}
        </h2>
        <p className="text-gray-300 text-xl leading-[1.8]">{t("missionDesc")}</p>
      </div>

      {/* VISION text — right side */}
      <div
        ref={visionRef}
        className={`absolute inset-0 flex flex-col justify-center px-10 md:px-24 opacity-0 ${isRTL ? "text-left items-start font-cairo" : "text-right items-end"}`}
        style={{ maxWidth: "720px", ...(isRTL ? { left: 0, right: "auto" } : { right: 0, left: "auto" }) }}
      >
        <p className="text-[#17A73D] text-xs font-bold uppercase tracking-[0.3em] mb-6">
          {locale === "ar" ? "رؤيتنا" : "Notre vision"}
        </p>
        <h2 className="text-5xl md:text-6xl font-extrabold text-white leading-[1.05] tracking-tight mb-8">
          {t("vision")}
        </h2>
        <p className="text-gray-300 text-xl leading-[1.8]">{t("visionDesc")}</p>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2">
        <div className="w-5 h-8 border border-white/20 rounded-full flex justify-center pt-1.5">
          <div className="w-0.5 h-2 bg-[#F8A700] rounded-full animate-float" />
        </div>
      </div>
    </div>
    </div>
  );
}

// ─── CTA Cinematic — image bg + Ken Burns ──────────────────────────────────────
function CtaCinematic({
  t, locale, isRTL,
}: {
  t: ReturnType<typeof useTranslations<"about">>;
  locale: string;
  isRTL: boolean;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const imgRef     = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const img     = imgRef.current;
    if (!section || !img) return;

    const restart = () => {
      // Remove and re-add the animation class to restart Ken Burns
      img.style.animation = "none";
      void img.offsetWidth; // force reflow
      img.style.animation = "";
    };

    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) restart(); },
      { threshold: 0.15 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden pt-24 pb-20" style={{ background: "#0d1a10" }}>

      {/* ── Background image — Ken Burns ── */}
      <img
        ref={imgRef}
        src="/images/GreenWagic-valeur.webp"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        style={{ animation: "kb-zoom 12s ease-in-out forwards", transformOrigin: "center center", opacity: 1 }}
      />

      {/* Dark green cinematic overlay */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, rgba(10,22,12,0.82) 0%, rgba(10,22,12,0.70) 50%, rgba(10,22,12,0.90) 100%)" }} />
      {/* Gold vignette left */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 0% 50%, rgba(248,167,0,0.08) 0%, transparent 50%)" }} />

      <style>{`
        @keyframes kb-zoom {
          from { transform: scale(1.08); }
          to   { transform: scale(1.00); }
        }
      `}</style>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10">

        {/* Overline */}
        <p className="ab-reveal text-[#F8A700] text-xs font-bold uppercase tracking-[0.35em] mb-10 text-center">
          {locale === "ar" ? "ابدأ مشروعك" : "Passez à l'action"}
        </p>

        {/* Editorial title */}
        <div className={`leading-[0.88] tracking-tight font-extrabold text-white select-none ${isRTL ? "text-right font-cairo" : ""}`}>
          {/* Line 1 */}
          <div className="ab-reveal flex justify-center mb-2">
            <span className="text-[11vw] md:text-[9vw] leading-none">
              {locale === "ar" ? "مستعد" : "Prêt à"}
            </span>
          </div>

          {/* Line 2 */}
          <div className="ab-reveal flex justify-center mb-2">
            <span className="text-[11vw] md:text-[9vw] leading-none">
              {locale === "ar" ? "للتحول إلى" : "passer à"}
            </span>
          </div>

          {/* Line 3 */}
          <div className="ab-reveal flex justify-center mb-2">
            <span className="text-[11vw] md:text-[9vw] leading-none">
              {locale === "ar" ? "الطاقة الشمسية ؟" : "l'énergie solaire ?"}
            </span>
          </div>
        </div>

        {/* Divider */}
        <div className="ab-reveal w-full h-px bg-white/[0.08] my-12" />

        {/* Bottom row */}
        <div className={`ab-reveal flex flex-col md:flex-row items-center justify-between gap-8 ${isRTL ? "md:flex-row-reverse text-right" : ""}`}>
          <p className="text-gray-400 text-base leading-[1.8] max-w-lg">{t("ctaDesc")}</p>
          <Link
            href="/contact"
            className="group flex-shrink-0 inline-flex items-center gap-3 bg-[#F8A700] hover:bg-[#D48F00] text-[#1D1D1B] font-extrabold px-10 py-5 rounded-full text-base transition-all duration-300 hover:scale-105 whitespace-nowrap"
            style={{ boxShadow:"0 0 40px rgba(248,167,0,0.25)" }}
          >
            {t("ctaBtn")}
            <svg
              className={`w-5 h-5 transition-transform duration-300 group-hover:translate-x-2 ${isRTL ? "rotate-180 group-hover:-translate-x-2" : ""}`}
              fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"
            >
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

const VALUES = [
  {
    key: "v1",
    color: "#F8A700",
    bg: "rgba(248,167,0,0.08)",
    border: "rgba(248,167,0,0.2)",
    icon: (
      <svg width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
  },
  {
    key: "v2",
    color: "#17A73D",
    bg: "rgba(23,167,61,0.08)",
    border: "rgba(23,167,61,0.2)",
    icon: (
      <svg width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="4"/>
        <line x1="12" y1="2" x2="12" y2="4"/><line x1="12" y1="20" x2="12" y2="22"/>
        <line x1="2" y1="12" x2="4" y2="12"/><line x1="20" y1="12" x2="22" y2="12"/>
        <line x1="4.93" y1="4.93" x2="6.34" y2="6.34"/><line x1="17.66" y1="17.66" x2="19.07" y2="19.07"/>
      </svg>
    ),
  },
  {
    key: "v3",
    color: "#8899FF",
    bg: "rgba(136,153,255,0.08)",
    border: "rgba(136,153,255,0.2)",
    icon: (
      <svg width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
  },
];

export default function AboutContent() {
  const t = useTranslations("about");
  const locale = useLocale();
  const isRTL = locale === "ar";
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero
      gsap.from(".ab-hero-line", {
        y: 60, opacity: 0, duration: 0.9, stagger: 0.12, ease: "power3.out", delay: 0.2,
      });
      // Scroll reveals
      gsap.utils.toArray<HTMLElement>(".ab-reveal").forEach((el) => {
        gsap.fromTo(el,
          { y: 45, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 82%" } }
        );
      });
    }, mainRef);
    return () => ctx.revert();
  }, [locale]);

  return (
    <main ref={mainRef} className={isRTL ? "font-cairo" : ""}>

      {/* ── 1. HERO — titre + mini stats ──────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col justify-end pb-16 overflow-hidden bg-[#1D1D1B]">
        <img
          src="/images/energie_solaire_contact.png"
          alt=""
          className="absolute inset-0 w-full h-full object-cover scale-[1.25] origin-center"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1D1D1B]/20 via-transparent to-[#1D1D1B]" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-36 w-full">
          <p className="ab-hero-line text-[#F8A700] text-xs font-bold uppercase tracking-[0.3em] mb-8">
            {t("badge")}
          </p>
          <h1 className={`ab-hero-line text-6xl md:text-8xl font-extrabold text-white leading-[0.95] tracking-tight mb-16 max-w-5xl ${isRTL ? "text-right" : ""}`}>
            {t("title")}
          </h1>

          {/* Stats cards */}
          <div className={`ab-hero-line grid grid-cols-2 md:grid-cols-4 border-t border-white/10 ${isRTL ? "font-cairo" : ""}`}>
            {[
              {
                value: "+500",
                label: locale === "ar" ? "مشروع منجز" : "Projets réalisés",
                icon: <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
              },
              {
                value: "98%",
                label: locale === "ar" ? "رضا العملاء" : "Clients satisfaits",
                icon: <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>,
              },
              {
                value: "–70%",
                label: locale === "ar" ? "توفير في الفاتورة" : "Sur la facture",
                icon: <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>,
              },
              {
                value: "25 ans",
                label: locale === "ar" ? "ضمان" : "Garantie",
                icon: <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
              },
            ].map((s, i) => (
              <div
                key={i}
                className={`flex flex-col items-center gap-3 py-8 px-6 bg-[#1D1D1B]/60 backdrop-blur-sm border-r border-white/[0.08] last:border-r-0 ${i >= 2 ? "border-t md:border-t-0 border-white/[0.08]" : ""}`}
              >
                <div className="w-10 h-10 rounded-full bg-[#F8A700]/15 border border-[#F8A700]/30 flex items-center justify-center text-[#F8A700]">
                  {s.icon}
                </div>
                <span className="text-3xl font-extrabold text-[#F8A700] leading-none">{s.value}</span>
                <span className="text-gray-400 text-[10px] uppercase tracking-[0.2em] text-center">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 2. STORY — citation éditoriale ────────────────────────────────── */}
      <section className="py-28 bg-[#141412] relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.025]"
          style={{
            backgroundImage: "linear-gradient(#F8A700 1px, transparent 1px), linear-gradient(90deg, #F8A700 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
        <div className="relative z-10 max-w-5xl mx-auto px-6">
          <p className="ab-reveal text-[#F8A700] text-xs font-bold uppercase tracking-[0.3em] mb-10 text-center">
            {locale === "ar" ? "قصتنا" : "Notre histoire"}
          </p>

          {/* Big quote */}
          <blockquote className={`ab-reveal text-3xl md:text-4xl font-extrabold text-white leading-[1.25] text-center mb-16 ${isRTL ? "font-cairo" : ""}`}>
            &ldquo;{t("description")}&rdquo;
          </blockquote>

          <div className="ab-reveal w-16 h-[2px] bg-[#F8A700] mx-auto mb-16" />

          {/* Two-column text */}
          <div className={`ab-reveal grid md:grid-cols-2 gap-10 ${isRTL ? "text-right" : ""}`}>
            <p className="text-gray-300 text-base leading-[1.9]">{t("description2")}</p>
            <p className="text-gray-400 text-base leading-[1.9]">{t("description3")}</p>
          </div>
        </div>
      </section>

      {/* ── 3. MISSION & VISION — scroll pinned ───────────────────────────── */}
      <MissionVisionScroll t={t} locale={locale} isRTL={isRTL} />

      {/* ── 4. VALUES ──────────────────────────────────────────────────────── */}
      <section className="relative py-28 bg-[#0F0F0D] overflow-hidden">
        {/* Subtle dot grid */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{ backgroundImage: "radial-gradient(circle, #F8A700 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className={`ab-reveal flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-20 ${isRTL ? "text-right md:flex-row-reverse" : ""}`}>
            <div>
              <p className="text-[#F8A700] text-xs font-bold uppercase tracking-[0.3em] mb-4">
                {locale === "ar" ? "ما يميزنا" : "Ce qui nous définit"}
              </p>
              <h2 className="text-5xl md:text-6xl font-extrabold text-white leading-[0.95] tracking-tight">
                {locale === "ar" ? "قيمنا الثلاث" : "Nos trois\nvaleurs"}
              </h2>
            </div>
            <div className="w-16 h-[2px] bg-[#F8A700]/30 md:mb-2 hidden md:block" />
          </div>

          {/* Cards */}
          <div className="grid md:grid-cols-3 gap-0 border border-white/[0.07] rounded-2xl overflow-hidden">
            {VALUES.map((v, idx) => (
              <div
                key={v.key}
                className={`ab-reveal group relative flex flex-col p-10 md:p-12 transition-all duration-400 hover:bg-white/[0.03] ${isRTL ? "text-right items-end" : ""} ${idx < VALUES.length - 1 ? "border-b md:border-b-0 md:border-r border-white/[0.07]" : ""}`}
              >
                {/* Ghost number */}
                <span
                  className={`absolute top-4 font-extrabold text-[7rem] leading-none select-none pointer-events-none opacity-[0.04] group-hover:opacity-[0.07] transition-opacity duration-400 ${isRTL ? "right-6" : "left-6"}`}
                  style={{ color: v.color }}
                >
                  {String(idx + 1).padStart(2, "0")}
                </span>

                {/* Top colored bar */}
                <div className="w-10 h-[3px] mb-8 rounded-full transition-all duration-300 group-hover:w-16" style={{ backgroundColor: v.color }} />

                {/* Icon */}
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mb-8 transition-transform duration-300 group-hover:scale-105"
                  style={{ backgroundColor: `${v.color}12`, color: v.color, border: `1px solid ${v.color}25` }}
                >
                  {v.icon}
                </div>

                {/* Content */}
                <h3 className="font-extrabold text-2xl text-white mb-4 leading-tight">
                  {t(`${v.key}.title`)}
                </h3>
                <p className="text-gray-400 leading-[1.8] text-sm flex-1">{t(`${v.key}.desc`)}</p>

                {/* Bottom accent */}
                <div className="mt-8 flex items-center gap-3" style={{ color: v.color }}>
                  <span className="text-xs font-bold uppercase tracking-[0.2em] opacity-60">
                    {String(idx + 1).padStart(2, "0")} / {String(VALUES.length).padStart(2, "0")}
                  </span>
                  <div className="flex-1 h-px" style={{ backgroundColor: `${v.color}20` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. POURQUOI NOUS CHOISIR ───────────────────────────────────────── */}
      <section className="relative py-28 overflow-hidden" style={{ background: "linear-gradient(135deg, #1a1a17 0%, #1f1e1a 40%, #1a1914 100%)" }}>
        {/* Gold glow top-left */}
        <div className="absolute -top-20 -left-20 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(248,167,0,0.10) 0%, transparent 70%)" }} />
        {/* Green glow bottom-right */}
        <div className="absolute -bottom-20 -right-20 w-[400px] h-[400px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(23,167,61,0.07) 0%, transparent 70%)" }} />
        {/* Subtle grid lines */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{ backgroundImage: "linear-gradient(#F8A700 1px, transparent 1px), linear-gradient(90deg, #F8A700 1px, transparent 1px)", backgroundSize: "80px 80px" }} />
        {/* Top separator */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#F8A700]/40 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className={`ab-reveal mb-20 ${isRTL ? "text-right" : ""}`}>
            <p className="text-[#F8A700] text-xs font-bold uppercase tracking-[0.3em] mb-4">
              {locale === "ar" ? "مميزاتنا" : "Nos avantages"}
            </p>
            <h2 className="text-5xl md:text-6xl font-extrabold text-white leading-[0.95] tracking-tight max-w-2xl">
              {locale === "ar" ? "لماذا تختارنا؟" : "Pourquoi nous choisir ?"}
            </h2>
          </div>

          {/* Grid 2x2 — shared component */}
          <WhyUsGrid animClass="ab-reveal" />
        </div>
      </section>

      {/* ── 7. CTA — Editorial + canvas fluide ──────────────────────────────── */}
      <CtaCinematic t={t} locale={locale} isRTL={isRTL} />

    </main>
  );
}
