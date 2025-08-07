import { Search, Gavel, Key, CheckCircle } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: Search,
      title: "Find",
      description: "Browse verified bank auction properties",
      details: "Search through our curated database of properties from leading banks. Use advanced filters to find properties that match your investment criteria and budget.",
      bgColor: "bg-primary/10",
      iconColor: "text-primary"
    },
    {
      icon: Gavel,
      title: "Bid",
      description: "Participate in transparent auctions",
      details: "Join live auctions with real-time bidding. Our platform ensures fair and transparent bidding process with complete legal documentation support.",
      bgColor: "bg-accent/10",
      iconColor: "text-accent"
    },
    {
      icon: Key,
      title: "Acquire",
      description: "Complete purchase with legal support",
      details: "Win the auction and complete your property acquisition with our end-to-end legal assistance. Get clear titles and immediate possession.",
      bgColor: "bg-success-green/10",
      iconColor: "text-success-green"
    }
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
            How It Works
          </h2>
          <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
            Simple, transparent, and secure process to acquire your dream property 
            through bank auctions in just three easy steps.
          </p>
        </div>
        
        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <div key={index} className="relative text-center group">
                {/* Connecting Line (Hidden on mobile) */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-16 left-1/2 w-full h-0.5 bg-gradient-to-r from-neutral-300 to-neutral-200 z-0" />
                )}
                
                {/* Step Content */}
                <div className="relative z-10">
                  {/* Icon Circle */}
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${step.bgColor} mb-6 mx-auto group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className={`w-8 h-8 ${step.iconColor}`} />
                  </div>
                  
                  {/* Step Number */}
                  <div className="inline-flex items-center justify-center w-8 h-8 bg-neutral-900 text-white rounded-full text-sm font-bold mb-4">
                    {index + 1}
                  </div>
                  
                  {/* Step Title */}
                  <h3 className="text-xl font-bold text-neutral-900 mb-3">
                    {step.title}
                  </h3>
                  
                  {/* Step Description */}
                  <p className="text-neutral-600 mb-4 font-medium">
                    {step.description}
                  </p>
                  
                  {/* Step Details */}
                  <p className="text-sm text-neutral-500 leading-relaxed">
                    {step.details}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Call to Action */}
        <div className="text-center mt-1">
          <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl p-8 md:p-12 max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-4">
              <CheckCircle className="w-6 h-6 text-success-green mr-2" />
              <span className="text-sm font-medium text-success-green">Trusted by 50,000+ Investors</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-4">
              Ready to Start Your Investment Journey?
            </h3>
            <p className="text-neutral-600 mb-6 max-w-2xl mx-auto">
              Join thousands of successful investors who have built their real estate portfolio 
              through our verified bank auction platform.
            </p>
<button
  className="bg-gradient-hero text-white px-8 py-3 rounded-lg font-medium hover:shadow-floating transition-all duration-300 transform hover:scale-105"
  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
>
  Browse Properties Now
</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;