import { useState, useMemo } from "react";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Package,
  Flower,
  Building,
  Star,
  MapPin,
  DollarSign,
  Calendar,
  Clock,
  ChevronRight,
  Users,
  CheckCircle2,
} from "lucide-react";
import ServicesFilter from "@/components/services/ServicesFilter";
import { mockProviders } from "@/lib/mockdata";
import BookingForm from "@/components/services/BookingForm";

interface ServiceProvider {
  id: number;
  username: string;
  email: string;
  password: string;
  fullName?: string;
  userType: string;
  profileComplete: boolean;
  createdAt: Date;
  businessName?: string;
  location?: string;
  rating?: number;
  reviewCount?: number;
  bookingCount?: number;
  priceRange?: { min: number; max: number };
  allowsCustomCasket?: boolean;
  hasFlowerOptions?: boolean;
  hasMemorialRoom?: boolean;
  profileImage?: string;
  profileBio?: string;
}

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    minimumFractionDigits: 0,
  }).format(amount / 100);

const Services = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<
    "all" | "casket" | "flower" | "room"
  >("all");
  const [sortOrder, setSortOrder] = useState<
    "rating" | "price-low" | "price-high" | "popularity" | string
  >("rating");
  const [selectedProvider, setSelectedProvider] =
    useState<ServiceProvider | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const providers = useMemo(() => {
    let filtered = mockProviders.filter((p) => {
      const term = searchTerm.toLowerCase();
      const matches =
        p.businessName?.toLowerCase().includes(term) ||
        p.username.toLowerCase().includes(term) ||
        p.location?.toLowerCase().includes(term);
      if (filterType === "casket") return matches && p.allowsCustomCasket;
      if (filterType === "flower") return matches && p.hasFlowerOptions;
      if (filterType === "room") return matches && p.hasMemorialRoom;
      return matches;
    });

    return filtered.sort((a, b) => {
      switch (sortOrder) {
        case "rating":
          return (b.rating || 0) - (a.rating || 0);
        case "price-low":
          return (a.priceRange?.min || 0) - (b.priceRange?.min || 0);
        case "price-high":
          return (b.priceRange?.max || 0) - (a.priceRange?.max || 0);
        case "popularity":
          return (b.bookingCount || 0) - (a.bookingCount || 0);
        default:
          return 0;
      }
    });
  }, [searchTerm, filterType, sortOrder]);

  const handleBookService = (provider: ServiceProvider) => {
    setSelectedProvider(provider);
    setIsBookingModalOpen(true);
  };

  return (
    <div className="max-w-w-ful mx-auto py-6 px-4 sm:px-6">
      <ServicesFilter
        filterType={filterType}
        setFilterType={setFilterType}
        setSortOrder={setSortOrder}
        sortOrder={sortOrder}
        setSearchTerm={setSearchTerm}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {providers.length > 0 ? (
          providers.map((provider) => (
            <Card
              key={provider.id}
              className="dark:bg-gray-800/40 backdrop-blur-sm rounded-3xl pt-0 overflow-hidden pb-6 border border-gray-700/30 shadow-xl shadow-black/10"
            >
              <div className="relative h-48">
                <img
                  src={
                    "https://images.unsplash.com/photo-1627483262769-04d0a1401487?q=80&w=1000&auto=format&fit=crop"
                  }
                  alt={provider.businessName || provider.username}
                  className="w-full h-full object-cover transition-transform hover:scale-105 duration-700"
                />
                <div className="absolute top-3 right-3 bg-white/70 dark:bg-black/50 backdrop-blur-md rounded-full px-3 py-1.5 text-sm font-semibold shadow-lg">
                  <span className="flex items-center">
                    <DollarSign className="h-3.5 w-3.5 mr-1 text-primary" />
                    {provider.priceRange
                      ? `${formatCurrency(provider.priceRange.min)}+`
                      : "Varies"}
                  </span>
                </div>
                <div className="absolute top-3 left-3 bg-white/70 dark:bg-black/50 backdrop-blur-md rounded-full px-3 py-1.5 text-sm shadow-lg">
                  <span className="flex items-center">
                    <Star className="h-3.5 w-3.5 mr-1 text-amber-500 fill-amber-500" />
                    <span className="font-bold">
                      {provider.rating || "4.8"}
                    </span>
                    <span className="text-xs text-muted-foreground ml-1">
                      ({provider.reviewCount || "0"})
                    </span>
                  </span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-black/60 to-transparent"></div>
              </div>
              <CardHeader className="px-5">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg font-bold leading-tight">
                      {provider.businessName || provider.username}
                    </CardTitle>
                    <CardDescription className="flex items-center mt-1">
                      <MapPin className="h-3.5 w-3.5 mr-1 text-primary" />
                      {provider.location || "Cavite, Philippines"}
                    </CardDescription>
                  </div>
                  {provider.profileComplete && (
                    <div className="bg-sky-50 text-sky-600 dark:bg-sky-900/30 dark:text-sky-400 p-1 rounded-full">
                      <CheckCircle2 className="h-4 w-4" />
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent className="px-5 flex-grow py-0 -mt-3">
                <div className="flex flex-wrap gap-2 mb-4">
                  {provider.allowsCustomCasket && (
                    <Badge className="rounded-full font-medium px-3 py-1 shadow-sm bg-sky-50 text-sky-700 dark:bg-sky-950/40 dark:text-sky-300 border-0">
                      <Package className="mr-1.5 h-3 w-3" /> Custom Casket
                    </Badge>
                  )}
                  {provider.hasFlowerOptions && (
                    <Badge className="rounded-full font-medium px-3 py-1 shadow-sm bg-pink-50 text-pink-700 dark:bg-pink-950/40 dark:text-pink-300 border-0">
                      <Flower className="mr-1.5 h-3 w-3" /> Flowers
                    </Badge>
                  )}
                  {provider.hasMemorialRoom && (
                    <Badge className="rounded-full font-medium px-3 py-1 shadow-sm bg-purple-50 text-purple-700 dark:bg-purple-950/40 dark:text-purple-300 border-0">
                      <Building className="mr-1.5 h-3 w-3" /> Memorial Room
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-foreground line-clamp-2">
                  {provider.profileBio ||
                    "Professional funeral service provider offering compassionate end-of-life services."}
                </p>
                <div className="flex items-center gap-3 mt-2 mb-3">
                  <div className="bg-slate-100 dark:bg-slate-800 rounded-full px-3 py-1 text-xs flex items-center">
                    <Calendar className="h-3.5 w-3.5 mr-1.5 text-primary" />{" "}
                    Available today
                  </div>
                  <div className="bg-slate-100 dark:bg-slate-800 rounded-full px-3 py-1 text-xs flex items-center">
                    <Clock className="h-3.5 w-3.5 mr-1.5 text-primary" /> 10AM -
                    6PM
                  </div>
                </div>
              </CardContent>
              <div className="px-5">
                <div className="h-px w-full bg-border/40 mb-4 -mt-3"></div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm">
                    <Users className="h-4 w-4 mr-1.5 text-primary" />
                    <span className="font-medium">
                      {provider.bookingCount || "210"}+
                    </span>
                    <span className="text-muted-foreground ml-1">bookings</span>
                  </div>
                  <Button
                    className="rounded-full font-medium text-white bg-sky-500 shadow-2xl hover:shadow-3xl shadow-sky-500/50 transition-all py-5 "
                    onClick={() => handleBookService(provider)}
                  >
                    Book Now <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </div>
            </Card>
          ))
        ) : (
          <p className="text-muted-foreground text-center col-span-3">
            No providers found.
          </p>
        )}
      </div>

      {selectedProvider && (
        <BookingForm
          isOpen={isBookingModalOpen}
          setIsOpen={setIsBookingModalOpen}
          provider={selectedProvider}
        />
      )}
    </div>
  );
};

const StatCard = ({
  icon,
  label,
  count,
}: {
  icon: React.ReactNode;
  label: string;
  count: number;
}) => (
  <div className="bg-slate-100 dark:bg-slate-800 rounded-2xl shadow-md p-4 flex flex-col items-center justify-center">
    <div className="bg-white dark:bg-slate-700 rounded-full p-3 mb-2">
      {icon}
    </div>
    <p className="text-xs text-muted-foreground">{label}</p>
    <p className="text-lg font-bold text-primary">{count}</p>
  </div>
);

export default Services;
