import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { supabase } from './supabaseClient';
import Footer from "@/components/Footer";
import HowItWorks from "@/components/HowItWorks";
import PropertyCard from "@/components/PropertyCard"; // adjust the import path

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
  // ...other fields as needed
}

function parseRupee(str = "") {
  const cleaned = str.replace(/,/g, "");
  const num = parseFloat(cleaned);
  return isNaN(num) ? 0 : Math.round(num);
}

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
