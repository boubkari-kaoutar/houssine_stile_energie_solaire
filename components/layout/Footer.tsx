import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const tServices = useTranslations("services");
  const locale = useLocale();
  const isRTL = locale === "ar";

  const navLinks = [
    { href: "/", label: tNav("home") },
    { href: "/about", label: tNav("about") },
    { href: "/services", label: tNav("services") },
    { href: "/contact", label: tNav("contact") },
  ];

  const serviceLinks = [
    tServices("solar.title"),
    tServices("audit.title"),
    tServices("maintenance.title"),
    tServices("conseil.title"),
  ];

  return (
    <footer className="bg-[#1D1D1B] text-white">
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
        <div
          className={`grid md:grid-cols-4 gap-10 pb-10 border-b border-white/10 ${
            isRTL ? "text-right" : ""
          }`}
        >
          {/* Brand */}
          <div className="md:col-span-1">
            <Image
              src="/images/LOGO-PNG.png"
              alt="Sunset Energy"
              width={140}
              height={48}
              className="h-11 w-auto object-contain mb-5 brightness-0 invert"
            />
            <p className="text-gray-400 text-sm leading-relaxed">{t("tagline")}</p>

            {/* Social */}
            <div className={`flex gap-3 mt-6 ${isRTL ? "flex-row-reverse" : ""}`}>
              {/* Facebook */}
              <a
                href="#"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full bg-white/8 hover:bg-[#F8A700] hover:text-[#1D1D1B] flex items-center justify-center transition-all duration-200"
              >
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              {/* Instagram */}
              <a
                href="#"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-white/8 hover:bg-[#F8A700] hover:text-[#1D1D1B] flex items-center justify-center transition-all duration-200"
              >
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                </svg>
              </a>
              {/* LinkedIn */}
              <a
                href="#"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-full bg-white/8 hover:bg-[#F8A700] hover:text-[#1D1D1B] flex items-center justify-center transition-all duration-200"
              >
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-extrabold text-[#F8A700] mb-5 text-sm uppercase tracking-widest">
              {t("navigation")}
            </h4>
            <ul className="space-y-3">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-gray-400 hover:text-white text-sm transition-colors duration-200"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-extrabold text-[#F8A700] mb-5 text-sm uppercase tracking-widest">
              {t("services")}
            </h4>
            <ul className="space-y-3">
              {serviceLinks.map((s) => (
                <li key={s}>
                  <Link
                    href="/services"
                    className="text-gray-400 hover:text-white text-sm transition-colors duration-200"
                  >
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-extrabold text-[#F8A700] mb-5 text-sm uppercase tracking-widest">
              {t("contact")}
            </h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className={`flex items-start gap-3 ${isRTL ? "flex-row-reverse" : ""}`}>
                <svg className="w-4 h-4 mt-0.5 text-[#F8A700] flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span>123 Avenue Solaire, Casablanca</span>
              </li>
              <li className={`flex items-center gap-3 ${isRTL ? "flex-row-reverse" : ""}`}>
                <svg className="w-4 h-4 text-[#F8A700] flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.24l3-.08a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.18a16 16 0 0 0 5.91 5.91l1.65-1.65a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <span>+212 5 22 XX XX XX</span>
              </li>
              <li className={`flex items-center gap-3 ${isRTL ? "flex-row-reverse" : ""}`}>
                <svg className="w-4 h-4 text-[#F8A700] flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                <span>contact@sunset-energy.ma</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div
          className={`flex flex-col md:flex-row justify-between items-center gap-4 pt-8 text-gray-500 text-sm ${
            isRTL ? "md:flex-row-reverse" : ""
          }`}
        >
          <p>&copy; 2025 Sunset Energy. {t("rights")}</p>
          <p>{t("madeWith")}</p>
        </div>
      </div>
    </footer>
  );
}
