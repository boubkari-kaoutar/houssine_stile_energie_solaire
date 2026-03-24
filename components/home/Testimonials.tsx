"use client";

import { useEffect, useRef } from "react";
import { useTranslations, useLocale } from "next-intl";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionBadge from "@/components/ui/SectionBadge";

gsap.registerPlugin(ScrollTrigger);

const TESTIMONIAL_KEYS = ["t1", "t2", "t3"] as const;
const INITIALS = ["KA", "SB", "YO"];
const COLORS = ["#F8A700", "#17A73D", "#1D1D1B"];

export default function Testimonials() {
  const t = useTranslations("testimonials");
  const locale = useLocale();
  const isRTL = locale === "ar";
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".testi-header",
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: "power2.out",
          scrollTrigger: { trigger: ".testi-header", start: "top 85%" },
        }
      );
      cardRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { y: 40, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.65, delay: i * 0.12, ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 82%" },
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-[#1D1D1B]">
      <div className="max-w-7xl mx-auto px-6">
        <div className={`testi-header text-center mb-16 ${isRTL ? "font-cairo" : ""}`}>
          <SectionBadge variant="dark">{t("badge")}</SectionBadge>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mt-4 mb-4">
            {t("title")}
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">{t("subtitle")}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 items-start">
          {TESTIMONIAL_KEYS.map((key, i) => (
            <div
              key={key}
              ref={(el) => { cardRefs.current[i] = el; }}
              className={`rounded-2xl p-8 flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ${
                i === 1
                  ? "bg-[#F8A700] scale-105"
                  : "bg-white/5 border border-white/10"
              } ${isRTL ? "text-right" : ""}`}
            >
              {/* Stars */}
              <div className={`flex gap-1 mb-5 ${isRTL ? "flex-row-reverse" : ""}`}>
                {Array.from({ length: 5 }).map((_, s) => (
                  <svg key={s} className={`w-4 h-4 ${i === 1 ? "text-[#1D1D1B]" : "text-[#F8A700]"}`} fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Quote mark */}
              <svg
                className={`w-8 h-8 mb-3 opacity-40 ${i === 1 ? "text-[#1D1D1B]" : "text-[#F8A700]"} ${isRTL ? "self-end" : "self-start"}`}
                fill="currentColor" viewBox="0 0 24 24"
              >
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>

              <p
                className={`leading-relaxed flex-1 mb-6 text-sm ${
                  i === 1 ? "text-[#1D1D1B]" : "text-gray-300"
                } ${isRTL ? "font-cairo" : ""}`}
              >
                {t(`${key}.text`)}
              </p>

              {/* Author */}
              <div className={`flex items-center gap-3 ${isRTL ? "flex-row-reverse" : ""}`}>
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center font-bold text-white text-xs flex-shrink-0"
                  style={{ backgroundColor: i === 1 ? "#1D1D1B" : COLORS[i] }}
                >
                  {INITIALS[i]}
                </div>
                <div>
                  <p className={`font-bold text-sm ${i === 1 ? "text-[#1D1D1B]" : "text-white"}`}>
                    {t(`${key}.name`)}
                  </p>
                  <p className={`text-xs mt-0.5 ${i === 1 ? "text-[#3d3c39]" : "text-gray-500"}`}>
                    {t(`${key}.role`)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
