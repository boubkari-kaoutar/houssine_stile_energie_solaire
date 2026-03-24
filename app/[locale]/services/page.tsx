import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import ServicesContent from "@/components/services/ServicesContent";
import CTABanner from "@/components/home/CTABanner";

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <ServicesContent />
      <CTABanner />
      <Footer />
      <WhatsAppButton />
    </>
  );
}
