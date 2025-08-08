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
  property_type: string; // was "property"
  reserve_price_rs: string; // was "reserve_price"
  emd_rs: string; // was "emd"
  emd_last_date?: string;
  auction_open_date?: string; // was "auction_start_date"
  auction_close_date?: string; // was "auction_end_date"
  city: string;
  district: string;
  state: string;
  // add other fields as needed (see SQL table schema)
}


function parseRupee(str = "") {
  const cleaned = str.replace(/,/g, "");
  const num = parseFloat(cleaned);
  return isNaN(num) ? 0 : Math.round(num);
}

const PropertyCard: React.FC<Property> = ({
  property_id,
  bank_name,
  property_type,
  reserve_price_rs,
  emd_rs,
  emd_last_date,
  auction_open_date,
  auction_close_date,
  city,
  district,
  state,
  // ...other fields
}) => (
  <div className="border rounded-xl bg-white p-6 shadow ...">
    <span
      className={`absolute top-6 right-6 px-3 py-1 ...`}
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
    {/* Rest unchanged */}
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
    if (selectedType) query = query.eq('property', selectedType);

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
