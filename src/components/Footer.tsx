import { useState } from "react";
import { Building2, MapPin } from "lucide-react";
import EMICalculator from "@/components/EMICalculator";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [showEMI, setShowEMI] = useState(false);

  const quickLinks = [
    { label: "Browse Properties", href: "#properties-list" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "EMI Calculator", action: () => setShowEMI(true) }, // use action instead of href
  ];

  return (
    <>
      <footer className="bg-neutral-900 text-white">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <Building2 className="w-8 h-8 text-primary" />
                <h3 className="text-xl font-bold">Sasta Makaan</h3>
              </div>
              <p className="text-neutral-300 mb-6 leading-relaxed">
                India's most trusted platform for bank auction properties. Discover premium 
                investment opportunities with transparent bidding and secure transactions.
              </p>
            </div>
            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-3">
  {quickLinks.map((link, index) => (
    <li key={index}>
      {"action" in link ? (
        <button
          type="button"
          className="text-neutral-300 hover:text-white transition-colors"
          onClick={link.action}
        >
          {link.label}
        </button>
      ) : (
        <a
          href={link.href}
          className="text-neutral-300 hover:text-white transition-colors"
          onClick={e => {
            if (link.href.startsWith('#')) {
              e.preventDefault();
              const target = document.getElementById(link.href.replace('#', ''));
              if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
              } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }
          }}
        >
          {link.label}
        </a>
      )}
    </li>
  ))}
</ul>

            </div>
            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div className="text-neutral-300">
                    <p>Sasta Makaan Pvt. Ltd.</p>
                    <p>Sector 44, Gurgaon</p>
                    <p>Haryana 122003, India</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Bottom Footer */}
        <div className="border-t border-neutral-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-neutral-400 text-sm">
                © {currentYear} Sasta Makaan. All rights reserved.
              </div>
            </div>
          </div>
        </div>
      </footer>
      <EMICalculator show={showEMI} onClose={() => setShowEMI(false)} />
    </>
  );
};

export default Footer;
