import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { supabase } from './supabaseClient';
import Footer from "@/components/Footer";
import Modal from "@/components/YourModal";
import HowItWorks from "@/components/HowItWorks";
import PropertyCard from "@/components/PropertyCard";
import { Link } from "react-router-dom";
function parseRupee(str = "") {
  const cleaned = str.replace(/,/g, "");
  const num = parseFloat(cleaned);
  return isNaN(num) ? 0 : Math.round(num);
}
interface Property {
  property_id: string;
  bank_name: string;
  branch_name?: string;
  property_type?: string;
  reserve_price_rs: string;
  emd_rs: string;
  emd_last_date?: string;
  auction_open_date?: string;
  auction_close_date?: string;
  city: string;
  district: string;
  state: string;
  borrower_name?: string;
  owner_name?: string;
  ownership_type?: string;
  summary_description?: string;
  property_sub_type?: string;
  type_of_title_deed?: string;
  status_of_possession?: string;
  sealed_bid_last_date?: string;
  sealed_bid_extended_date?: string;
  ADDRESS?: string;
  nearest_airport_railway_bus?: string;
  authorised_officer_detail?: string;
}

const PropertyList: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalProperty, setModalProperty] = useState<Property | null>(null);

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

  const openModal = (property: Property) => {
    setModalProperty(property);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalProperty(null);
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-neutral-50">
      <div className="max-w-7xl mx-auto flex items-center p-1">
       <Link to="/">
        <img
          src="/favicon.png"
          alt="Logo"
          className="h-16 w-auto cursor-pointer"
        />
      </Link>
      </div>
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
              <PropertyCard key={property.property_id} {...property} onViewDetails={() => openModal(property)} />
            ))}
          </div>
        )}
      </div>
      <Modal isOpen={modalOpen} onClose={closeModal} title="Property Details">
        {modalProperty && (
        
        <div className="
  modal-content 
  bg-white dark:bg-neutral-900
  text-neutral-900 dark:text-neutral-100
  rounded-xl shadow-lg
  relative
">
  
            
            <div><b>Bank:</b> {modalProperty.bank_name}</div>
            <div><b>Branch:</b> {modalProperty.branch_name}</div>
            <div><b>Type:</b> {modalProperty.property_type}</div>
            <div><b>Reserve Price:</b> ₹ {modalProperty.reserve_price_rs}</div>
            <div><b>EMD:</b> ₹ {modalProperty.emd_rs}</div>
            <div><b>EMD Last Date:</b> {modalProperty.emd_last_date || "TBA"}</div>
            <div><b>Auction Start:</b> {modalProperty.auction_open_date || "TBA"}</div>
            <div><b>Auction End:</b> {modalProperty.auction_close_date || "TBA"}</div>
            <div><b>Sealed Bid Last Date:</b> {modalProperty.sealed_bid_last_date || "TBA"}</div>
            <div><b>Sealed Bid Extended Date:</b> {modalProperty.sealed_bid_extended_date || "TBA"}</div>
            <div><b>Borrower Name:</b> {modalProperty.borrower_name}</div>
            <div><b>Owner Name:</b> {modalProperty.owner_name}</div>
            <div><b>Ownership Type:</b> {modalProperty.ownership_type}</div>
            <div><b>Summary Description:</b> {modalProperty.summary_description}</div>
            <div><b>Property Sub Type:</b> {modalProperty.property_sub_type}</div>
            <div><b>Type of Title Deed:</b> {modalProperty.type_of_title_deed}</div>
            <div><b>Status of Possession:</b> {modalProperty.status_of_possession}</div>
            <div><b>Address:</b> {modalProperty.ADDRESS}</div>
            <div><b>Nearest Airport/Railway/Bus:</b> {modalProperty.nearest_airport_railway_bus}</div>
            <div><b>Location:</b> {modalProperty.city}, {modalProperty.district}, {modalProperty.state}</div>
          </div>
        )}
      </Modal>
      <section id="how-it-works">
        <HowItWorks />
      </section>
      <Footer />
    </section>
  );
};

export default PropertyList;
