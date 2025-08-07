import PropertyCard from "./PropertyCard";

const FeaturedProperties = () => {
  const properties = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=300&fit=crop",
      bankName: "State Bank of India",
      title: "Luxurious 3BHK Apartment in Prime Location",
      location: "Bandra West, Mumbai",
      reservePrice: "2.5 Cr",
      currentBid: "2.8 Cr",
      auctionDate: "15 Jan 2025",
      propertyType: "Residential",
      area: "1,850 sq ft",
      timeLeft: "2 days 14 hrs",
      status: "live" as const
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop",
      bankName: "HDFC Bank",
      title: "Commercial Office Space - IT Park",
      location: "Gachibowli, Hyderabad",
      reservePrice: "1.8 Cr",
      auctionDate: "22 Jan 2025",
      propertyType: "Commercial",
      area: "2,200 sq ft",
      timeLeft: "9 days 6 hrs",
      status: "upcoming" as const
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop",
      bankName: "ICICI Bank",
      title: "Independent Villa with Garden",
      location: "Whitefield, Bangalore",
      reservePrice: "3.2 Cr",
      auctionDate: "18 Jan 2025",
      propertyType: "Residential",
      area: "3,500 sq ft",
      timeLeft: "5 days 18 hrs",
      status: "upcoming" as const
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=400&h=300&fit=crop",
      bankName: "Axis Bank",
      title: "Industrial Warehouse Complex",
      location: "Manesar, Gurgaon",
      reservePrice: "5.5 Cr",
      auctionDate: "12 Jan 2025",
      propertyType: "Industrial",
      area: "15,000 sq ft",
      timeLeft: "Auction Ended",
      status: "ended" as const
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=400&h=300&fit=crop",
      bankName: "Punjab National Bank",
      title: "Retail Showroom - Main Market",
      location: "Connaught Place, Delhi",
      reservePrice: "4.8 Cr",
      currentBid: "5.1 Cr",
      auctionDate: "16 Jan 2025",
      propertyType: "Commercial",
      area: "1,800 sq ft",
      timeLeft: "3 days 8 hrs",
      status: "live" as const
    },
    {
      id: 6,
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=300&fit=crop",
      bankName: "Bank of Baroda",
      title: "Premium 4BHK Penthouse",
      location: "Koregaon Park, Pune",
      reservePrice: "2.2 Cr",
      auctionDate: "25 Jan 2025",
      propertyType: "Residential",
      area: "2,800 sq ft",
      timeLeft: "12 days 4 hrs",
      status: "upcoming" as const
    }
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-neutral-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
            Featured Auction Properties
          </h2>
          <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
            Discover handpicked properties from leading banks across India. Each listing is verified 
            and comes with complete documentation for a transparent bidding experience.
          </p>
        </div>
        
        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {properties.map((property) => (
            <PropertyCard key={property.id} {...property} />
          ))}
        </div>
        
        {/* View More Button */}
        <div className="text-center mt-12">
          <button className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors shadow-sm">
            View All Properties
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;