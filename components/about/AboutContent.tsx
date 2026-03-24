"use client";

import { useEffect, useRef } from "react";
import { useTranslations, useLocale } from "next-intl";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionBadge from "@/components/ui/SectionBadge";
import { Link } from "@/i18n/navigation";

gsap.registerPlugin(ScrollTrigger);

const VALUE_KEYS = ["v1", "v2", "v3"] as const;

const STATS = [
  { value: "+500", key: "stat1" },
  { value: "98%",  key: "stat2" },
  { value: "~70%", key: "stat3" },
];

export default function AboutContent() {
  const t = useTranslations("about");
  const locale = useLocale();
  const isRTL = locale === "ar";
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".about-reveal").forEach((el, i) => {
        gsap.fromTo(
          el,
          { y: 40, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.75, delay: i * 0.1, ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 82%" },
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <main ref={sectionRef} className={`${isRTL ? "font-cairo" : ""}`}>

      {/* ── Hero section ── */}
      <section className="bg-[#1D1D1B] pt-36 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className={`about-reveal max-w-3xl ${isRTL ? "mr-auto text-right" : "ml-0"}`}>
            <SectionBadge variant="dark">{t("badge")}</SectionBadge>
            <h1 className="text-5xl md:text-6xl font-extrabold text-white mt-5 mb-6 leading-tight">
              {t("title")}
            </h1>
            <p className="text-gray-400 text-xl leading-relaxed">{t("description")}</p>
          </div>
        </div>
      </section>

      {/* ── Mission & Vision ── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8">
            {(["mission", "vision"] as const).map((key) => (
              <div
                key={key}
                className={`about-reveal bg-white rounded-2xl p-8 border border-gray-100 shadow-sm ${isRTL ? "text-right" : ""}`}
              >
                <div className="w-12 h-12 rounded-xl bg-[#FFF3CC] text-[#F8A700] flex items-center justify-center mb-5">
                  {key === "mission" ? (
                    <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                  ) : (
                    <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </div>
                <h3 className="font-extrabold text-[#1D1D1B] text-xl mb-3">{t(key)}</h3>
                <p className="text-gray-500 leading-relaxed">{t(`${key}Desc`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className={`about-reveal text-center mb-14 ${isRTL ? "text-right" : ""}`}>
            <h2 className="text-4xl font-extrabold text-[#1D1D1B] mb-3">
              {locale === "ar" ? "قيمنا" : "Nos valeurs"}
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {VALUE_KEYS.map((key, i) => (
              <div
                key={key}
                className={`about-reveal card-shine rounded-2xl p-8 border border-gray-100 shadow-sm bg-white group hover:-translate-y-2 hover:shadow-xl transition-all duration-300 ${isRTL ? "text-right" : ""}`}
              >
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-colors duration-300 group-hover:bg-[#F8A700] group-hover:text-[#1D1D1B]"
                  style={{ backgroundColor: ["#FFF3CC", "#E8F5E9", "#F3F4F6"][i], color: ["#F8A700", "#17A73D", "#1D1D1B"][i] }}
                >
                  {i === 0 && <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>}
                  {i === 1 && <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="4" /><line x1="12" y1="2" x2="12" y2="4" /><line x1="12" y1="20" x2="12" y2="22" /><line x1="2" y1="12" x2="4" y2="12" /><line x1="20" y1="12" x2="22" y2="12" /></svg>}
                  {i === 2 && <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>}
                </div>
                <h3 className="font-extrabold text-[#1D1D1B] text-lg mb-2">{t(`${key}.title`)}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{t(`${key}.desc`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="py-20 bg-[#F8A700]">
        <div className="max-w-7xl mx-auto px-6">
          <div className={`grid grid-cols-3 gap-8 text-center ${isRTL ? "font-cairo" : ""}`}>
            {STATS.map((s) => (
              <div key={s.key} className="about-reveal">
                <div className="text-4xl md:text-5xl font-extrabold text-[#1D1D1B] mb-2">{s.value}</div>
                <div className="text-[#3d3c39] text-sm md:text-base font-medium">{t(s.key)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <div className="about-reveal">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#1D1D1B] mb-4">
              {locale === "ar" ? "مستعد لبدء مشروعك؟" : "Prêt à démarrer votre projet ?"}
            </h2>
            <p className="text-gray-500 mb-8">
              {locale === "ar"
                ? "فريقنا متاح لدراسة مشروعك وتقديم أفضل حل شمسي."
                : "Notre équipe est disponible pour étudier votre projet et vous proposer la meilleure solution solaire."}
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-[#F8A700] hover:bg-[#D48F00] text-[#1D1D1B] font-extrabold px-8 py-4 rounded-full text-lg transition-all duration-200 hover:scale-105 shadow-glow-solar"
            >
              {locale === "ar" ? "اتصل بنا" : "Contactez-nous"}
              <svg className={`w-5 h-5 ${isRTL ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
