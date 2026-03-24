"use client";

import { useEffect, useRef } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import gsap from "gsap";

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

  const containerRef = useRef<HTMLElement>(null);
  const raysRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 });
      tl.from(".hero-badge",  { y: 20, opacity: 0, duration: 0.6, ease: "power2.out" })
        .from(".hero-line",   { y: 60, opacity: 0, duration: 0.8, stagger: 0.15, ease: "power3.out" }, "-=0.3")
        .from(".hero-sub",    { y: 20, opacity: 0, duration: 0.7, ease: "power2.out" }, "-=0.4")
        .from(".hero-btns",   { y: 20, opacity: 0, duration: 0.6, ease: "power2.out" }, "-=0.3")
        .from(".hero-trust",  { y: 16, opacity: 0, duration: 0.5, stagger: 0.1, ease: "power2.out" }, "-=0.2")
        .from(".hero-stat",   { y: 16, opacity: 0, duration: 0.5, stagger: 0.1, ease: "power2.out" }, "-=0.3");
    }, containerRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const onScroll = () => {
      if (raysRef.current) {
        raysRef.current.style.transform = `rotate(${window.scrollY * 0.02}deg)`;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#1D1D1B]"
    >
      {/* ── Video background ── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Video */}
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/video.mp4" type="video/mp4" />
        </video>

        {/* Dark overlay to keep text readable */}
        <div className="absolute inset-0 bg-[#1D1D1B]/70" />

        {/* Solar accent glow */}
        <div
          className="absolute top-20 right-[15%] w-72 h-72 rounded-full pointer-events-none animate-sun-pulse"
          style={{
            background:
              "radial-gradient(circle, rgba(248,167,0,0.3) 0%, rgba(248,167,0,0.08) 45%, transparent 70%)",
          }}
        />

        {/* Sun rays overlay */}
        <div
          ref={raysRef}
          className="absolute top-20 right-[15%] w-72 h-72 transition-transform duration-100"
          style={{ transformOrigin: "center" }}
        >
          {Array.from({ length: 16 }).map((_, i) => (
            <div
              key={i}
              className="absolute top-1/2 left-1/2 origin-left"
              style={{
                width: "200px",
                height: "1px",
                background: "linear-gradient(to right, rgba(248,167,0,0.2), transparent)",
                transform: `rotate(${i * 22.5}deg) translateY(-50%)`,
              }}
            />
          ))}
        </div>

        {/* Bottom fade into next section */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#1D1D1B] to-transparent" />
      </div>

      {/* ── Content ── */}
      <div
        className={`relative z-10 max-w-4xl mx-auto px-6 text-center pt-20 ${isRTL ? "font-cairo" : ""}`}
      >
        {/* Badge */}
        <div className="hero-badge mb-8 inline-flex items-center gap-2 bg-[#F8A700]/15 border border-[#F8A700]/30 text-[#F8A700] font-semibold px-5 py-2 rounded-full text-sm tracking-wide">
          <span className="w-1.5 h-1.5 rounded-full bg-[#F8A700] animate-pulse" />
          {t("badge")}
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-[1.08] mb-6">
          <span className="hero-line block">{t("headline1")}</span>
          <span className="hero-line block gradient-text-solar animate-shimmer">
            {t("headline2")}
          </span>
        </h1>

        {/* Subtitle */}
        <p className="hero-sub text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          {t("subheadline")}
        </p>

        {/* Buttons */}
        <div
          className={`hero-btns flex flex-col sm:flex-row gap-4 justify-center mb-14 ${
            isRTL ? "sm:flex-row-reverse" : ""
          }`}
        >
          <Link
            href="/contact"
            className="bg-[#F8A700] hover:bg-[#D48F00] text-[#1D1D1B] font-extrabold px-8 py-4 rounded-full text-lg transition-all duration-200 shadow-glow-solar hover:scale-105"
          >
            {t("cta")}
          </Link>
          <Link
            href="/services"
            className="border-2 border-white/20 hover:border-[#F8A700] text-white hover:text-[#F8A700] font-bold px-8 py-4 rounded-full text-lg transition-all duration-200 hover:scale-105"
          >
            {t("ctaSecondary")}
          </Link>
        </div>

        {/* Trust badges */}
        <div
          className={`flex flex-wrap justify-center gap-4 mb-14 ${
            isRTL ? "flex-row-reverse" : ""
          }`}
        >
          {TRUST.map((key) => (
            <div
              key={key}
              className="hero-trust flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full text-sm text-gray-300"
            >
              <svg className="w-3.5 h-3.5 text-[#17A73D]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              {t(key)}
            </div>
          ))}
        </div>

        {/* Stats */}
        <div
          className={`flex flex-wrap justify-center gap-12 md:gap-20 ${
            isRTL ? "flex-row-reverse" : ""
          }`}
        >
          {STATS.map((s) => (
            <div key={s.key} className="hero-stat text-center">
              <div className="text-4xl font-extrabold text-[#F8A700]">{s.value}</div>
              <div className="text-gray-500 text-sm mt-1">{t(s.key)}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-[#F8A700] rounded-full animate-float" />
        </div>
      </div>
    </section>
  );
}
