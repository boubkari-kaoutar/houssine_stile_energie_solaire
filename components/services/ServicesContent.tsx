"use client";

import { useEffect, useRef } from "react";
import { useTranslations, useLocale } from "next-intl";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "@/i18n/navigation";

gsap.registerPlugin(ScrollTrigger);

// ─── Service config ────────────────────────────────────────────────────────────
const SERVICE_CONFIG = [
  {
    key: "solar",
    num: "01",
    video: "/videos/Solar_panel_installation.mp4",
    iconColor: "#F8A700",
    borderColor: "rgba(248,167,0,0.35)",
    glow: "rgba(248,167,0,0.15)",
  },
  {
    key: "audit",
    num: "02",
    video: "/videos/Energy_audit_analysis.mp4",
    iconColor: "#17A73D",
    borderColor: "rgba(23,167,61,0.35)",
    glow: "rgba(23,167,61,0.12)",
  },
  {
    key: "maintenance",
    num: "03",
    video: "/videos/Solar_panel_maintenance.mp4",
    iconColor: "#8899FF",
    borderColor: "rgba(136,153,255,0.35)",
    glow: "rgba(136,153,255,0.12)",
  },
  {
    key: "conseil",
    num: "04",
    video: "/videos/Eco-friendly_home_consulting.mp4",
    iconColor: "#F86400",
    borderColor: "rgba(248,100,0,0.35)",
    glow: "rgba(248,100,0,0.12)",
  },
] as const;

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

      // Each service section
      document.querySelectorAll<HTMLElement>(".service-block").forEach((block) => {
        const text  = block.querySelector(".svc-text");
        const visual = block.querySelector(".svc-visual");
        const ghost = block.querySelector(".svc-ghost");
        const rows  = block.querySelectorAll(".svc-feature-row");
        const isReversed = block.dataset.reversed === "true";

        if (text) gsap.fromTo(text,
          { x: isReversed ? 50 : -50, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.9, ease: "power3.out",
            scrollTrigger: { trigger: block, start: "top 75%" } }
        );
        if (visual) gsap.fromTo(visual,
          { x: isReversed ? -50 : 50, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.9, ease: "power3.out",
            scrollTrigger: { trigger: block, start: "top 75%" } }
        );
        if (ghost) gsap.fromTo(ghost,
          { opacity: 0 },
          { opacity: 0.04, duration: 1.6, ease: "none",
            scrollTrigger: { trigger: block, start: "top 80%" } }
        );
        rows.forEach((row, i) => gsap.fromTo(row,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.55, delay: i * 0.07, ease: "power2.out",
            scrollTrigger: { trigger: block, start: "top 70%" } }
        ));
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
      <div className="bg-[#1D1D1B]">
        {SERVICE_CONFIG.map((cfg, i) => {
          const isReversed = i % 2 !== 0;
          const features = t.raw(`${cfg.key}.features`) as string[];

          return (
            <section
              key={cfg.key}
              id={`service-${cfg.key}`}
              data-reversed={isReversed ? "true" : "false"}
              className="service-block relative border-t border-white/[0.06] overflow-hidden"
            >
              {/* Ghost number */}
              <span className={`svc-ghost absolute top-0 font-extrabold text-[20vw] text-white pointer-events-none opacity-0 leading-none select-none z-0 ${isRTL ? "right-6" : "left-6"}`}>
                {cfg.num}
              </span>

              <div className={`relative z-10 flex flex-col ${isReversed ? "lg:flex-row-reverse" : "lg:flex-row"} min-h-[600px]`}>

                {/* ── Text side ──────────────────────────────────────────── */}
                <div className={`svc-text flex-1 flex flex-col justify-center px-8 lg:px-16 py-20 lg:py-28 ${isRTL ? "text-right items-end" : ""}`}>
                  <div className="max-w-[540px]">

                    {/* Service number + tagline */}
                    <div className={`flex items-center gap-4 mb-6 ${isRTL ? "flex-row-reverse" : ""}`}>
                      <span className="text-[#F8A700] text-xs font-bold uppercase tracking-[0.25em]">
                        {t("badge")} {cfg.num}
                      </span>
                      <span className="h-px flex-1 bg-[#F8A700]/20 max-w-[60px]" />
                    </div>

                    {/* Tagline */}
                    <p className="text-white/40 text-sm uppercase tracking-widest mb-3">
                      {t(`${cfg.key}.tagline`)}
                    </p>

                    {/* Title */}
                    <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-[1.05] mb-6 tracking-tight">
                      {t(`${cfg.key}.title`)}
                    </h2>

                    {/* Description */}
                    <p className="text-gray-400 text-base leading-[1.85] mb-10">
                      {t(`${cfg.key}.desc`)}
                    </p>

                    {/* Feature rows */}
                    <div className="flex flex-col mb-10">
                      {features.map((f, fi) => (
                        <div
                          key={fi}
                          className={`svc-feature-row flex items-center gap-4 py-4 border-t border-white/[0.07] ${isRTL ? "flex-row-reverse" : ""}`}
                        >
                          <span
                            className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                            style={{ backgroundColor: `${cfg.iconColor}18`, color: cfg.iconColor }}
                          >
                            <svg width="12" height="12" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </span>
                          <span className="text-white/80 font-medium text-sm">{f}</span>
                        </div>
                      ))}
                      {/* Last border */}
                      <div className="border-t border-white/[0.07]" />
                    </div>

                    {/* CTA */}
                    <Link
                      href="/contact"
                      className={`inline-flex items-center gap-2 font-bold text-sm uppercase tracking-widest transition-all duration-200 hover:gap-4`}
                      style={{ color: cfg.iconColor }}
                    >
                      {t("learnMore")}
                      <svg className={`w-4 h-4 ${isRTL ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>

                {/* ── Visual side — video with frame ─────────────────────── */}
                <div className="svc-visual relative flex-none w-full lg:w-[45%] flex items-center justify-center py-12 px-8 lg:px-12 bg-[#1D1D1B]">

                  {/* Ambient glow behind frame */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: `radial-gradient(ellipse at center, ${cfg.glow} 0%, transparent 70%)`,
                    }}
                  />

                  {/* Frame wrapper */}
                  <div
                    className="relative w-full max-w-[480px] rounded-2xl overflow-hidden"
                    style={{
                      border: `1.5px solid ${cfg.borderColor}`,
                      boxShadow: `0 0 40px ${cfg.glow}, 0 24px 60px rgba(0,0,0,0.5)`,
                    }}
                  >
                    {/* Corner accents */}
                    {[
                      "top-0 left-0 border-t-2 border-l-2 rounded-tl-2xl",
                      "top-0 right-0 border-t-2 border-r-2 rounded-tr-2xl",
                      "bottom-0 left-0 border-b-2 border-l-2 rounded-bl-2xl",
                      "bottom-0 right-0 border-b-2 border-r-2 rounded-br-2xl",
                    ].map((cls, ci) => (
                      <div
                        key={ci}
                        className={`absolute w-5 h-5 z-20 pointer-events-none ${cls}`}
                        style={{ borderColor: cfg.iconColor }}
                      />
                    ))}

                    {/* Service number badge */}
                    <div
                      className="absolute top-3 left-3 z-20 px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-widest"
                      style={{ backgroundColor: `${cfg.iconColor}20`, color: cfg.iconColor, border: `1px solid ${cfg.borderColor}` }}
                    >
                      {cfg.num}
                    </div>

                    {/* Video */}
                    <video
                      autoPlay
                      muted
                      loop
                      playsInline
                      suppressHydrationWarning
                      className="w-full aspect-video object-cover block scale-[1.18] origin-top"
                    >
                      <source src={cfg.video} type="video/mp4" />
                    </video>

                    {/* Bottom gradient overlay */}
                    <div
                      className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
                      style={{ background: `linear-gradient(to top, ${cfg.glow.replace('0.12', '0.4')}, transparent)` }}
                    />
                  </div>
                </div>

              </div>
            </section>
          );
        })}
      </div>

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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                cfg: SERVICE_CONFIG[0],
                profile: locale === "ar" ? "أفراد / شركات" : "Particulier · Entreprise",
                saving: "–70%",
                savingLabel: locale === "ar" ? "توفير في الفاتورة" : "sur la facture",
                delay: locale === "ar" ? "3–7 أيام" : "3–7 jours",
                warranty: locale === "ar" ? "ضمان 25 سنة" : "Garantie 25 ans",
                roi: locale === "ar" ? "عائد خلال 4–6 سنوات" : "ROI en 4–6 ans",
              },
              {
                cfg: SERVICE_CONFIG[1],
                profile: locale === "ar" ? "كل عميل جديد" : "Tout nouveau client",
                saving: "100%",
                savingLabel: locale === "ar" ? "تشخيص مجاني" : "diagnostic offert",
                delay: locale === "ar" ? "1–2 أيام" : "1–2 jours",
                warranty: locale === "ar" ? "تقرير مفصل" : "Rapport détaillé",
                roi: locale === "ar" ? "فوري" : "Immédiat",
              },
              {
                cfg: SERVICE_CONFIG[2],
                profile: locale === "ar" ? "كل عملاء صنست" : "Clients Sunset Energy",
                saving: "+5%",
                savingLabel: locale === "ar" ? "أداء إضافي" : "de performance",
                delay: locale === "ar" ? "24 ساعة" : "Sous 24h",
                warranty: locale === "ar" ? "مراقبة مستمرة" : "Monitoring continu",
                roi: locale === "ar" ? "مستمر" : "Continu",
              },
              {
                cfg: SERVICE_CONFIG[3],
                profile: locale === "ar" ? "أفراد / فنادق" : "Particulier · Hôtel",
                saving: "–30%",
                savingLabel: locale === "ar" ? "تحسين طاقي" : "efficacité habitat",
                delay: locale === "ar" ? "2–5 أيام" : "2–5 jours",
                warranty: locale === "ar" ? "5 سنوات" : "5 ans équipements",
                roi: locale === "ar" ? "3–4 سنوات" : "ROI en 3–4 ans",
              },
            ].map(({ cfg, profile, saving, savingLabel, delay, warranty, roi }) => (
              <div
                key={cfg.key}
                className="group relative flex flex-col rounded-2xl border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.05] transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                style={{ boxShadow: `0 0 0 0 ${cfg.glow}` }}
                onMouseEnter={e => (e.currentTarget.style.boxShadow = `0 0 30px ${cfg.glow}`)}
                onMouseLeave={e => (e.currentTarget.style.boxShadow = "none")}
              >
                {/* Top accent line */}
                <div className="h-[3px] w-full" style={{ backgroundColor: cfg.iconColor }} />

                <div className="flex flex-col flex-1 p-6 gap-5">
                  {/* Number + title */}
                  <div>
                    <span className="text-xs font-bold uppercase tracking-widest" style={{ color: cfg.iconColor }}>
                      {cfg.num}
                    </span>
                    <h3 className="text-white font-extrabold text-lg leading-tight mt-1">
                      {t(`${cfg.key}.title`)}
                    </h3>
                    <p className="text-gray-500 text-xs mt-1">{profile}</p>
                  </div>

                  {/* Big metric */}
                  <div
                    className="rounded-xl px-4 py-4 text-center"
                    style={{ backgroundColor: `${cfg.iconColor}10`, border: `1px solid ${cfg.borderColor}` }}
                  >
                    <div className="text-4xl font-extrabold leading-none" style={{ color: cfg.iconColor }}>
                      {saving}
                    </div>
                    <div className="text-xs text-gray-400 mt-1">{savingLabel}</div>
                  </div>

                  {/* Key specs */}
                  <ul className="flex flex-col gap-3 flex-1">
                    {[
                      { icon: "⏱", label: delay },
                      { icon: "🛡", label: warranty },
                      { icon: "📈", label: roi },
                    ].map((item, ii) => (
                      <li key={ii} className={`flex items-center gap-3 text-sm text-gray-300 ${isRTL ? "flex-row-reverse" : ""}`}>
                        <span
                          className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-xs"
                          style={{ backgroundColor: `${cfg.iconColor}15`, color: cfg.iconColor }}
                        >
                          {ii === 0 && (
                            <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                          )}
                          {ii === 1 && (
                            <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                          )}
                          {ii === 2 && (
                            <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
                          )}
                        </span>
                        {item.label}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <Link
                    href="/contact"
                    className="mt-2 w-full text-center py-3 rounded-xl text-sm font-bold uppercase tracking-wider transition-all duration-200 border"
                    style={{
                      color: cfg.iconColor,
                      borderColor: cfg.borderColor,
                      backgroundColor: `${cfg.iconColor}08`,
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLElement).style.backgroundColor = cfg.iconColor;
                      (e.currentTarget as HTMLElement).style.color = "#1D1D1B";
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLElement).style.backgroundColor = `${cfg.iconColor}08`;
                      (e.currentTarget as HTMLElement).style.color = cfg.iconColor;
                    }}
                  >
                    {locale === "ar" ? "اطلب عرضاً" : "Demander un devis"}
                  </Link>
                </div>
              </div>
            ))}
          </div>
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
