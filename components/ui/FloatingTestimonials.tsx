"use client";

import { useRef, useEffect } from "react";
import { useLocale } from "next-intl";

const TESTIMONIALS = {
  fr: [
    { name: "Karim Alaoui",  initials: "KA", avatarColor: "#F8A700", role: "Particulier, Casablanca",  stars: 5, text: "Installation impeccable. En 6 mois, ma facture a été réduite de 65%. L'équipe Sunset Energy est professionnelle et réactive." },
    { name: "Sara Benali",   initials: "SB", avatarColor: "#17A73D", role: "Directrice, PME Marrakech", stars: 5, text: "Notre entreprise économise plus de 40 000 DH par an. Le retour sur investissement est bien plus rapide que prévu." },
    { name: "Youssef Ouhbi", initials: "YO", avatarColor: "#8899FF", role: "Particulier, Rabat",        stars: 5, text: "Du premier contact à la mise en service, tout s'est déroulé parfaitement. L'audit énergétique était très complet." },
  ],
  ar: [
    { name: "كريم العلوي",  initials: "ك",  avatarColor: "#F8A700", role: "فرد، الدار البيضاء",         stars: 5, text: "تركيب لا تشوبه شائبة. خلال 6 أشهر، انخفضت فاتورة الكهرباء بنسبة 65%. فريق صنست إنرجي محترف وسريع الاستجابة." },
    { name: "سارة بنعلي",   initials: "س",  avatarColor: "#17A73D", role: "مديرة، مؤسسة صغيرة بمراكش", stars: 5, text: "شركتنا توفر أكثر من 40,000 درهم سنوياً. العائد على الاستثمار أسرع مما توقعنا." },
    { name: "يوسف أوهبي",  initials: "ي",  avatarColor: "#8899FF", role: "فرد، الرباط",                stars: 5, text: "من أول اتصال حتى التشغيل، سار كل شيء بشكل مثالي. التدقيق الطاقي كان شاملاً." },
  ],
};

const CARD_STYLES = [
  { floatClass: "card-float-1", delay: "0s",   left: "4%",  zIndex: 10, bg: "linear-gradient(145deg, #242422, #1a1a18)", border: "rgba(248,167,0,0.12)" },
  { floatClass: "card-float-2", delay: "1.2s", left: "34%", zIndex: 20, bg: "linear-gradient(145deg, #1e2219, #191f16)", border: "rgba(23,167,61,0.12)"  },
  { floatClass: "card-float-3", delay: "0.6s", left: "64%", zIndex: 10, bg: "linear-gradient(145deg, #22211f, #1c1c1a)", border: "rgba(248,167,0,0.08)"  },
];

