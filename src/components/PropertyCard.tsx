import { Button } from "@/components/ui/button";
import React, { useState } from 'react';
import Modal from "@/components/YourModal";
import { Building, MapPin, Phone } from "lucide-react";

interface PropertyCardProps {
  property_id: string;
  bank_name: string;
  branch_name: string;
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
  address?: string;
  nearest_airport_railway_bus?: string;
  authorised_officer_detail?: string;
}

const PropertyCard = (props: PropertyCardProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-card hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border flex flex-col justify-between min-h-[320px]">
      <div className="p-6 flex-1">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Building className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">{props.bank_name}</span>
          </div>
        </div>
        <h3 className="text-lg font-semibold text-neutral-900 mb-2 line-clamp-2">{props.property_type || "Property"}</h3>
        <div className="flex items-center gap-2 mb-1 text-neutral-700 text-sm">
          <MapPin className="w-4 h-4" />
          <span>{props.city}, {props.district}, {props.state}</span>
        </div>
        <div className="mb-0.5"><b>Reserve Price:</b> ₹ {props.reserve_price_rs}</div>
        <div className="mb-0.5"><b>EMD:</b> ₹ {props.emd_rs}</div>
        <div className="mb-0.5"><b>EMD Last Date:</b> {props.emd_last_date || "TBA"}</div>
        <div className="mb-0.5"><b>Auction Start:</b> {props.auction_open_date || "TBA"}</div>
        <div className="mb-1"><b>Auction End:</b> {props.auction_close_date || "TBA"}</div>
      </div>
      <div className="p-6 pt-0 flex gap-2">
        <Button onClick={() => { setOpen(true); console.log('Open:', open); }}>
          View Details
        </Button>
        <Button variant="outline" size="sm" className="px-3" onClick={() => window.open('tel:1800123456')}>
          <Phone className="w-4 h-4" />
        </Button>
      </div>
      <Modal isOpen={open} onClose={() => setOpen(false)} title="Property Details">
        <div className="space-y-2">
          <div><b>Bank:</b> {props.bank_name}</div>
          <div><b>Branch:</b> {props.branch_name}</div>
          <div><b>Type:</b> {props.property_type}</div>
          <div><b>Reserve Price:</b> ₹ {props.reserve_price_rs}</div>
          <div><b>EMD:</b> ₹ {props.emd_rs}</div>
          <div><b>EMD Last Date:</b> {props.emd_last_date || "TBA"}</div>
          <div><b>Auction Start:</b> {props.auction_open_date || "TBA"}</div>
          <div><b>Auction End:</b> {props.auction_close_date || "TBA"}</div>
          <div><b>Sealed Bid Last Date:</b> {props.sealed_bid_last_date || "TBA"}</div>
          <div><b>Sealed Bid Extended Date:</b> {props.sealed_bid_extended_date || "TBA"}</div>
          <div><b>Borrower Name:</b> {props.borrower_name}</div>
          <div><b>Owner Name:</b> {props.owner_name}</div>
          <div><b>Ownership Type:</b> {props.ownership_type}</div>
          <div><b>Summary Description:</b> {props.summary_description}</div>
          <div><b>Property Sub Type:</b> {props.property_sub_type}</div>
          <div><b>Type of Title Deed:</b> {props.type_of_title_deed}</div>
          <div><b>Status of Possession:</b> {props.status_of_possession}</div>
          <div><b>Address:</b> {props.address}</div>
          <div><b>Nearest Airport/Railway/Bus:</b> {props.nearest_airport_railway_bus}</div>
          <div><b>Authorised Officer Detail:</b> {props.authorised_officer_detail}</div>
          <div><b>Location:</b> {props.city}, {props.district}, {props.state}</div>
        </div>
      </Modal>
    </div>
  );
};

export default PropertyCard;
