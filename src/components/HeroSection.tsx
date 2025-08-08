import { useTheme } from "@/theme/ThemeProvider";
import React, { useState } from "react";
import {
  MapPin, Landmark, IndianRupee, Search, Home,
  Leaf, Factory, Layers, ListFilter, Banknote
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import heroImage from "@/assets/hero-real-estate.jpg";

const STATES = [
  "ANDHRA PRADESH", "ASSAM", "BIHAR", "CHANDIGARH", "CHHATTISGARH",
  "DADRA & NAGAR HAVELI", "DAMAN & DIU", "DELHI", "GOA", "GUJARAT",
  "HARYANA", "HIMACHAL PRADESH", "J& K", "JHARKHAND", "KARNATAKA", "KERALA",
  "MADHYA PRADESH", "MAHARASHTRA", "MANIPUR", "MEGHALAYA", "MIZORAM",
  "NAGALAND", "NCT OF DELHI", "ODISHA", "PUDUCHERRY", "PUNJAB", "RAJASTHAN",
  "SIKKIM", "TAMIL NADU", "TELANGANA", "TRIPURA", "UTTAR PRADESH",
  "UTTARAKHAND", "WEST BENGAL", "ANDAMAN & NICOBAR" , "ARUNACHAL PRADESH",
  "LAKSHADWEEP", "LADAKH"
];

const BANKS = [
  "BANK OF BARODA", "BANK OF INDIA", "BANK OF MAHARASHTRA",
  "CENTRAL BANK OF INDIA", "INDIAN BANK", "INDIAN OVERSEAS BANK",
  "PUNJAB NATIONAL BANK", "STATE BANK OF INDIA", "UCO BANK", "UNION BANK OF INDIA"
];

const PROPERTY_TYPES = [
  { value: "", label: "All Properties", icon: ListFilter },
  { value: "P1", label: "RESIDENTIAL", icon: Home },
  { value: "P2", label: "COMMERCIAL", icon: Landmark },
  { value: "P3", label: "AGRICULTURAL", icon: Leaf },
  { value: "P4", label: "INDUSTRIAL", icon: Factory },
  { value: "P5", label: "OTHERS", icon: Layers }
];

const HeroSection = () => {
  const [selectedState, setSelectedState] = useState("");
  const [selectedBank, setSelectedBank] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedBudget, setSelectedBudget] = useState("");
  const navigate = useNavigate();
  const TypeIcon = PROPERTY_TYPES.find(t => t.value === selectedType)?.icon || ListFilter;

  const handleSearch = e => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (selectedState) params.set("state", selectedState);
    if (selectedBank) params.set("bank", selectedBank);
    if (selectedType) params.set("type", selectedType);
    if (selectedBudget) params.set("budget", selectedBudget);
    navigate(`/properties?${params.toString()}`);
  };

  return (
    <section className="relative bg-background min-h-[500px] flex items-center justify-center overflow-hidden">
      <img src={heroImage} alt="Real Estate Auctions Hero"
        className="absolute inset-0 w-full h-full object-cover opacity-10 z-0 pointer-events-none"/>
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-neutral-50 to-neutral-100" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight text-neutral-900">
            Properties for the{" "}
            <span className="block text-primary italic font-normal">
              Global Indian!
            </span>
          </h1>
          <p className="text-lg md:text-xl text-neutral-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Discover premium bank auction properties across India at unbeatable prices
          </p>
          <form
            className="bg-white rounded-2xl p-6 max-w-4xl mx-auto shadow-floating border mb-4"
            onSubmit={handleSearch}
          >
            <div className="flex flex-wrap gap-3 items-center justify-center">
              {/* State */}
              <div className="flex items-center gap-2 bg-white border rounded-xl px-4 py-3 min-w-[200px] flex-1">
                <MapPin className="w-5 h-5 text-primary" />
                <select className="outline-none bg-transparent text-neutral-900 flex-1"
                  value={selectedState}
                  onChange={e => setSelectedState(e.target.value)}
                >
                  <option value="">Select State</option>
                  {STATES.map(state => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
              </div>
              {/* Bank */}
              <div className="flex items-center gap-2 bg-white border rounded-xl px-4 py-3 min-w-[180px]">
                <Banknote className="w-5 h-5 text-neutral-600" />
                <select className="outline-none bg-transparent text-neutral-900"
                  value={selectedBank}
                  onChange={e => setSelectedBank(e.target.value)}
                >
                  <option value="">Select Bank</option>
                  {BANKS.map(bank => (
                    <option key={bank} value={bank}>{bank}</option>
                  ))}
                </select>
              </div>
              {/* Type */}
              <div className="flex items-center gap-2 bg-white border rounded-xl px-4 py-3 min-w-[190px]">
                <TypeIcon className="w-5 h-5 text-neutral-600" />
                <select
                  className="outline-none bg-transparent text-neutral-900 flex-1"
                  value={selectedType}
                  onChange={e => setSelectedType(e.target.value)}
                >
                  {PROPERTY_TYPES.map(type => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
              </div>
              {/* Budget */}
              <div className="flex items-center gap-2 bg-white border rounded-xl px-4 py-3 min-w-[160px]">
                <IndianRupee className="w-5 h-5 text-neutral-600" />
                <select className="outline-none bg-transparent text-neutral-900"
                  value={selectedBudget}
                  onChange={e => setSelectedBudget(e.target.value)}
                >
                  <option value="">Budget</option>
                  <option value="500000-1000000">₹5L - ₹10L</option>
                  <option value="1000000-5000000">₹10L - ₹50L</option>
                  <option value="5000000-10000000">₹50L - ₹1Cr</option>
                  <option value="10000000+">₹1Cr+</option>
                </select>
              </div>
              <Button type="submit" size="lg"
                className="bg-primary hover:bg-primary/90 text-white px-8 flex gap-2 items-center"
                onClick={handleSearch}
  disabled={
    (!selectedState || selectedState === "Select State") &&
    (!selectedBank || selectedBank === "Select Bank")
  }
              >
                <Search className="w-5 h-5" />
                Search
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