function Avatar({ initials, color, size = 40 }: { initials: string; color: string; size?: number }) {
  return (
    <div
      className="flex items-center justify-center rounded-full flex-shrink-0 font-bold"
      style={{
        width: size, height: size,
        background: `${color}22`,
        border: `2px solid ${color}55`,
        color,
        fontSize: size * 0.38,
      }}
    >
      {initials}
    </div>
  );
}

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-1">
      {Array(count).fill(0).map((_, i) => (
        <svg key={i} width="13" height="13" fill="#F8A700" viewBox="0 0 24 24">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );
}

export default function FloatingTestimonials({ titleClass = "" }: { titleClass?: string }) {
  const locale     = useLocale();
  const isRTL      = locale === "ar";
  const items      = locale === "ar" ? TESTIMONIALS.ar : TESTIMONIALS.fr;
  const sectionRef = useRef<HTMLElement>(null);
  const glowRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const glow    = glowRef.current;
    if (!section || !glow) return;
    const onMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      glow.style.left    = `${e.clientX - rect.left}px`;
      glow.style.top     = `${e.clientY - rect.top}px`;
      glow.style.opacity = "1";
    };
    const onLeave = () => { glow.style.opacity = "0"; };
    section.addEventListener("mousemove", onMove);
    section.addEventListener("mouseleave", onLeave);
    return () => {
      section.removeEventListener("mousemove", onMove);
      section.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <>
      <style>{`
        @keyframes float-1 { 0%,100%{transform:rotate(-4deg) translateY(0px)} 50%{transform:rotate(-3deg) translateY(-14px)} }
        @keyframes float-2 { 0%,100%{transform:rotate(2deg) translateY(0px)}  50%{transform:rotate(3deg) translateY(-18px)} }
        @keyframes float-3 { 0%,100%{transform:rotate(-2deg) translateY(0px)} 50%{transform:rotate(-1deg) translateY(-10px)} }
        @media(min-width:768px){
          .card-float-1{animation:float-1 5s ease-in-out infinite}
          .card-float-2{animation:float-2 6.5s ease-in-out infinite}
          .card-float-3{animation:float-3 4.8s ease-in-out infinite}
          .card-float-1:hover,.card-float-2:hover,.card-float-3:hover{animation-play-state:paused;transform:rotate(0deg) scale(1.05)!important}
        }
      `}</style>

      <section ref={sectionRef} className="relative py-32 overflow-hidden border-t border-white/[0.06]"
        style={{ background: "linear-gradient(160deg, #141412 0%, #1a1f18 50%, #141412 100%)" }}>

        {/* Cursor glow */}
        <div ref={glowRef} className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{ width: "600px", height: "600px", background: "radial-gradient(circle, rgba(248,167,0,0.08) 0%, rgba(248,167,0,0.03) 40%, transparent 70%)", transition: "opacity 0.4s ease, left 0.08s linear, top 0.08s linear", opacity: 0, zIndex: 1 }} />

        {/* Ambient glows */}
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(248,167,0,0.06) 0%, transparent 70%)" }} />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(23,167,61,0.05) 0%, transparent 70%)" }} />

        {/* Giant editorial text */}
        <div className={`absolute inset-0 flex flex-col justify-center pointer-events-none select-none ${isRTL ? "items-end pr-8" : "items-start pl-8"}`}>
          <span className="font-extrabold leading-[0.85] text-white/[0.04]" style={{ fontSize: "clamp(80px,18vw,260px)" }}>
            {locale === "ar" ? "آراء" : "Avis"}
          </span>
          <span className="font-extrabold leading-[0.85] italic text-white/[0.04]" style={{ fontSize: "clamp(80px,18vw,260px)" }}>
            {locale === "ar" ? "العملاء" : "clients"}
          </span>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className={`${titleClass} text-center mb-20`}>
            <p className="text-[#F8A700] text-xs font-bold uppercase tracking-[0.3em] mb-4">
              {locale === "ar" ? "شهادات العملاء" : "Témoignages"}
            </p>
            <h2 className="text-4xl md:text-6xl font-extrabold text-white leading-tight tracking-tight">
              {locale === "ar" ? "ماذا يقول عملاؤنا" : "Ce que disent nos clients"}
            </h2>
          </div>

          {/* ── Mobile: horizontal scroll carousel ── */}
          <div className="md:hidden flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-none -mx-6 px-6">
            {items.map((item, i) => {
              const s = CARD_STYLES[i];
              return (
                <div key={i}
                  className="snap-center flex-shrink-0 w-[80vw] max-w-[320px] rounded-2xl p-6 cursor-default flex flex-col"
                  style={{ background: s.bg, border: `1px solid ${s.border}`, boxShadow: "0 25px 70px rgba(0,0,0,0.5)" }}
                >
                  <div className={`flex items-center gap-3 mb-4 ${isRTL ? "flex-row-reverse" : ""}`}>
                    <Avatar initials={item.initials} color={item.avatarColor} size={44} />
                    <div className={isRTL ? "text-right" : ""}>
                      <p className="text-white text-sm font-semibold leading-tight">{item.name}</p>
                      <p className="text-white/40 text-xs mt-0.5">{item.role}</p>
                    </div>
                  </div>
                  <Stars count={item.stars} />
                  <p className={`text-gray-300 text-sm leading-[1.8] mt-4 flex-1 ${isRTL ? "text-right font-cairo" : ""}`}>{item.text}</p>
                </div>
              );
            })}
          </div>

          {/* ── Desktop: floating absolute ── */}
          <div className="hidden md:block relative w-full h-[460px]">
            {items.map((item, i) => {
              const s = CARD_STYLES[i];
              return (
                <div key={i}
                  className={`${s.floatClass} ${titleClass} absolute w-[300px] rounded-2xl p-7 cursor-default transition-transform duration-300`}
                  style={{ background: s.bg, border: `1px solid ${s.border}`, left: s.left, top: "50%", transform: "translateY(-50%)", zIndex: s.zIndex, boxShadow: "0 25px 70px rgba(0,0,0,0.5), 0 4px 20px rgba(0,0,0,0.3)", animationDelay: s.delay }}
                >
                  <span className="text-white/20 text-xs font-bold tracking-widest mb-5 block">
                    ({String(i + 1).padStart(2, "0")})
                  </span>
                  <Stars count={item.stars} />
                  <p className={`text-gray-300 text-sm leading-[1.8] my-5 ${isRTL ? "text-right font-cairo" : ""}`}>{item.text}</p>
                  <div className="w-full h-px bg-white/[0.07] mb-5" />
                  <div className={`flex items-center gap-3 ${isRTL ? "flex-row-reverse" : ""}`}>
                    <Avatar initials={item.initials} color={item.avatarColor} size={38} />
                    <div className={isRTL ? "text-right" : ""}>
                      <p className="text-white text-sm font-semibold leading-tight">{item.name}</p>
                      <p className="text-white/40 text-xs mt-0.5">{item.role}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
