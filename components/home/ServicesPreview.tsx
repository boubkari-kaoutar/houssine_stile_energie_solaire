"use client";

import { useEffect, useRef } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionBadge from "@/components/ui/SectionBadge";
import ServiceBlocks from "@/components/ui/ServiceBlocks";

gsap.registerPlugin(ScrollTrigger);



export default function ServicesPreview() {
  const t = useTranslations("services");
  const locale = useLocale();
  const isRTL = locale === "ar";
  const sectionRef = useRef<HTMLElement>(null);

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

    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="services-preview" className="relative py-24 lg:py-32 bg-[#1D1D1B] overflow-hidden">
      {/* Gold glow bottom-center */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse at center bottom, rgba(248,167,0,0.07) 0%, transparent 70%)" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className={`services-header text-center mb-16 ${isRTL ? "font-cairo" : ""}`}>
          <SectionBadge variant="dark">{t("badge")}</SectionBadge>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mt-4 mb-4 tracking-tight">
            {t("title")}
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">{t("subtitle")}</p>
        </div>
      </div>

      <ServiceBlocks />
    </section>
  );
}
