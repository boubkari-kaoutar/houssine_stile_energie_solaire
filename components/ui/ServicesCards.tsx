"use client";

import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";

export const SERVICE_CONFIG = [
  { key: "solar",       num: "01", iconColor: "#F8A700", borderColor: "rgba(248,167,0,0.35)",   glow: "rgba(248,167,0,0.15)" },
  { key: "audit",       num: "02", iconColor: "#17A73D", borderColor: "rgba(23,167,61,0.35)",   glow: "rgba(23,167,61,0.12)" },
  { key: "maintenance", num: "03", iconColor: "#8899FF", borderColor: "rgba(136,153,255,0.35)", glow: "rgba(136,153,255,0.12)" },
  { key: "conseil",     num: "04", iconColor: "#F86400", borderColor: "rgba(248,100,0,0.35)",   glow: "rgba(248,100,0,0.12)" },
] as const;

export default function ServicesCards({ animClass = "" }: { animClass?: string }) {
  const t      = useTranslations("services");
  const locale = useLocale();
  const isRTL  = locale === "ar";

  const CARDS = [
    {
      cfg: SERVICE_CONFIG[0],
      profile:     locale === "ar" ? "أفراد / شركات"        : "Particulier · Entreprise",
      saving:      "–70%",
      savingLabel: locale === "ar" ? "توفير في الفاتورة"    : "sur la facture",
      delay:       locale === "ar" ? "3–7 أيام"             : "3–7 jours",
      warranty:    locale === "ar" ? "ضمان 25 سنة"          : "Garantie 25 ans",
      roi:         locale === "ar" ? "عائد خلال 4–6 سنوات"  : "ROI en 4–6 ans",
    },
    {
      cfg: SERVICE_CONFIG[1],
      profile:     locale === "ar" ? "كل عميل جديد"         : "Tout nouveau client",
      saving:      "100%",
      savingLabel: locale === "ar" ? "تشخيص مجاني"          : "diagnostic offert",
      delay:       locale === "ar" ? "1–2 أيام"             : "1–2 jours",
      warranty:    locale === "ar" ? "تقرير مفصل"           : "Rapport détaillé",
      roi:         locale === "ar" ? "فوري"                 : "Immédiat",
    },
    {
      cfg: SERVICE_CONFIG[2],
      profile:     locale === "ar" ? "كل عملاء صنست"        : "Clients Sunset Energy",
      saving:      "+5%",
      savingLabel: locale === "ar" ? "أداء إضافي"           : "de performance",
      delay:       locale === "ar" ? "24 ساعة"              : "Sous 24h",
      warranty:    locale === "ar" ? "مراقبة مستمرة"        : "Monitoring continu",
      roi:         locale === "ar" ? "مستمر"                : "Continu",
    },
    {
      cfg: SERVICE_CONFIG[3],
      profile:     locale === "ar" ? "أفراد / فنادق"        : "Particulier · Hôtel",
      saving:      "–30%",
      savingLabel: locale === "ar" ? "تحسين طاقي"           : "efficacité habitat",
      delay:       locale === "ar" ? "2–5 أيام"             : "2–5 jours",
      warranty:    locale === "ar" ? "5 سنوات"              : "5 ans équipements",
      roi:         locale === "ar" ? "3–4 سنوات"            : "ROI en 3–4 ans",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {CARDS.map(({ cfg, profile, saving, savingLabel, delay, warranty, roi }) => (
        <div
          key={cfg.key}
          className={`${animClass} group relative flex flex-col rounded-2xl border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.05] transition-all duration-300 hover:-translate-y-1 overflow-hidden`}
          onMouseEnter={e => (e.currentTarget.style.boxShadow = `0 0 30px ${cfg.glow}`)}
          onMouseLeave={e => (e.currentTarget.style.boxShadow = "none")}
        >
          {/* Top accent */}
          <div className="h-[3px] w-full" style={{ backgroundColor: cfg.iconColor }} />

          <div className="flex flex-col flex-1 p-6 gap-5">
            {/* Number + title */}
            <div>
              <span className="text-xs font-bold uppercase tracking-widest" style={{ color: cfg.iconColor }}>{cfg.num}</span>
              <h3 className={`text-white font-extrabold text-lg leading-tight mt-1 ${isRTL ? "text-right font-cairo" : ""}`}>
                {t(`${cfg.key}.title`)}
              </h3>
              <p className="text-gray-500 text-xs mt-1">{profile}</p>
            </div>

            {/* Big metric */}
            <div className="rounded-xl px-4 py-4 text-center"
              style={{ backgroundColor: `${cfg.iconColor}10`, border: `1px solid ${cfg.borderColor}` }}>
              <div className="text-4xl font-extrabold leading-none" style={{ color: cfg.iconColor }}>{saving}</div>
              <div className="text-xs text-gray-400 mt-1">{savingLabel}</div>
            </div>

            {/* Specs */}
            <ul className="flex flex-col gap-3 flex-1">
              {[
                { label: delay,    icon: <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> },
                { label: warranty, icon: <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> },
                { label: roi,      icon: <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg> },
              ].map((item, ii) => (
                <li key={ii} className={`flex items-center gap-3 text-sm text-gray-300 ${isRTL ? "flex-row-reverse" : ""}`}>
                  <span className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${cfg.iconColor}15`, color: cfg.iconColor }}>
                    {item.icon}
                  </span>
                  {item.label}
                </li>
              ))}
            </ul>

            {/* CTA */}
            <Link href="/contact"
              className="mt-2 w-full text-center py-3 rounded-xl text-sm font-bold uppercase tracking-wider transition-all duration-200 border"
              style={{ color: cfg.iconColor, borderColor: cfg.borderColor, backgroundColor: `${cfg.iconColor}08` }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.backgroundColor = cfg.iconColor; (e.currentTarget as HTMLElement).style.color = "#1D1D1B"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.backgroundColor = `${cfg.iconColor}08`; (e.currentTarget as HTMLElement).style.color = cfg.iconColor; }}
            >
              {locale === "ar" ? "اطلب عرضاً" : "Demander un devis"}
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
