import React from "react";
import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/HowItWorks";
import WhyBuySection from "@/components/WhyBuySection";
import LeadCaptureSection from "@/components/LeadCaptureSection";
import Footer from "@/components/Footer";
import { Helmet } from 'react-helmet';


const Index = () => {
  return (
    <>
    <Helmet>
       <title>Bank Auction Properties in India – Buy Homes at 20-40% Off | Sasta Makaan</title>
      <meta name="description" content="Discover and bid on bank auction properties, flats, houses, and commercial real estate in India. Sasta Makaan makes it easy to find your dream property." />
      <meta name="keywords" content="bank auction properties in India, bank auction, SBI e-auction homes, property under 20 lakhs in India, NPA properties for sale" />

      {/* Canonical URL */}
      <link rel="canonical" href="https://sasta-makaan2.vercel.app/" />

          
    </Helmet>
    <div className="min-h-screen bg-background text-foreground transition-colors">
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
    </>
  );
};

export default Index;
