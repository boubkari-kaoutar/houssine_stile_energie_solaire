import dynamic from "next/dynamic";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import Hero from "@/components/home/Hero";

const ServicesPreview = dynamic(() => import("@/components/home/ServicesPreview"));
const WhyUs          = dynamic(() => import("@/components/home/WhyUs"));
const Testimonials   = dynamic(() => import("@/components/home/Testimonials"));
const CTABanner      = dynamic(() => import("@/components/home/CTABanner"));

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ServicesPreview />
        <WhyUs />
        <Testimonials />
        <CTABanner />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
