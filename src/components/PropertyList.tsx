import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { supabase } from './supabaseClient'; // adjust the import path
import Footer from "@/components/Footer";
import HowItWorks from "@/components/HowItWorks";

const typeColors: Record<string, string> = {
  RESIDENTIAL: "bg-blue-100 text-blue-800",
  COMMERCIAL: "bg-green-100 text-green-800",
  AGRICULTURAL: "bg-lime-100 text-lime-800",
  INDUSTRIAL: "bg-yellow-100 text-yellow-800",
  OTHERS: "bg-gray-100 text-gray-800"
};

interface Property {
  property_id: string;
  bank_name: string;
  branch_name?: string;
  property_type: string;
  reserve_price_rs: string;
  emd_rs: string;
  emd_last_date?: string;
  auction_open_date?: string;
  auction_close_date?: string;
  city: string;
  district: string;
  state: string;
  // add additional fields if needed
}

function parseRupee(str = "") {
  const cleaned = str.replace(/,/g, "");
  const num = parseFloat(cleaned);
  return isNaN(num) ? 0 : Math.round(num);
}

const PropertyCard: React.FC<Property> = ({
  property_id,
  bank_name,
  branch_name,
  property_type,
  reserve_price_rs,
  emd_rs,
  emd_last_date,
  auction_open_date,
  auction_close_date,
  city,
  district,
  state,
}) => (
  <div className="border rounded-xl bg-white p-6 shadow hover:shadow-lg transition flex flex-col min-h-[340px] relative">
    <span
      className={`absolute top-6 right-6 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${typeColors[property_type] || typeColors.OTHERS}`}
    >
      {property_type}
    </span>
    <div>
      <div className="mb-2"><b>Bank:</b> {bank_name}</div>
      <div className="mb-2"><b>Reserve Price:</b> {reserve_price_rs}</div>
      <div className="mb-2"><b>EMD:</b> {emd_rs}</div>
      <div className="mb-2"><b>EMD Last Date:</b> {emd_last_date || 'TBA'}</div>
      <div className="mb-2"><b>Auction Start:</b> {auction_open_date || 'TBA'}</div>
      <div className="mb-2"><b>Auction End:</b> {auction_close_date || 'TBA'}</div>
      <div><b>Location:</b> {city}, {district}, {state}</div>
    </div>
    <div className="mt-6 flex gap-2">
      <Link to={`/property/${property_id}`} className="flex-1">
        <button className="w-full py-2 rounded-lg bg-primary text-white font-semibold hover:bg-primary/90 transition">
          View Details
        </button>
      </Link>
      <button
        className="border border-primary text-primary py-2 rounded-lg font-medium flex items-center justify-center gap-1 hover:bg-primary hover:text-white transition px-3"
        onClick={() => window.open('tel:1800123456')}
        title="Call Bank"
      >
        <svg viewBox="0 0 24 24" width={18} height={18} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92V19a2 2 0 0 1-2.18 2A19.72 19.72 0 0 1 3 5.18 2 2 0 0 1 5 3h2.09a1 1 0 0 1 1 .75
                12.05 12.05 0 0 0 .57 1.73 1 1 0 0 1-.23 1.09L7.12 8.12a16 16 0 0 0 8.76 8.76l1.55-1.55a1 1 0 0 1 
                1.09-.23 12.05 12.05 0 0 0 1.73.57 1 1 0 0 1 .75 1V19z"/>
        </svg>
      </button>
    </div>
  </div>
);

const PropertyList: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();

  const selectedState = searchParams.get('state') || '';
  const selectedBank = searchParams.get('bank') || '';
  const selectedType = searchParams.get('type') || '';
  const selectedBudget = searchParams.get('budget') || '';

  useEffect(() => {
    setLoading(true);
    let query = supabase.from('properties').select('*');
    if (selectedState) query = query.eq('state', selectedState);
    if (selectedBank) query = query.eq('bank_name', selectedBank);
    if (selectedType) query = query.eq('property_type', selectedType);

    query.then(({ data, error }) => {
      let filtered = data as Property[] || [];
      if (selectedBudget) {
        if (selectedBudget.endsWith('+')) {
          const min = parseInt(selectedBudget.slice(0, -1), 10);
          filtered = filtered.filter(p => parseRupee(p.reserve_price_rs) >= min);
        } else if (selectedBudget.includes('-')) {
          const [min, max] = selectedBudget.split('-').map(x => parseInt(x, 10));
          filtered = filtered.filter(p => {
            const price = parseRupee(p.reserve_price_rs);
            return price >= min && price <= max;
          });
        }
      }
      setProperties(filtered);
      setLoading(false);
    })
    .catch(() => setLoading(false));
  }, [selectedState, selectedBank, selectedType, selectedBudget]);

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-neutral-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
            All Auction Properties
          </h2>
          <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
            Explore all available bank auction properties across India. Use filters to find your perfect match!
          </p>
        </div>
        {loading ? (
          <div className="flex justify-center items-center min-h-[250px] text-lg text-neutral-600">
            Loading...
          </div>
        ) : properties.length === 0 ? (
          <div className="flex justify-center items-center min-h-[250px] text-lg text-neutral-500">
            No properties listed.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {properties.map(property => (
              <PropertyCard key={property.property_id} {...property} />
            ))}
          </div>
        )}
      </div>
      <section id="how-it-works">
        <HowItWorks />
      </section>
      <Footer />
    </section>
  );
};

export default PropertyList;
