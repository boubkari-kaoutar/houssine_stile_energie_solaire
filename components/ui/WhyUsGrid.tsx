"use client";

import { useLocale } from "next-intl";

const CARDS = [
  {
    num: "01", color: "#F8A700",
    icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
        <polyline points="17 6 23 6 23 12"/>
      </svg>
    ),
    fr: {
      title: "Économies garanties jusqu'à 70%",
      desc: "Chaque installation est dimensionnée pour maximiser votre retour. Nos clients économisent en moyenne 60–70% dès la première année.",
    },
    ar: {
      title: "توفير مضمون يصل إلى 70%",
      desc: "نصمم كل منشأة لتحقيق أقصى عائد مالي. عملاؤنا يوفرون في المتوسط 60 إلى 70% من فاتورة الكهرباء.",
    },
  },
  {
    num: "02", color: "#17A73D",
    icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    fr: {
      title: "Techniciens certifiés & expérimentés",
      desc: "Notre équipe est formée aux dernières technologies solaires et certifiée par les organismes compétents.",
    },
    ar: {
      title: "تقنيون معتمدون وذوو خبرة",
      desc: "فريقنا مدرب على أحدث تقنيات الطاقة الشمسية ومعتمد من الجهات المختصة.",
    },
  },
  {
    num: "03", color: "#8899FF",
    icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="3"/>
        <path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/>
        <path d="M15.54 8.46a5 5 0 0 1 0 7.07M8.46 8.46a5 5 0 0 0 0 7.07"/>
      </svg>
    ),
    fr: {
      title: "Solutions 100% sur mesure",
      desc: "Nous étudions chaque cas — toiture, consommation, budget — pour concevoir un système parfaitement adapté.",
    },
    ar: {
      title: "حلول مخصصة لكل مشروع",
      desc: "ندرس كل حالة على حدة — السطح، الاستهلاك، الميزانية — لنصمم نظاماً يناسبك تماماً.",
    },
  },
  {
    num: "04", color: "#F86400",
    icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    fr: {
      title: "Accompagnement de A à Z",
      desc: "Étude initiale, conception, installation et suivi post-mise en service. Une ligne directe avec notre équipe.",
    },
    ar: {
      title: "مرافقة كاملة من البداية إلى النهاية",
      desc: "نرافقك في كل خطوة: الدراسة الأولية، التصميم، التركيب، والمتابعة بعد التشغيل.",
    },
  },
];

function colorRgb(hex: string) {
  if (hex === "#F8A700") return "248,167,0";
  if (hex === "#17A73D") return "23,167,61";
  if (hex === "#8899FF") return "136,153,255";
  return "248,100,0";
}

export default function WhyUsGrid({ animClass = "" }: { animClass?: string }) {
  const locale = useLocale();
  const isRTL  = locale === "ar";

  return (
    <div className="grid md:grid-cols-2 gap-4">
      {CARDS.map((card) => {
        const content = locale === "ar" ? card.ar : card.fr;
        return (
          <div
            key={card.num}
            className={`${animClass} group relative p-10 rounded-2xl border border-white/[0.08] transition-all duration-300 hover:-translate-y-1 ${isRTL ? "text-right font-cairo" : ""}`}
            style={{
              background: `linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(${colorRgb(card.color)},0.06) 100%)`,
              boxShadow: `0 1px 0 0 ${card.color}20 inset`,
            }}
          >
            {/* Ghost number */}
            <span
              className={`absolute top-8 font-extrabold text-[5rem] leading-none opacity-[0.05] select-none pointer-events-none ${isRTL ? "left-8" : "right-8"}`}
              style={{ color: card.color }}
            >
              {card.num}
            </span>

            {/* Icon */}
            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center mb-8 transition-transform duration-300 group-hover:scale-105"
              style={{ backgroundColor: `${card.color}12`, color: card.color, border: `1px solid ${card.color}25` }}
            >
              {card.icon}
            </div>

            <h3 className="text-white font-extrabold text-xl mb-4 leading-tight">{content.title}</h3>
            <p className="text-gray-400 text-sm leading-[1.85]">{content.desc}</p>

            {/* Bottom bar */}
            <div
              className="mt-8 h-[2px] w-8 rounded-full transition-all duration-300 group-hover:w-16"
              style={{ backgroundColor: card.color }}
            />
          </div>
        );
      })}
    </div>
  );
}
