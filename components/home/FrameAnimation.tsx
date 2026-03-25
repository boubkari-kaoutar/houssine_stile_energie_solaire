"use client";

import { useLocale, useTranslations } from "next-intl";
import { useFrameSequence } from "@/hooks/useFrameSequence";
import Image from "next/image";

// ─── Overlay text that fades in as the user scrolls ───────────────────────────
const OVERLAY_STEPS = [
  { threshold: 0.0, key: "step1" },
  { threshold: 0.35, key: "step2" },
  { threshold: 0.65, key: "step3" },
] as const;

// ─────────────────────────────────────────────────────────────────────────────
export default function FrameAnimation() {
  const { loadProgress, isReady, sectionRef, canvasRef } = useFrameSequence();
  const locale  = useLocale();
  const isRTL   = locale === "ar";
  const t       = useTranslations("frameAnimation");

  return (
    <section
      ref={sectionRef}
      aria-label="Cinematic solar animation"
      // 300vh gives enough scroll room for 192 frames to breathe
      className="relative"
      style={{ height: "300vh" }}
    >
      {/* ── Loading screen ───────────────────────────────────────────────── */}
      {!isReady && (
        <div
          className="fixed inset-0 z-[60] bg-[#1D1D1B] flex flex-col items-center justify-center gap-6"
          aria-live="polite"
        >
          {/* Logo */}
          <div className="relative" style={{ animation: "sunPulse 2s ease-in-out infinite" }}>
            <Image src="/images/LOGO-PNG.png" alt="Sunset Energy" width={140} height={56} className="object-contain" priority />
          </div>

          {/* Tagline */}
          <p className="text-white/30 text-xs uppercase tracking-[0.3em] font-medium">
            Énergie solaire · Maroc
          </p>

          {/* Progress bar */}
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

      {/* ── Sticky viewport wrapper ───────────────────────────────────────── */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">

        {/* Canvas — fills the full viewport */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full block"
          style={{
            opacity: isReady ? 1 : 0,
            transition: "opacity 0.6s ease",
          }}
        />

        {/* Gradient vignette for cinematic depth */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 50%, rgba(29,29,27,0.55) 100%)",
          }}
        />

        {/* Bottom fade into next section */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent pointer-events-none" />

        {/* ── Overlay text (optional — remove if you want pure visual) ─── */}
        {isReady && (
          <div
            className={`absolute inset-0 flex items-end justify-center pb-16 pointer-events-none ${
              isRTL ? "font-cairo" : ""
            }`}
          >
            <p className="text-white/70 text-sm font-medium tracking-widest uppercase">
              {t("scrollHint")}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
