import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Building, Phone } from "lucide-react";
import { Link } from "react-router-dom";

interface PropertyCardProps {
  property_id: number;
  bank_name: string;
  property: string;
  reserve_price: string;
  emd: string;
  emd_last_date?: string;
  auction_start_date?: string;
  auction_end_date?: string;
  city: string;
  district: string;
  state: string;
  status: "upcoming" | "live" | "ended";
}

const PropertyCard = ({
  property_id,
  bank_name,
  property,
  reserve_price,
  emd,
  emd_last_date,
  auction_start_date,
  auction_end_date,
  city,
  district,
  state,
  status
}: PropertyCardProps) => {
  const getStatusBadge = () => {
    switch (status) {
      case "live":
        return <Badge className="bg-primary text-primary-foreground animate-pulse">Live Auction</Badge>;
      case "upcoming":
        return <Badge className="bg-accent text-accent-foreground">Upcoming</Badge>;
      case "ended":
        return <Badge variant="secondary">Auction Ended</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-card hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border flex flex-col justify-between min-h-[320px]">
      <div className="p-6 flex-1">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Building className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">{bank_name}</span>
          </div>
          {getStatusBadge()}
        </div>
        <h3 className="text-lg font-semibold text-neutral-900 mb-2 line-clamp-2">{property}</h3>
        <div className="flex items-center gap-2 mb-1 text-neutral-700 text-sm">
          <MapPin className="w-4 h-4" />
          <span>{city}, {district}, {state}</span>
        </div>
        <div className="mb-0.5"><b>Reserve Price:</b> ₹ {reserve_price}</div>
        <div className="mb-0.5"><b>EMD:</b> ₹ {emd}</div>
        <div className="mb-0.5"><b>EMD Last Date:</b> {emd_last_date || "TBA"}</div>
        <div className="mb-0.5"><b>Auction Start:</b> {auction_start_date || "TBA"}</div>
        <div className="mb-1"><b>Auction End:</b> {auction_end_date || "TBA"}</div>
      </div>
      <div className="p-6 pt-0 flex gap-2">
        <Link to={`/property/${property_id}`} className="flex-1">
          <Button variant={status === "live" ? "default" : "outline"} className="w-full" size="sm">
            {status === "live" ? "Join Auction" : "View Details"}
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
