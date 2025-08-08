import { Button } from "@/components/ui/button";
import { Building, MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";

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

const PropertyCard = ({
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
}: PropertyCardProps) => {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-card hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border flex flex-col justify-between min-h-[320px]">
      <div className="p-6 flex-1">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Building className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">{bank_name}</span>
          </div>
        </div>
        <h3 className="text-lg font-semibold text-neutral-900 mb-2 line-clamp-2">{property_type || "Property"}</h3>
        <div className="flex items-center gap-2 mb-1 text-neutral-700 text-sm">
          <MapPin className="w-4 h-4" />
          <span>{city}, {district}, {state}</span>
        </div>
        <div className="mb-0.5"><b>Reserve Price:</b> ₹ {reserve_price_rs}</div>
        <div className="mb-0.5"><b>EMD:</b> ₹ {emd_rs}</div>
        <div className="mb-0.5"><b>EMD Last Date:</b> {emd_last_date || "TBA"}</div>
        <div className="mb-0.5"><b>Auction Start:</b> {auction_open_date || "TBA"}</div>
        <div className="mb-1"><b>Auction End:</b> {auction_close_date || "TBA"}</div>
      </div>
      <div className="p-6 pt-0 flex gap-2">
        <Link to={`/property/${property_id}`} className="flex-1">
          <Button variant="outline" className="w-full" size="sm">
            View Details
          </Button>
        </Link>
        <Button variant="outline" size="sm" className="px-3" onClick={() => window.open('tel:1800123456')}>
          <Phone className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default PropertyCard;
