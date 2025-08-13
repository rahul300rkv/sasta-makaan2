import { Button } from "@/components/ui/button";
import React from 'react';
import { Building, MapPin, Phone, FileText } from "lucide-react";

interface PropertyCardProps {
  property_id: string;
  bank_name: string;
  branch_name?: string;
  state: string;
  district: string;
  reserve_price_rs: string;
  emd_rs: string;
  emd_last_date?: string;
  city: string;
  borrower_name?: string;
  owner_name?: string;
  ownership_type?: string;
  summary_description?: string;
  property_type?: string;
  property_sub_type?: string;
  type_of_title_deed?: string;
  status_of_possession?: string;
  auction_open_date?: string;
  auction_close_date?: string;
  sealed_bid_last_date?: string;
  sealed_bid_extended_date?: string;
  ADDRESS?: string;
  nearest_airport_railway_bus?: string;
  authorised_officer_detail?: string;
  media_urls?: string; // Supabase field with media URLs
  onViewDetails: () => void;
}

// Utility function to extract 10-digit mobile number from authorised_officer_detail
function extractPhone(authorizedOfficerDetail?: string): string | null {
  if (!authorizedOfficerDetail) return null;
  const match = authorizedOfficerDetail.match(/\b\d{10}\b/);
  return match ? match[0] : null;
}

// Split media into images and PDFs
function parseMedia(media_urls?: string) {
  if (!media_urls) return { images: [], pdfs: [] };
  const urls = media_urls.split('^').filter(Boolean);
  const images = urls.filter(u => u.match(/\.(jpg|jpeg|png|webp)$/i));
  const pdfs = urls.filter(u => u.match(/\.pdf$/i));
  return { images, pdfs };
}

const PropertyCard = (props: PropertyCardProps) => {
  const phoneNumber = extractPhone(props.authorised_officer_detail);
  const { images, pdfs } = parseMedia(props.media);

  return (
    <div className="
      bg-white dark:bg-neutral-900 
      rounded-xl overflow-hidden 
      shadow-card hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 
      border border-neutral-200 dark:border-neutral-800
      flex flex-col justify-between min-h-[380px]
    ">
      {images[0] && (
        <img src={images[0]} alt="Property" className="w-full h-40 object-cover"/>
      )}
      <div className="p-6 flex-1">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Building className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">{props.bank_name}</span>
          </div>
        </div>
        <span className="
          absolute top-4 right-4
          inline-block px-4 py-1 rounded-full
          bg-gradient-to-r from-purple-500 via-pink-500 to-red-400
          text-white font-bold shadow-lg text-sm tracking-wider
          border border-white/20
          transition-all
          dark:bg-gradient-to-r dark:from-violet-800 dark:via-pink-800 dark:to-red-600
          dark:text-yellow-300
        ">
          {props.property_type || "Property"}
        </span>
        <div className="flex items-center gap-2 mb-1 text-neutral-700 dark:text-neutral-300 text-sm">
          <MapPin className="w-4 h-4" />
          <span>{props.city}, {props.district}, {props.state}</span>
        </div>
        <div className="mb-0.5 dark:text-neutral-100"><b>Reserve Price:</b> ₹ {props.reserve_price_rs}</div>
        <div className="mb-0.5 dark:text-neutral-100"><b>EMD:</b> ₹ {props.emd_rs}</div>
        <div className="mb-0.5 dark:text-neutral-100"><b>EMD Last Date:</b> {props.emd_last_date || "TBA"}</div>
        <div className="mb-0.5 dark:text-neutral-100"><b>Auction Start:</b> {props.auction_open_date || "TBA"}</div>
        <div className="mb-1 dark:text-neutral-100"><b>Auction End:</b> {props.auction_close_date || "TBA"}</div>
      </div>
      <div className="p-6 pt-0 flex gap-2">
        <Button variant="outline" className="w-full" size="sm" onClick={props.onViewDetails}>
          View Details
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="px-3"
          onClick={() => {
            if (phoneNumber) window.open(`tel:${phoneNumber}`);
          }}
          disabled={!phoneNumber}
        >
          <Phone className="w-4 h-4" />
        </Button>
        {pdfs[0] && (
          <Button
            variant="outline"
            size="sm"
            className="px-3"
            onClick={() => window.open(pdfs[0], "_blank")}
          >
            <FileText className="w-4 h-4" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default PropertyCard;
