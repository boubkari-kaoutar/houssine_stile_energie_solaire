"use client";

import { useEffect, useRef } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionBadge from "@/components/ui/SectionBadge";

gsap.registerPlugin(ScrollTrigger);

const PHONE = "212600000000";

export default function CTABanner() {
  const t = useTranslations("cta");
  const locale = useLocale();
  const isRTL = locale === "ar";
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".cta-content",
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.9, ease: "power2.out",
          scrollTrigger: { trigger: ".cta-content", start: "top 80%" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const message = encodeURIComponent(
    locale === "ar"
      ? "مرحباً، أود طلب عرض سعر مجاني لتركيب ألواح شمسية."
      : "Bonjour, je souhaite demander un devis gratuit pour une installation solaire."
  );

  return (
    <section ref={sectionRef} className="py-24 bg-[#F8A700]">
      <div className="max-w-4xl mx-auto px-6">
        <div className={`cta-content text-center ${isRTL ? "font-cairo" : ""}`}>
          <SectionBadge variant="dark">{t("badge")}</SectionBadge>

          <h2 className="text-4xl md:text-6xl font-extrabold text-[#1D1D1B] mt-6 mb-4 leading-tight">
            {t("title1")} <br />
            <span>{t("title2")}</span>
          </h2>

          <p className="text-[#3d3c39] text-lg mb-10 max-w-xl mx-auto">
            {t("subtitle")}
          </p>

          <div className={`flex flex-col sm:flex-row gap-4 justify-center ${isRTL ? "sm:flex-row-reverse" : ""}`}>
            <Link
              href="/contact"
              className="relative overflow-hidden bg-[#1D1D1B] text-white font-extrabold px-8 py-4 rounded-full text-lg transition-all duration-200 hover:scale-105 shadow-lg group"
            >
              {/* horizontal fill on hover */}
              <span className="absolute inset-0 w-0 group-hover:w-full transition-all duration-500 ease-in-out bg-[#17A73D] rounded-full z-0" />
              <span className="relative z-10 transition-colors duration-300 group-hover:text-[#1D1D1B]">
                {t("button")}
              </span>
            </Link>

            <a
              href={`https://wa.me/${PHONE}?text=${message}`}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#1da851] text-white font-extrabold px-8 py-4 rounded-full text-lg transition-all duration-200 hover:scale-105 shadow-lg"
            >
              <svg width="22" height="22" fill="white" viewBox="0 0 448 512"
                className="transition-transform duration-300 group-hover:rotate-12 group-hover:scale-125">
                <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
              </svg>
              {t("whatsapp")}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
