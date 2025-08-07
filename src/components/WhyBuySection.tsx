import { TrendingUp, Shield, FileCheck, Clock, DollarSign, Users, Award, CheckCircle } from "lucide-react";

const WhyBuySection = () => {
  const benefits = [
    {
      icon: TrendingUp,
      title: "High ROI Potential",
      description: "Properties sold at 20-40% below market value",
      detail: "Bank auction properties typically offer significant discounts compared to market rates, providing excellent investment returns."
    },
    {
      icon: Shield,
      title: "Legal Security",
      description: "Clear titles with complete documentation",
      detail: "All properties come with verified legal documents and clear titles, ensuring secure and hassle-free ownership transfer."
    },
    {
      icon: FileCheck,
      title: "Transparent Process",
      description: "Open bidding with no hidden charges",
      detail: "Complete transparency in the auction process with detailed property reports and fair bidding practices."
    },
    {
      icon: Clock,
      title: "Quick Possession",
      description: "Immediate possession after payment",
      detail: "Fast-track property acquisition with minimal paperwork and quick possession, unlike traditional property purchases."
    },
    {
      icon: DollarSign,
      title: "Lower Investment",
      description: "Minimal EMD and processing fees",
      detail: "Start your investment journey with lower earnest money deposits and transparent fee structure."
    },
    {
      icon: Users,
      title: "Expert Support",
      description: "Professional guidance throughout",
      detail: "Our team of legal and real estate experts provide end-to-end support for a smooth transaction experience."
    }
  ];

  const stats = [
    { value: "₹500Cr+", label: "Properties Listed" },
    { value: "1500+", label: "Happy Investors" },
    { value: "35%", label: "Average Savings" },
    { value: "99.5%", label: "Success Rate" }
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-neutral-50 to-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Award className="w-4 h-4" />
            Why Choose Bank Auctions
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
            Why Buy Bank Auction Properties?
          </h2>
          <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
            Discover the advantages of investing in bank auction properties and why thousands of 
            investors trust our platform for their real estate investment needs.
          </p>
        </div>
        
        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-16">
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon;
            return (
              <div 
                key={index} 
                className="bg-white rounded-xl p-6 shadow-card hover:shadow-floating transition-all duration-300 transform hover:-translate-y-1 border border-neutral-200 group"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <IconComponent className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-neutral-600 text-sm font-medium mb-3">
                      {benefit.description}
                    </p>
                    <p className="text-xs text-neutral-500 leading-relaxed">
                      {benefit.detail}
                    </p>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-neutral-100">
                  <div className="flex items-center text-xs text-accent font-medium">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Verified Benefit
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Statistics */}
        <div className="bg-gradient-hero rounded-2xl p-8 md:p-12 text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
            Trusted Investment Platform
          </h3>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of successful investors who have built their real estate portfolio with us
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-white/80">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Trust Indicators */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-8 flex-wrap justify-center text-sm text-neutral-500">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-success-green" />
              <span>100% Secure Transactions</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-success-green" />
              <span>RERA Approved</span>
            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyBuySection;