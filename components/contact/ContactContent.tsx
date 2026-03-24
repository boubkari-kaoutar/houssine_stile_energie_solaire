"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionBadge from "@/components/ui/SectionBadge";
import FloatingTestimonials from "@/components/ui/FloatingTestimonials";

gsap.registerPlugin(ScrollTrigger);

const PHONE = "212661780430";

export default function ContactContent() {
  const t = useTranslations("contact");
  const locale = useLocale();
  const isRTL = locale === "ar";
  const mainRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const cursorGlowRef = useRef<HTMLDivElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const waMessage = encodeURIComponent(
    locale === "ar"
      ? "مرحباً، أود التحدث عن مشروع طاقة شمسية."
      : "Bonjour, je souhaite discuter d'un projet d'énergie solaire."
  );

  const INFO_ITEMS = [
    {
      key: "phone",
      value: "+212 661 780 430",
      icon: (
        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.24l3-.08a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.18a16 16 0 0 0 5.91 5.91l1.65-1.65a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
      ),
    },
    {
      key: "email",
      value: "contact@sunset-energy.ma",
      icon: (
        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
      ),
    },
    {
      key: "hours",
      value: locale === "ar" ? "الإثنين – السبت: 8:00 – 18:00" : "Lun – Sam : 8h00 – 18h00",
      icon: (
        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
        </svg>
      ),
    },
    {
      key: "address",
      value: "Maroc",
      icon: (
        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
        </svg>
      ),
    },
  ];


  const FAQS = [
    {
      q: locale === "ar" ? "كم تستغرق عملية التركيب؟" : "Combien de temps dure l'installation ?",
      a: locale === "ar"
        ? "تتراوح مدة التركيب بين يوم وثلاثة أيام حسب حجم المشروع. نبدأ بدراسة تقنية مجانية تليها مرحلة التركيب والتشغيل."
        : "L'installation dure entre 1 et 3 jours selon la taille du projet. Nous commençons par une étude technique gratuite, suivie de l'installation et de la mise en service.",
    },
    {
      q: locale === "ar" ? "ما هي مدة الضمان على الألواح الشمسية؟" : "Quelle est la garantie sur les panneaux solaires ?",
      a: locale === "ar"
        ? "نقدم ضمان أداء لمدة 25 سنة على الألواح الشمسية، وضمان على العاكسات لمدة 10 سنوات، إضافة إلى ضمان التركيب لمدة سنتين."
        : "Nous offrons une garantie de performance de 25 ans sur les panneaux, 10 ans sur les onduleurs, et 2 ans sur l'installation.",
    },
    {
      q: locale === "ar" ? "هل يمكنني الاستفادة من دعم حكومي؟" : "Puis-je bénéficier d'aides gouvernementales ?",
      a: locale === "ar"
        ? "نعم، هناك برامج دعم متاحة في المغرب. فريقنا يرافقك في الحصول على التمويل المناسب وتبسيط الإجراءات الإدارية."
        : "Oui, des programmes d'aide sont disponibles au Maroc. Notre équipe vous accompagne dans l'obtention des financements et simplifie les démarches administratives.",
    },
    {
      q: locale === "ar" ? "كيف أعرف إذا كان منزلي مناسباً للطاقة الشمسية؟" : "Comment savoir si ma maison est compatible ?",
      a: locale === "ar"
        ? "نقوم بتحليل مجاني لسطحك واستهلاكك الطاقي. معظم المنازل والمباني التجارية مناسبة للطاقة الشمسية في المغرب."
        : "Nous réalisons une analyse gratuite de votre toiture et de votre consommation. La majorité des maisons et bâtiments commerciaux sont compatibles au Maroc.",
    },
  ];

  useEffect(() => {
    const hero = heroRef.current;
    const glow = cursorGlowRef.current;
    if (!hero || !glow) return;
    const onMove = (e: MouseEvent) => {
      const rect = hero.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      glow.style.left = `${x}px`;
      glow.style.top = `${y}px`;
      glow.style.opacity = "1";
    };
    const onLeave = () => { glow.style.opacity = "0"; };
    hero.addEventListener("mousemove", onMove);
    hero.addEventListener("mouseleave", onLeave);
    return () => {
      hero.removeEventListener("mousemove", onMove);
      hero.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".contact-reveal").forEach((el) => {
        gsap.fromTo(el,
          { y: 35, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 82%" } }
        );
      });
    }, mainRef);
    return () => ctx.revert();
  }, [locale]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main ref={mainRef} className={isRTL ? "font-cairo" : ""}>

      {/* ── Hero ── */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0a0a09]">

        {/* Cursor glow */}
        <div
          ref={cursorGlowRef}
          className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            width: "700px",
            height: "700px",
            background: "radial-gradient(circle, rgba(248,167,0,0.09) 0%, rgba(248,167,0,0.03) 40%, transparent 70%)",
            transition: "opacity 0.5s ease, left 0.1s linear, top 0.1s linear",
            opacity: 0,
            zIndex: 1,
          }}
        />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center pt-24">

          {/* Badge */}
          <div className="contact-reveal inline-flex items-center gap-2 mb-10">
            <span className="w-5 h-px bg-[#F8A700]/60" />
            <span className="text-[#F8A700] text-xs font-bold uppercase tracking-[0.35em]">{t("badge")}</span>
            <span className="w-5 h-px bg-[#F8A700]/60" />
          </div>

          {/* Main title */}
          <h1 className="contact-reveal font-serif text-5xl md:text-6xl lg:text-[4.5rem] font-bold text-white leading-[1.05] tracking-tight mb-4">
            {locale === "ar" ? "مشروع طاقي؟" : "Un Projet Solaire ?"}
          </h1>
          <h1 className="contact-reveal font-serif text-5xl md:text-6xl lg:text-[4.5rem] font-bold italic leading-[1.05] tracking-tight mb-12"
            style={{ color: "#F8A700" }}>
            {locale === "ar" ? ".تحدث معنا" : "Parlons-en."}
          </h1>

          {/* Subtitle */}
          <p className="contact-reveal text-white/50 text-lg leading-[1.9] max-w-xl mx-auto mb-12">
            {t("subtitle")}
          </p>

          {/* CTA buttons */}
          <div className={`contact-reveal flex flex-col sm:flex-row items-center justify-center gap-4 ${isRTL ? "sm:flex-row-reverse" : ""}`}>
            <a
              href="tel:+212661780430"
              className="group flex items-center gap-3 bg-white hover:bg-white/90 text-[#0a0a09] font-bold px-8 py-4 rounded-full text-sm uppercase tracking-widest transition-all duration-200 hover:scale-105"
            >
              <svg className="w-4 h-4 transition-transform duration-300 group-hover:rotate-12" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.24l3-.08a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.18a16 16 0 0 0 5.91 5.91l1.65-1.65a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              {locale === "ar" ? "اتصل بنا" : "Appel immédiat"}
            </a>
            <a
              href={`https://wa.me/${PHONE}?text=${waMessage}`}
              target="_blank" rel="noreferrer"
              className="group flex items-center gap-3 bg-[#25D366] hover:bg-[#1da851] text-white font-bold px-8 py-4 rounded-full text-sm uppercase tracking-widest transition-all duration-200 hover:scale-105"
            >
              <svg className="w-4 h-4 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-125" fill="white" viewBox="0 0 448 512">
                <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
              </svg>
              WhatsApp
            </a>
          </div>

          {/* Scroll hint */}
          <div className="contact-reveal mt-20 flex items-center justify-center gap-2 text-white/20 text-xs uppercase tracking-widest">
            <span className="w-4 h-px bg-white/20" />
            {locale === "ar" ? "رد خلال 24 ساعة" : "Réponse sous 24h"}
            <span className="w-4 h-px bg-white/20" />
          </div>
        </div>
      </section>

      {/* ── Contact form + info ── */}
      <section className="bg-[#141412] py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className={`grid lg:grid-cols-5 gap-10 items-start ${isRTL ? "lg:flex lg:flex-row-reverse" : ""}`}>

            {/* Left — Info + WhatsApp (2/5) */}
            <div className="lg:col-span-2 space-y-4">
              {/* Info items */}
              {INFO_ITEMS.map(({ key, value, icon }) => (
                <div
                  key={key}
                  className={`contact-reveal flex items-center gap-4 p-5 rounded-2xl border border-white/[0.07] bg-white/[0.03] hover:bg-white/[0.05] transition-colors ${isRTL ? "flex-row-reverse text-right" : ""}`}
                >
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 bg-[#F8A700]/10 text-[#F8A700]">
                    {icon}
                  </div>
                  <div>
                    <p className="text-white/40 text-xs uppercase tracking-widest font-semibold">{t(key)}</p>
                    <p className="text-white font-bold mt-0.5">{value}</p>
                  </div>
                </div>
              ))}

              {/* WhatsApp CTA */}
              <div className="contact-reveal rounded-2xl overflow-hidden border border-[#25D366]/30"
                style={{ background: "linear-gradient(135deg, rgba(37,211,102,0.08), rgba(37,211,102,0.03))" }}>
                <div className={`p-6 flex flex-col gap-4 ${isRTL ? "text-right items-end" : ""}`}>
                  <div className={`flex items-center gap-3 ${isRTL ? "flex-row-reverse" : ""}`}>
                    <div className="w-11 h-11 bg-[#25D366] rounded-xl flex items-center justify-center flex-shrink-0">
                      <svg width="22" height="22" fill="white" viewBox="0 0 448 512">
                        <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-white font-extrabold">{locale === "ar" ? "واتساب" : "WhatsApp"}</p>
                      <p className="text-white/40 text-xs">{locale === "ar" ? "رد فوري" : "Réponse immédiate"}</p>
                    </div>
                  </div>
                  <a
                    href={`https://wa.me/${PHONE}?text=${waMessage}`}
                    target="_blank" rel="noreferrer"
                    className="group w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1da851] text-white font-bold px-5 py-3 rounded-xl text-sm transition-all duration-200"
                  >
                    {t("whatsapp")}
                    <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Right — Form (3/5) */}
            <div className="lg:col-span-3 contact-reveal">
              <div className="rounded-3xl border border-white/[0.07] bg-white/[0.03] p-8 md:p-10">
                {submitted ? (
                  <div className={`text-center py-14 ${isRTL ? "font-cairo" : ""}`}>
                    <div className="w-16 h-16 bg-[#17A73D]/15 text-[#17A73D] rounded-full flex items-center justify-center mx-auto mb-5 border border-[#17A73D]/30">
                      <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <h3 className="font-extrabold text-2xl text-white mb-2">
                      {locale === "ar" ? "تم الإرسال!" : "Message envoyé !"}
                    </h3>
                    <p className="text-gray-400">{t("formSuccess")}</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className={`space-y-5 ${isRTL ? "text-right" : ""}`}>
                    <div className="grid grid-cols-2 gap-4">
                      {(["formName", "formLastname"] as const).map((field) => (
                        <div key={field}>
                          <label className="block text-xs font-bold text-white/50 uppercase tracking-widest mb-2">{t(field)}</label>
                          <input type="text" required
                            className="w-full bg-white/[0.05] border border-white/[0.10] rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#F8A700]/60 focus:bg-white/[0.07] transition-all" />
                        </div>
                      ))}
                    </div>

                    {(["formEmail", "formPhone"] as const).map((field) => (
                      <div key={field}>
                        <label className="block text-xs font-bold text-white/50 uppercase tracking-widest mb-2">{t(field)}</label>
                        <input type={field === "formEmail" ? "email" : "tel"} required={field === "formEmail"}
                          className="w-full bg-white/[0.05] border border-white/[0.10] rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#F8A700]/60 focus:bg-white/[0.07] transition-all" />
                      </div>
                    ))}

                    <div>
                      <label className="block text-xs font-bold text-white/50 uppercase tracking-widest mb-2">{t("formService")}</label>
                      <select className="w-full bg-white/[0.05] border border-white/[0.10] rounded-xl px-4 py-3 text-sm text-white/70 focus:outline-none focus:border-[#F8A700]/60 transition-all"
                        style={{ backgroundColor: "rgba(255,255,255,0.04)" }}>
                        <option value="" style={{ background: "#1D1D1B" }}>{t("formServiceDefault")}</option>
                        {(["s1", "s2", "s3", "s4", "s5"] as const).map((s) => (
                          <option key={s} style={{ background: "#1D1D1B" }}>{t(s)}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-white/50 uppercase tracking-widest mb-2">{t("formMessage")}</label>
                      <textarea rows={4} required placeholder={t("formMessagePlaceholder")}
                        className="w-full bg-white/[0.05] border border-white/[0.10] rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#F8A700]/60 focus:bg-white/[0.07] transition-all resize-none" />
                    </div>

                    <button type="submit"
                      className="group w-full flex items-center justify-center gap-3 bg-[#F8A700] hover:bg-[#D48F00] text-[#1D1D1B] font-extrabold py-4 rounded-xl text-base transition-all duration-200 hover:scale-[1.01]"
                      style={{ boxShadow: "0 0 30px rgba(248,167,0,0.2)" }}>
                      {t("formSubmit")}
                      <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
                      </svg>
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <FloatingTestimonials titleClass="contact-reveal" />

      {/* ── FAQ ── */}
      <section className="py-24 bg-[#141412] border-t border-white/[0.06]">
        <div className="max-w-4xl mx-auto px-6">
          <div className={`contact-reveal mb-14 ${isRTL ? "text-right" : ""}`}>
            <p className="text-[#F8A700] text-xs font-bold uppercase tracking-[0.3em] mb-4">
              {locale === "ar" ? "أسئلة شائعة" : "Questions fréquentes"}
            </p>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight tracking-tight">
              {locale === "ar" ? "كل ما تريد معرفته" : "Tout ce que vous voulez savoir"}
            </h2>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <div key={i}
                className="contact-reveal rounded-2xl border border-white/[0.07] overflow-hidden transition-all duration-300"
                style={{ background: openFaq === i ? "rgba(248,167,0,0.04)" : "rgba(255,255,255,0.02)" }}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className={`w-full flex items-center justify-between gap-4 px-7 py-5 text-left transition-colors ${isRTL ? "flex-row-reverse text-right" : ""}`}
                >
                  <span className="font-bold text-white text-base">{faq.q}</span>
                  <span
                    className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300"
                    style={{ backgroundColor: openFaq === i ? "rgba(248,167,0,0.15)" : "rgba(255,255,255,0.05)",
                      color: openFaq === i ? "#F8A700" : "rgba(255,255,255,0.4)" }}
                  >
                    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"
                      style={{ transform: openFaq === i ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.3s ease" }}>
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </span>
                </button>
                {openFaq === i && (
                  <div className={`px-7 pb-6 text-gray-400 text-sm leading-[1.85] ${isRTL ? "text-right" : ""}`}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}
