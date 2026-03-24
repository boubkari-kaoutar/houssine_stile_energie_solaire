import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import ContactContent from "@/components/contact/ContactContent";

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <ContactContent />
      <Footer />
      <WhatsAppButton />
    </>
  );
}
