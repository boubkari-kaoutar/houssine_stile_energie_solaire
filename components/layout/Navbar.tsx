"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import gsap from "gsap";

export default function Navbar() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const isRTL = locale === "ar";

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const mobileRef = useRef<HTMLDivElement>(null);

  const links = [
    { href: "/", label: t("home") },
    { href: "/about", label: t("about") },
    { href: "/services", label: t("services") },
    { href: "/contact", label: t("contact") },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        navRef.current,
        { opacity: 0, y: -16 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power2.out", delay: 0.1 }
      );
    });
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!mobileRef.current) return;
    gsap.to(mobileRef.current, {
      height: mobileOpen ? "auto" : 0,
      opacity: mobileOpen ? 1 : 0,
      duration: 0.3,
      ease: "power2.inOut",
    });
  }, [mobileOpen]);

  const switchLocale = (next: string) => {
    router.replace(pathname, { locale: next });
  };

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm py-2"
          : "bg-[#1D1D1B]/60 backdrop-blur-sm border-b border-white/5 py-4"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between gap-8">

        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <Image
            src="/images/LOGO-PNG.png"
            alt="Sunset Energy"
            width={140}
            height={48}
            className="h-11 w-auto object-contain"
            priority
          />
        </Link>

        {/* Desktop links */}
        <ul
          className={`hidden md:flex items-center gap-8 ${isRTL ? "flex-row-reverse" : ""}`}
        >
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className={`nav-link font-semibold text-[15px] transition-colors duration-200 ${
                  isActive(l.href)
                    ? "text-[#F8A700] active"
                    : scrolled
                    ? "text-[#1D1D1B] hover:text-[#F8A700]"
                    : "text-white/90 hover:text-[#F8A700]"
                }`}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right actions */}
        <div className={`hidden md:flex items-center gap-3 ${isRTL ? "flex-row-reverse" : ""}`}>
          {/* Language switcher */}
          <div className={`flex items-center rounded-full p-1 gap-1 ${scrolled ? "bg-gray-100" : "bg-white/10"}`}>
            <button
              onClick={() => switchLocale("fr")}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all duration-200 ${
                locale === "fr"
                  ? "bg-[#F8A700] text-[#1D1D1B] shadow-sm"
                  : scrolled ? "text-gray-500 hover:text-[#1D1D1B]" : "text-white/70 hover:text-white"
              }`}
            >
              FR
            </button>
            <button
              onClick={() => switchLocale("ar")}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all duration-200 ${
                locale === "ar"
                  ? "bg-[#F8A700] text-[#1D1D1B] shadow-sm"
                  : scrolled ? "text-gray-500 hover:text-[#1D1D1B]" : "text-white/70 hover:text-white"
              }`}
            >
              AR
            </button>
          </div>

          {/* CTA */}
          <Link
            href="/contact"
            className="bg-[#F8A700] hover:bg-[#D48F00] text-[#1D1D1B] font-bold px-5 py-2.5 rounded-full text-sm transition-all duration-200 hover:scale-105 shadow-sm"
          >
            {t("cta")}
          </Link>
        </div>

        {/* Hamburger */}
        <button
          className="md:hidden flex flex-col gap-[5px] p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
        >
          <span
            className={`block h-[2px] w-6 rounded-full transition-all duration-300 ${
              scrolled ? "bg-[#1D1D1B]" : "bg-white"
            } ${mobileOpen ? "rotate-45 translate-y-[7px]" : ""}`}
          />
          <span
            className={`block h-[2px] w-6 rounded-full transition-all duration-300 ${
              scrolled ? "bg-[#1D1D1B]" : "bg-white"
            } ${mobileOpen ? "opacity-0 scale-x-0" : ""}`}
          />
          <span
            className={`block h-[2px] w-6 rounded-full transition-all duration-300 ${
              scrolled ? "bg-[#1D1D1B]" : "bg-white"
            } ${mobileOpen ? "-rotate-45 -translate-y-[7px]" : ""}`}
          />
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        ref={mobileRef}
        className="md:hidden overflow-hidden h-0 opacity-0 bg-white border-t border-gray-100"
      >
        <ul className="px-6 py-5 flex flex-col gap-4">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                onClick={() => setMobileOpen(false)}
                className={`block font-semibold text-base transition-colors ${
                  isActive(l.href) ? "text-[#F8A700]" : "text-[#1D1D1B]"
                }`}
              >
                {l.label}
              </Link>
            </li>
          ))}
          <li className="pt-2 border-t border-gray-100 flex items-center gap-3">
            <div className="flex items-center bg-gray-100 rounded-full p-1 gap-1">
              <button
                onClick={() => { switchLocale("fr"); setMobileOpen(false); }}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                  locale === "fr" ? "bg-[#F8A700] text-[#1D1D1B]" : "text-gray-500"
                }`}
              >
                FR
              </button>
              <button
                onClick={() => { switchLocale("ar"); setMobileOpen(false); }}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                  locale === "ar" ? "bg-[#F8A700] text-[#1D1D1B]" : "text-gray-500"
                }`}
              >
                AR
              </button>
            </div>
            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="bg-[#F8A700] text-[#1D1D1B] font-bold px-5 py-2 rounded-full text-sm"
            >
              {t("cta")}
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
