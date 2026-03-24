"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionBadge from "@/components/ui/SectionBadge";

gsap.registerPlugin(ScrollTrigger);

const PHONE = "212600000000";

export default function ContactContent() {
  const t = useTranslations("contact");
  const locale = useLocale();
  const isRTL = locale === "ar";
  const sectionRef = useRef<HTMLElement>(null);
  const [submitted, setSubmitted] = useState(false);

  const waMessage = encodeURIComponent(
    locale === "ar"
      ? "مرحباً، أود التحدث عن مشروع طاقة شمسية."
      : "Bonjour, je souhaite discuter d'un projet d'énergie solaire."
  );

  const INFO_ITEMS = [
    {
      key: "address",
      icon: (
        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
        </svg>
      ),
    },
    {
      key: "phone",
      icon: (
        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.24l3-.08a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.18a16 16 0 0 0 5.91 5.91l1.65-1.65a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
      ),
    },
    {
      key: "email",
      icon: (
        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
      ),
    },
    {
      key: "hours",
      icon: (
        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
        </svg>
      ),
    },
  ] as const;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".contact-reveal").forEach((el, i) => {
        gsap.fromTo(
          el,
          { y: 30, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.7, delay: i * 0.1, ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 82%" },
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main ref={sectionRef} className={`${isRTL ? "font-cairo" : ""}`}>

      {/* ── Hero ── */}
      <section className="bg-[#1D1D1B] pt-36 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className={`contact-reveal max-w-3xl ${isRTL ? "mr-auto text-right" : ""}`}>
            <SectionBadge variant="dark">{t("badge")}</SectionBadge>
            <h1 className="text-5xl md:text-6xl font-extrabold text-white mt-5 mb-6 leading-tight">
              {t("title")}
            </h1>
            <p className="text-gray-400 text-xl leading-relaxed">{t("subtitle")}</p>
          </div>
        </div>
      </section>

      {/* ── Main content ── */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className={`grid md:grid-cols-2 gap-12 items-start ${isRTL ? "md:flex-row-reverse" : ""}`}>

            {/* Info */}
            <div className="space-y-5">
              {INFO_ITEMS.map(({ key, icon }) => (
                <div
                  key={key}
                  className={`contact-reveal bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex items-start gap-4 ${
                    isRTL ? "flex-row-reverse text-right" : ""
                  }`}
                >
                  <div className="w-11 h-11 bg-[#FFF3CC] text-[#F8A700] rounded-xl flex items-center justify-center flex-shrink-0">
                    {icon}
                  </div>
                  <div>
                    <p className="font-bold text-[#1D1D1B] text-sm">{t(key)}</p>
                    <p className="text-gray-500 mt-0.5">{t(`${key}Value`)}</p>
                  </div>
                </div>
              ))}

              {/* WhatsApp card */}
              <div className="contact-reveal bg-[#F8A700] rounded-2xl p-6">
                <div className={`flex items-center gap-3 mb-3 ${isRTL ? "flex-row-reverse" : ""}`}>
                  <svg width="28" height="28" fill="white" viewBox="0 0 448 512">
                    <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
                  </svg>
                  <p className="font-extrabold text-[#1D1D1B] text-lg">{t("whatsapp")}</p>
                </div>
                <a
                  href={`https://wa.me/${PHONE}?text=${waMessage}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 bg-[#1D1D1B] hover:bg-[#2d2c29] text-white font-bold px-6 py-3 rounded-full text-sm transition-all duration-200 hover:scale-105"
                >
                  {t("whatsapp")}
                  <svg className={`w-4 h-4 ${isRTL ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Form */}
            <div className="contact-reveal bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
              {submitted ? (
                <div className="text-center py-10">
                  <div
                    className="w-16 h-16 bg-[#E8F5E9] text-[#17A73D] rounded-full flex items-center justify-center mx-auto mb-5"
                  >
                    <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <h3 className="font-extrabold text-2xl text-[#1D1D1B] mb-2">
                    {locale === "ar" ? "تم الإرسال!" : "Message envoyé !"}
                  </h3>
                  <p className="text-gray-500">{t("formSuccess")}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className={`space-y-5 ${isRTL ? "text-right" : ""}`}>
                  <div className="grid grid-cols-2 gap-4">
                    {(["formName", "formLastname"] as const).map((field) => (
                      <div key={field}>
                        <label className="block text-sm font-bold text-[#1D1D1B] mb-2">{t(field)}</label>
                        <input
                          type="text"
                          required
                          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#F8A700] focus:ring-2 focus:ring-[#F8A700]/20 transition-all"
                        />
                      </div>
                    ))}
                  </div>

                  {(["formEmail", "formPhone"] as const).map((field) => (
                    <div key={field}>
                      <label className="block text-sm font-bold text-[#1D1D1B] mb-2">{t(field)}</label>
                      <input
                        type={field === "formEmail" ? "email" : "tel"}
                        required={field === "formEmail"}
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#F8A700] focus:ring-2 focus:ring-[#F8A700]/20 transition-all"
                      />
                    </div>
                  ))}

                  <div>
                    <label className="block text-sm font-bold text-[#1D1D1B] mb-2">{t("formService")}</label>
                    <select className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-600 bg-white focus:outline-none focus:border-[#F8A700] focus:ring-2 focus:ring-[#F8A700]/20 transition-all">
                      <option value="">{t("formServiceDefault")}</option>
                      {(["s1", "s2", "s3", "s4", "s5"] as const).map((s) => (
                        <option key={s}>{t(s)}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-[#1D1D1B] mb-2">{t("formMessage")}</label>
                    <textarea
                      rows={4}
                      required
                      placeholder={t("formMessagePlaceholder")}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#F8A700] focus:ring-2 focus:ring-[#F8A700]/20 transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-3 bg-[#F8A700] hover:bg-[#D48F00] text-[#1D1D1B] font-extrabold py-4 rounded-xl text-lg transition-all duration-200 hover:scale-[1.01] shadow-glow-solar"
                  >
                    {t("formSubmit")}
                    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <line x1="22" y1="2" x2="11" y2="13" />
                      <polygon points="22 2 15 22 11 13 2 9 22 2" />
                    </svg>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
