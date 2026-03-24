import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import AboutContent from "@/components/about/AboutContent";

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <AboutContent />
      <Footer />
      <WhatsAppButton />
    </>
  );
}
