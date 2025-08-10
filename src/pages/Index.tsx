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
        <title>Property Auctions & Real Estate | Sasta Makaan</title>
      <meta name="description" content="Discover and bid on bank auction properties, flats, houses, and commercial real estate in India. Sasta Makaan makes it easy to find your dream property." />
      <meta name="keywords" content="bank auction, property auction, real estate India, buy house, auction flats, commercial property, Sasta Makaan" />

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
