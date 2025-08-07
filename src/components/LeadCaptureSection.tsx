import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bell, Mail, Phone, User, CheckCircle, Gift } from "lucide-react";

const LeadCaptureSection = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary to-primary/80">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-white">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Gift className="w-4 h-4" />
              Exclusive Access
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
              Get Notified About 
              <span className="text-accent-light block">Latest Auctions</span>
            </h2>
            
            <p className="text-lg text-white/90 mb-8 leading-relaxed">
              Be the first to know about new bank auction properties in your preferred locations. 
              Get instant alerts, exclusive deals, and expert insights delivered to your inbox.
            </p>
            
            {/* Benefits List */}
            <div className="space-y-3 mb-8">
              {[
                "Instant notifications for new properties",
                "Exclusive pre-auction access",
                "Market insights and pricing alerts",
                "Personalized property recommendations"
              ].map((benefit, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-accent-light flex-shrink-0" />
                  <span className="text-white/90">{benefit}</span>
                </div>
              ))}
            </div>
            
            {/* Trust Indicators */}
            <div className="flex items-center gap-6 text-sm text-white/80">
              
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>No Spam Guarantee</span>
              </div>
            </div>
          </div>
          
          {/* Right Form */}
          <div className="bg-white rounded-2xl p-8 shadow-floating">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-hero rounded-full flex items-center justify-center mx-auto mb-4">
                <Bell className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-neutral-900 mb-2">
                Start Your Journey Today
              </h3>
              <p className="text-neutral-600">
                Join many investors already receiving alerts
              </p>
            </div>
            
            <form className="space-y-4">
              {/* Name Input */}
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
                <Input 
                  type="text"
                  placeholder="Full Name"
                  className="pl-10 h-12 border-neutral-200 focus:border-primary"
                />
              </div>
              
              {/* Email Input */}
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
                <Input 
                  type="email"
                  placeholder="Email Address"
                  className="pl-10 h-12 border-neutral-200 focus:border-primary"
                />
              </div>
              
              {/* Phone Input */}
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
                <Input 
                  type="tel"
                  placeholder="Phone Number"
                  className="pl-10 h-12 border-neutral-200 focus:border-primary"
                />
              </div>
              
              {/* Submit Button */}
              <Button variant="hero" size="xl" className="w-full h-12 text-base">
                <Bell className="w-5 h-5 mr-2" />
                Get Instant Alerts
              </Button>
              
              {/* Privacy Note */}
              <p className="text-xs text-neutral-500 text-center leading-relaxed">
                By submitting this form, you agree to receive notifications and updates. 
                Your information is 100% secure and will never be shared with third parties.
              </p>
            </form>
            
            {/* Social Proof */}
            <div className="mt-6 pt-6 border-t border-neutral-100">
              <div className="flex items-center justify-center gap-4 text-sm text-neutral-600">
                <div className="text-center">
                  <div className="font-bold text-neutral-900">50K+</div>
                  <div>Subscribers</div>
                </div>
                <div className="w-px h-8 bg-neutral-200"></div>
                <div className="text-center">
                  <div className="font-bold text-neutral-900">4.9★</div>
                  <div>Rating</div>
                </div>
                <div className="w-px h-8 bg-neutral-200"></div>
                <div className="text-center">
                  <div className="font-bold text-neutral-900">24/7</div>
                  <div>Support</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeadCaptureSection;