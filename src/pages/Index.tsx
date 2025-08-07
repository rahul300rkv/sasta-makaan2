import HeroSection from "@/components/HeroSection";

import HowItWorks from "@/components/HowItWorks";
import WhyBuySection from "@/components/WhyBuySection";
import LeadCaptureSection from "@/components/LeadCaptureSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
   <div className="min-h-screen bg-background">
    <section id="properties-list">
  <HeroSection />
  </section>
  <section id="how-it-works">
     <HowItWorks />
  </section>
  <WhyBuySection />
  <LeadCaptureSection />
  <Footer />
</div>

  );
};

export default Index;
