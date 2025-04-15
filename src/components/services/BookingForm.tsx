import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { apiRequest, queryClient } from "@/lib/queryClient";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Calendar as CalendarIcon,
  Check,
  ChevronLeft,
  ChevronRight,
  DollarSign,
  Flower,
  Home,
  Info,
  MapPin,
  Package,
  Star,
  Building,
  Users,
  ListMinus,
  Settings2Icon,
} from "lucide-react";
import { format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { BookingFormData, bookingSchema } from "@/lib/schemas";
import CasketConfigurator from "../casket/CasketConfigurator";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";

interface ServiceProvider {
  id: number;
  username: string;
  password: string;
  email: string;
  fullName?: string;
  userType: string;
profileComplete: boolean;
  createdAt: Date;
  businessName?: string;
  location?: string;
  rating?: number;
  reviewCount?: number;
  bookingCount?: number;
  priceRange?: {
    min: number;
    max: number;
  };
  allowsCustomCasket?: boolean;
  hasFlowerOptions?: boolean;
  hasMemorialRoom?: boolean;
  profileImage?: string;
  profileBio?: string;
}

interface EnhancedBookingModalProps {
  provider: ServiceProvider;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const steps = [
  { id: "details", label: "Service Details" },
  { id: "casket", label: "Casket Selection" },
  { id: "flowers", label: "Flower Options" },
  { id: "room", label: "Memorial Room" },
  { id: "contact", label: "Contact Info" },
  { id: "summary", label: "Summary" },
];

type BookingForm = z.infer<typeof bookingSchema>;

const BookingForm = ({
  provider,
  isOpen,
  setIsOpen,
}: EnhancedBookingModalProps) => {
  const [user, _] = useState<any>({});
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedService, setSelectedService] = useState<any>(null);
  const [selectedCasket, setSelectedCasket] = useState<any>(null);
  const [selectedFlower, setSelectedFlower] = useState<any>(null);
  const [selectedRoom, setSelectedRoom] = useState<any>(null);

  // UI state for custom casket
  const [customizeCasket, setCustomizeCasket] = useState<any>(false);
  const [casketWidth, setCasketWidth] = useState<any>(75);
  const [casketHeight, setCasketHeight] = useState<any>(65);
  const [casketLength, setCasketLength] = useState<any>(180);

  // Services, caskets, flowers, rooms loading states
  const [casketsLoading, setCasketsLoading] = useState<any>(true);
  const [flowersLoading, setFlowersLoading] = useState<any>(true);
  const [roomsLoading, setRoomsLoading] = useState<any>(true);

  // Services, caskets, flowers, rooms data
  const [services, setServices] = useState<any>([]);
  const [caskets, setCaskets] = useState<any>([]);
  const [flowers, setFlowers] = useState<any>([]);
  const [rooms, setRooms] = useState<any>([]);

  // Total cost calculation
  const calculateTotal = () => {
    let total = selectedService?.basePrice || 0;

    if (customizeCasket) {
      // Custom casket pricing - base plus size factors
      const sizeMultiplier =
        (casketWidth * casketHeight * casketLength) / (75 * 65 * 180);
      total += Math.round(15000 * sizeMultiplier);
    } else if (selectedCasket) {
      total += selectedCasket.price;
    }

    if (selectedFlower) {
      total += selectedFlower.price;
    }

    if (selectedRoom) {
      total += selectedRoom.price;
    }

    return total;
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-PH", {
      style: "currency",
      currency: "PHP",
      minimumFractionDigits: 0,
    }).format(amount / 100);
  };

  // Form setup
  const form = useForm<BookingFormData>({
    // resolver: zodResolver(bookingSchema),
    defaultValues: {
      customerId: undefined, // or set it to a number/string if needed
      providerId: provider.id,
      status: "pending",
      date: new Date(),
      time: "10:00",
      totalAmount: 0,
      notes: "",
      contactName: user?.fullName || "",
      contactPhone: "",
      customCasket: false, // Make sure this field is set correctly
    },
  });

  // Load services
  const loadServices = async () => {
    try {
      const response = await fetch(`/api/provider/services/${provider.id}`);
      if (!response.ok) throw new Error("Failed to load services");
      const data = await response.json();
      setServices(data);

      // If there's only one service, select it automatically
      if (data.length === 1) {
        setSelectedService(data[0]);
        form.setValue("serviceId", data[0].id);
      }
    } catch (error) {
      console.error("Error loading services:", error);
     
    } finally {
    }
  };

  // Load caskets
  const loadCaskets = async () => {
    try {
      setCasketsLoading(true);
      const response = await fetch(`/api/provider/caskets/${provider.id}`);
      if (!response.ok) throw new Error("Failed to load caskets");
      const data = await response.json();
      setCaskets(data);
    } catch (error) {
      console.error("Error loading caskets:", error);
      
    } finally {
      setCasketsLoading(false);
    }
  };

  // Load flowers
  const loadFlowers = async () => {
    try {
      setFlowersLoading(true);
      const response = await fetch(`/api/provider/flowers/${provider.id}`);
      if (!response.ok) throw new Error("Failed to load flowers");
      const data = await response.json();
      setFlowers(data);
    } catch (error) {
      console.error("Error loading flowers:", error);
      
    } finally {
      setFlowersLoading(false);
    }
  };

  // Load memorial rooms
  const loadRooms = async () => {
    try {
      setRoomsLoading(true);
      const response = await fetch(
        `/api/provider/memorial-rooms/${provider.id}`
      );
      if (!response.ok) throw new Error("Failed to load memorial rooms");
      const data = await response.json();
      setRooms(data);
    } catch (error) {
      console.error("Error loading memorial rooms:", error);
      
    } finally {
      setRoomsLoading(false);
    }
  };

  // Load all data when modal opens
  useState(() => {
    if (isOpen) {
      loadServices();
      loadCaskets();
      loadFlowers();
      loadRooms();
    }
  });

  // Create booking mutation
  const createBookingMutation = useMutation({
    mutationFn: async (bookingData: BookingForm) => {
      const res = await apiRequest("POST", "/api/bookings", bookingData);
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`/api/customer/bookings/${user?.id}`],
      });
     
      setIsOpen(false);
    },
    onError: (error: Error) => {
      console.log(error);
    }
  });

  // Form submission
  const onHandleSubmit = (data: BookingForm) => {
    // Calculate total amount in cents
    const totalAmount = calculateTotal();

    // Prepare booking data
    const bookingData = {
      ...data,
      totalAmount,
      serviceId: selectedService?.id,
      casketId: customizeCasket ? undefined : selectedCasket?.id,
      flowerId: selectedFlower?.id,
      memorialRoomId: selectedRoom?.id,
      customCasket: customizeCasket,
      casketWidth: customizeCasket ? casketWidth : undefined,
      casketHeight: customizeCasket ? casketHeight : undefined,
      casketLength: customizeCasket ? casketLength : undefined,
      casketColor: form.getValues("casketColor"),
      casketMaterial: form.getValues("casketMaterial"),
      casketFinish: form.getValues("casketFinish"),
    };

    // Create booking
    createBookingMutation.mutate(bookingData);
  };

  // Step navigation
  const nextStep = () => {
    if (currentStep === 0 && !selectedService) {
      return;
    }

    // if (currentStep === 1 && selectedService?.allowsCustomCasket) {
    //   if (!selectedCasket && !customizeCasket) {
    //     toast({
    //       title: "Casket selection required",
    //       description: "Please select a casket or customize one to continue.",
    //       variant: "destructive",
    //     });
    //     return;
    //   }

    //   if (customizeCasket) {
    //     const casketColor = form.getValues("casketColor");
    //     const casketMaterial = form.getValues("casketMaterial");
    //     const casketFinish = form.getValues("casketFinish");

    //     if (!casketColor || !casketMaterial || !casketFinish) {
    //       toast({
    //         title: "Complete casket customization",
    //         description:
    //           "Please specify all casket details (color, material, and finish).",
    //         variant: "destructive",
    //       });
    //       return;
    //     }
    //   }
    // }

    if (currentStep === 4) {
      const contactName = form.getValues("contactName");
      const contactPhone = form.getValues("contactPhone");

      if (!contactName || !contactPhone) {
        
        return;
      }
    }

    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const viewServiceDetails = () => {
   
  };

  const handleServiceSelect = (service: any) => {
    setSelectedService(service);
    form.setValue("serviceId", service.id);

    // Reset other selections if service doesn't allow them
    if (!service.allowsCustomCasket) {
      setSelectedCasket(null);
      setCustomizeCasket(false);
    }

    if (!service.hasFlowerOptions) {
      setSelectedFlower(null);
    }

    if (!service.hasMemorialRoom) {
      setSelectedRoom(null);
    }
  };

  const handleCasketSelect = (casket: any) => {
    if (customizeCasket && casket) {
      setCustomizeCasket(false);
    }

    setSelectedCasket(casket);
    form.setValue("casketId", casket?.id);
  };

  const handleFlowerSelect = (flower: any) => {
    setSelectedFlower(flower);
    form.setValue("flowerId", flower?.id);
  };

  const handleRoomSelect = (room: any) => {
    setSelectedRoom(room);
    form.setValue("memorialRoomId", room?.id);
  };

  const toggleCustomCasket = () => {
    setCustomizeCasket(!customizeCasket);
    if (!customizeCasket) {
      setSelectedCasket(null);
    }
    form.setValue("customCasket", !customizeCasket);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="w-full max-w-screen sm:max-w-[720px] max-h-screen md:max-h-[90vh] overflow-y-auto bg-background/95 backdrop-blur-xl border-primary/10 shadow-xl rounded-4xl overflow-x-hidden">
        <DialogHeader className="text-center pb-2">
          <DialogTitle className="text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
            Book Funeral Service
          </DialogTitle>
          <DialogDescription className="text-base mt-1.5">
            Book a service with{" "}
            <span className="font-medium text-primary">
              {provider.businessName || provider.username}
            </span>
          </DialogDescription>
        </DialogHeader>

        {/* iOS-style Stepper */}
        <div className="mb-10 px-1">
          <div className="flex items-center justify-between relative z-10">
            {steps.map((step, index) => (
              <div key={step.id} className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-medium text-sm
                    shadow-sm backdrop-blur-md border transition-all duration-300
                    ${
                      currentStep >= index
                        ? "bg-primary/90 text-primary-foreground border-primary/40"
                        : "bg-background/80 border-background/30 text-muted-foreground"
                    }`}
                  style={{
                    boxShadow:
                      currentStep >= index
                        ? "0 4px 12px rgba(var(--primary), 0.25)"
                        : "none",
                  }}
                >
                  {currentStep > index ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    index + 1
                  )}
                </div>
                <span
                  className={`text-xs font-medium mt-2 hidden sm:block transition-all duration-300
                    ${
                      currentStep >= index
                        ? "text-foreground"
                        : "text-muted-foreground/70"
                    }`}
                >
                  {step.label}
                </span>
              </div>
            ))}
          </div>

          {/* Progress Connector Line */}
          <div className="relative mt-5">
            <div className="absolute top-0 left-0 h-1.5 bg-muted/30 w-full rounded-full backdrop-blur-sm"></div>
            <div
              className="absolute top-0 left-0 h-1.5 bg-gradient-to-r from-primary/80 to-primary rounded-full transition-all duration-500 ease-in-out"
              style={{
                width: `${(currentStep / (steps.length - 1)) * 100}%`,
                boxShadow: "0 1px 3px rgba(var(--primary), 0.3)",
              }}
            ></div>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onHandleSubmit)} className="space-y-6 overflow-x-hidden">
            {/* Step 1: Service Details */}
            {currentStep === 0 && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">
                    Funeral Service Details
                  </h3>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={viewServiceDetails}
                    className="flex items-center gap-1"
                  >
                    <Info className="h-4 w-4" />
                    View Details
                  </Button>
                </div>

                {/* Provider Details with Banner Image */}
                <Card className="overflow-hidden border backdrop-blur-sm bg-background/80 shadow-lg rounded-xl pt-0">
                  <div className="relative h-48 bg-gradient-to-r from-primary/5 to-primary/10">
                    {provider.profileImage ? (
                      <img
                        src="https://images.unsplash.com/photo-1627483262769-04d0a1401487?q=80&w=1000&auto=format&fit=crop"
                        alt={provider.businessName || provider.username}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{
                          backgroundImage: `url("https://images.unsplash.com/photo-1627483262769-04d0a1401487?q=80&w=1000&auto=format&fit=crop")`,
                          backgroundSize: "cover",
                          filter: "brightness(0.85)",
                        }}
                      >
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="px-4 py-2 rounded-lg bg-background/80 backdrop-blur-sm">
                            <span className="text-2xl font-bold">
                              {provider.businessName || provider.username}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Rating Badge */}
                    <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-md rounded-full px-3 py-1.5 shadow-lg">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 fill-amber-400 text-amber-400 mr-1" />
                        <span className="text-sm font-bold">
                          {provider.rating || "4.8"}
                        </span>
                        <span className="text-xs text-muted-foreground ml-1">
                          ({provider.reviewCount || "124"} reviews)
                        </span>
                      </div>
                    </div>

                    {/* Location Badge */}
                    <div className="absolute bottom-4 left-4 bg-background/90 backdrop-blur-md rounded-full px-3 py-1.5 shadow-lg">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 text-primary mr-1" />
                        <span className="text-sm font-medium">
                          {provider.location || "Cavite, Philippines"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <CardContent className="pt-5">
                    <div className="flex flex-col space-y-4">
                      <div>
                        <h3 className="text-xl font-bold">
                          {provider.businessName || provider.username}
                        </h3>
                        <p className="text-sm text-foreground mt-2">
                          {provider.profileBio ||
                            "Professional funeral service provider with over 25 years of experience offering compassionate end-of-life services tailored to your needs. Our dedicated team provides respectful and dignified funeral arrangements to honor your loved ones."}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-2 py-2">
                        {provider.allowsCustomCasket && (
                          <Badge
                            variant="outline"
                            className="bg-sky-50 text-sky-800 border-sky-200 dark:bg-sky-950/50 dark:text-sky-300 dark:border-sky-800/50"
                          >
                            <Package className="mr-1 h-3.5 w-3.5" /> Custom
                            Casket Options
                          </Badge>
                        )}
                        {provider.hasFlowerOptions && (
                          <Badge
                            variant="outline"
                            className="bg-pink-50 text-pink-800 border-pink-200 dark:bg-pink-950/50 dark:text-pink-300 dark:border-pink-800/50"
                          >
                            <Flower className="mr-1 h-3.5 w-3.5" /> Premium
                            Flower Arrangements
                          </Badge>
                        )}
                        {provider.hasMemorialRoom && (
                          <Badge
                            variant="outline"
                            className="bg-purple-50 text-purple-800 border-purple-200 dark:bg-purple-950/50 dark:text-purple-300 dark:border-purple-800/50"
                          >
                            <Building className="mr-1 h-3.5 w-3.5" /> Memorial
                            Rooms Available
                          </Badge>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                        <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                          <div className="bg-primary/10 rounded-full p-2">
                            <DollarSign className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h4 className="text-sm font-medium">Price Range</h4>
                            <p className="text-sm font-bold">
                              {provider.priceRange
                                ? `${formatCurrency(
                                    provider.priceRange.min
                                  )} - ${formatCurrency(
                                    provider.priceRange.max
                                  )}`
                                : "Varies by selections"}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                          <div className="bg-primary/10 rounded-full p-2">
                            <Users className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h4 className="text-sm font-medium">
                              Total Bookings
                            </h4>
                            <p className="text-sm font-bold">
                              {provider.bookingCount || "210"}+ services booked
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-primary/5 p-4 rounded-lg border border-primary/20 mt-2">
                        <h4 className="font-medium flex items-center gap-1.5">
                          <Calendar className="h-4 w-4 text-primary" />
                          Standard Service Package
                        </h4>
                        <p className="text-sm text-muted-foreground mt-1.5 mb-3">
                          Comprehensive funeral service with memorial ceremony,
                          viewing, transport, and basic arrangements
                        </p>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <Check className="h-4 w-4 text-green-600 mr-1.5" />
                            <span className="text-sm">Available Now</span>
                          </div>
                          <div className="text-lg font-bold text-primary">
                            {formatCurrency(
                              provider.priceRange?.min || 2500000
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Set a default service if we reached this step */}
                {!selectedService &&
                  services.length > 0 &&
                  (() => {
                    // Auto-select the first service silently
                    setTimeout(() => {
                      handleServiceSelect(services[0]);
                    }, 0);
                    return null;
                  })()}

                {/* For empty services case, create a default service */}
                {!selectedService &&
                  services.length === 0 &&
                  (() => {
                    // Create a dummy service based on provider details
                    const dummyService = {
                      id: 1,
                      name: "Standard Funeral Service",
                      description:
                        "Comprehensive funeral service with memorial ceremony, viewing, transport, and basic arrangements",
                      basePrice: provider.priceRange?.min || 2500000,
                      providerId: provider.id,
                      allowsCustomCasket: provider.allowsCustomCasket || true,
                      hasFlowerOptions: provider.hasFlowerOptions || true,
                      hasMemorialRoom: provider.hasMemorialRoom || true,
                      createdAt: new Date(),
                    };

                    setTimeout(() => {
                      setSelectedService(dummyService as any);
                      setServices([dummyService as any]);
                    }, 0);

                    return null;
                  })()}
              </div>
            )}

            {/* Step 2: Casket Selection */}
            {currentStep === 1 && selectedService && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Select a Casket</h3>
                  {customizeCasket ? (
                    <button
                      type="button"
                      className="flex items-center gap-2 text-violet-500 cursor-pointer"
                      onClick={toggleCustomCasket}
                    >
                      <ListMinus />
                      Set Manually
                    </button>
                  ) : (
                    <button
                      className="flex items-center gap-2 text-violet-500 cursor-pointer"
                      onClick={toggleCustomCasket}
                    >
                      <Settings2Icon />
                      Set Custom 3d
                    </button>
                  )}
                </div>

                {!selectedService.allowsCustomCasket ? (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">
                      This service does not allow custom casket selection.
                    </p>
                  </div>
                ) : (
                  <>
                    {customizeCasket ? (
                      <CasketConfigurator />
                    ) : (
                      <div className="flex justify-center">
                        {casketsLoading ? (
                          <div className="flex items-center justify-center py-8">
                            <div className="animate-spin h-8 w-8 border-2 border-primary rounded-full border-t-transparent"></div>
                          </div>
                        ) : caskets.length === 0 ? (
                          <div className="text-center py-8  max-w-2xl overflow-x-hidden md:overflow-x-visible">
                            <div className="space-y-4 p-4 rounded-lg max-w-full">
                              <h4 className="font-medium">
                                Choose Casket Manually
                              </h4>

                              <Carousel
                                opts={{
                                  align: "start",
                                }}
                                className="md:w-full md:max-w-xl overflow-x-hidden md:overflow-x-visible"
                              >
                                <CarouselContent>
                                  {Array.from({ length: 5 }).map((_, index) => (
                                    <CarouselItem
                                      key={index}
                                      className="md:basis-1/2 lg:basis-1/3"
                                    >
                                      <div className="p-1 ">
                                        <Card
                                          key={provider.id}
                                          className="overflow-hidden flex flex-col h-full rounded-2xl border border-border/40 shadow-xl hover:shadow-2xl transition-all duration-300 pt-0"
                                        >
                                          <div className="relative h-32">
                                            <img
                                              src={
                                                index === 0
                                                  ? "https://www.ruebelfuneralhome.com/images/merchandise/metal/HP09-Mother.jpg"
                                                  : index === 1
                                                  ? "https://kingsfunerals.com.au/wp-content/uploads/2023/06/Aurelia_O.jpg"
                                                  : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLFJSnQ7ENbpP5ugIgpuwp7pSSeRj6qUnXoOt4YnAYae1ZD7KnUelZi1T6F-DiWX5X0VI&usqp=CAU"
                                              }
                                              alt={
                                                provider.businessName ||
                                                provider.username
                                              }
                                              className="w-full h-full object-cover transition-transform hover:scale-105 duration-700"
                                            />

                                            <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-black/60 to-transparent"></div>
                                          </div>

                                          <CardContent className="px-2 flex-grow py-0">
                                            <div className="flex items-center gap-2">
                                              <div className="top-3 right-3 bg-white/70 dark:bg-black/50 backdrop-blur-md rounded-full px-3 py-1.5 text-sm font-semibold shadow-lg">
                                                <span className="flex items-center text-xs">
                                                  {provider.priceRange
                                                    ? `${formatCurrency(
                                                        provider.priceRange.min
                                                      )}`
                                                    : "Varies"}
                                                </span>
                                              </div>
                                              <div className="top-3 left-3 bg-white/70 dark:bg-black/50 backdrop-blur-md rounded-full px-3 py-1.5 text-sm shadow-lg">
                                                <span className="flex items-center text-xs">
                                                  <Star className="h-3.5 w-3.5 mr-1 text-amber-500 fill-amber-500" />
                                                  <span className="font-bold">
                                                    {provider.rating || "4.8"}
                                                  </span>
                                                  <span className="text-xs text-muted-foreground ml-1">
                                                    (
                                                    {provider.reviewCount ||
                                                      "0"}
                                                    )
                                                  </span>
                                                </span>
                                              </div>
                                            </div>
                                          </CardContent>
                                          <div className="px-5">
                                            <div className="h-px w-full bg-border/40 mb-4 -mt-3"></div>
                                            <div className="flex items-center justify-center">
                                              <Button className="rounded-full bg-sky-500 shadow-2xl hover:shadow-3xl shadow-sky-500/50 transition-all py-5 w-full cursor-pointer">
                                                Choose
                                              </Button>
                                            </div>
                                          </div>
                                        </Card>
                                      </div>
                                    </CarouselItem>
                                  ))}
                                </CarouselContent>
                                <CarouselPrevious />
                                <CarouselNext />
                              </Carousel>
                              <div className="flex flex-col md:flex-row md:items-start justify-start gap-7sw-full ">
                                <FormField
                                  name="casketColor"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Color</FormLabel>
                                      <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                      >
                                        <FormControl>
                                          <SelectTrigger>
                                            <SelectValue placeholder="Select color" />
                                          </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                          <SelectItem value="walnut">
                                            Walnut
                                          </SelectItem>
                                          <SelectItem value="mahogany">
                                            Mahogany
                                          </SelectItem>
                                          <SelectItem value="oak">
                                            Oak
                                          </SelectItem>
                                          <SelectItem value="cherry">
                                            Cherry
                                          </SelectItem>
                                          <SelectItem value="white">
                                            White
                                          </SelectItem>
                                          <SelectItem value="black">
                                            Black
                                          </SelectItem>
                                          <SelectItem value="silver">
                                            Silver
                                          </SelectItem>
                                          <SelectItem value="gold">
                                            Gold
                                          </SelectItem>
                                        </SelectContent>
                                      </Select>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />

                                <FormField
                                  name="casketMaterial"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Material</FormLabel>
                                      <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                      >
                                        <FormControl>
                                          <SelectTrigger>
                                            <SelectValue placeholder="Select material" />
                                          </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                          <SelectItem value="wood">
                                            Wood
                                          </SelectItem>
                                          <SelectItem value="metal">
                                            Metal
                                          </SelectItem>
                                          <SelectItem value="copper">
                                            Copper
                                          </SelectItem>
                                          <SelectItem value="bronze">
                                            Bronze
                                          </SelectItem>
                                          <SelectItem value="stainless">
                                            Stainless Steel
                                          </SelectItem>
                                        </SelectContent>
                                      </Select>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />

                                <FormField
                                  name="casketFinish"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Finish</FormLabel>
                                      <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                      >
                                        <FormControl>
                                          <SelectTrigger>
                                            <SelectValue placeholder="Select finish" />
                                          </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                          <SelectItem value="matte">
                                            Matte
                                          </SelectItem>
                                          <SelectItem value="glossy">
                                            Glossy
                                          </SelectItem>
                                          <SelectItem value="satin">
                                            Satin
                                          </SelectItem>
                                          <SelectItem value="brushed">
                                            Brushed
                                          </SelectItem>
                                          <SelectItem value="polished">
                                            Polished
                                          </SelectItem>
                                        </SelectContent>
                                      </Select>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                              </div>

                              <div className="space-y-4 w-full ">
                                <div>
                                  <Label>Width (cm): {casketWidth}</Label>
                                  <Slider
                                    defaultValue={[casketWidth]}
                                    min={60}
                                    max={100}
                                    step={1}
                                    onValueChange={(value) =>
                                      setCasketWidth(value[0])
                                    }
                                    className="mt-2"
                                  />
                                </div>

                                <div>
                                  <Label>Height (cm): {casketHeight}</Label>
                                  <Slider
                                    defaultValue={[casketHeight]}
                                    min={50}
                                    max={80}
                                    step={1}
                                    onValueChange={(value) =>
                                      setCasketHeight(value[0])
                                    }
                                    className="mt-2"
                                  />
                                </div>

                                <div>
                                  <Label>Length (cm): {casketLength}</Label>
                                  <Slider
                                    defaultValue={[casketLength]}
                                    min={160}
                                    max={220}
                                    step={1}
                                    onValueChange={(value) =>
                                      setCasketLength(value[0])
                                    }
                                    className="mt-2"
                                  />
                                </div>
                              </div>

                              <div className="p-4 bg-background rounded-lg">
                                <h5 className="font-medium mb-2">
                                  Custom Casket Price
                                </h5>
                                <div className="flex items-center text-primary font-bold">
                                  <DollarSign className="h-4 w-4 mr-1" />
                                  {formatCurrency(
                                    Math.round(
                                      (15000 *
                                        (casketWidth *
                                          casketHeight *
                                          casketLength)) /
                                        (75 * 65 * 180)
                                    )
                                  )}
                                </div>
                                <p className="text-xs text-muted-foreground mt-1">
                                  *Price varies based on selected dimensions,
                                  material, and finish
                                </p>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {caskets.map((casket: any) => (
                              <Card
                                key={casket.id}
                                className={`cursor-pointer transition-all hover:border-primary ${
                                  selectedCasket?.id === casket.id
                                    ? "border-2 border-primary"
                                    : ""
                                }`}
                                onClick={() => handleCasketSelect(casket)}
                              >
                                <div className="h-40 bg-muted">
                                  {casket.imageUrl ? (
                                    <img
                                      src={casket.imageUrl}
                                      alt={casket.name}
                                      className="w-full h-full object-cover"
                                    />
                                  ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                      <Package className="h-10 w-10 text-muted-foreground" />
                                    </div>
                                  )}
                                </div>
                                <CardHeader className="pb-2">
                                  <div className="flex justify-between">
                                    <CardTitle className="text-base">
                                      {casket.name}
                                    </CardTitle>
                                    <div className="text-lg font-bold text-primary">
                                      {formatCurrency(casket.price)}
                                    </div>
                                  </div>
                                </CardHeader>
                                <CardContent className="pb-4">
                                  <CardDescription className="text-foreground text-sm">
                                    {casket.description ||
                                      `A beautiful ${casket.name} casket made with premium materials.`}
                                  </CardDescription>

                                  {casket.material && (
                                    <div className="mt-2 text-xs text-muted-foreground">
                                      Material: {casket.material}
                                    </div>
                                  )}

                                  {casket.finish && (
                                    <div className="text-xs text-muted-foreground">
                                      Finish: {casket.finish}
                                    </div>
                                  )}
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </>
                )}
              </div>
            )}

            {/* Step 3: Flower Selection (Optional) */}
            {currentStep === 2 && selectedService && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">
                    Select Flowers (Optional)
                  </h3>
                  {selectedFlower && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => handleFlowerSelect(null)}
                      size="sm"
                    >
                      Clear Selection
                    </Button>
                  )}
                </div>

                {!selectedService.hasFlowerOptions ? (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">
                      This service does not include flower options.
                    </p>
                  </div>
                ) : (
                  <div className=" flex items-center justify-center ">
                    {flowersLoading ? (
                      <div className="flex items-center justify-censter py-8">
                        <div className="animate-spin h-8 w-8 border-2 border-primary rounded-full border-t-transparent"></div>
                      </div>
                    ) : flowers.length === 0 ? (
                      <div className="text-center overflow-x-hidden md:overflow-x-visible">
                        <Carousel
                          opts={{
                            align: "start",
                          }}
                          className="w-full max-w-xl"
                        >
                          <CarouselContent>
                            {Array.from({ length: 5 }).map((_, index) => (
                              <CarouselItem
                                key={index}
                                className="md:basis-1/2 lg:basis-1/3"
                              >
                                <div className="p-1 ">
                                  <Card
                                    key={provider.id}
                                    className="overflow-hidden flex flex-col h-full rounded-2xl border border-border/40 shadow-xl hover:shadow-2xl transition-all duration-300 pt-0"
                                  >
                                    <div className="relative h-32">
                                      <img
                                        src={
                                          index === 0
                                            ? "data:image/jpeg;base64,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"
                                            : index === 1
                                            ? "data:image/jpeg;base64,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"
                                            : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiFlkLzqbWhuw5-j8uQhtIEHY5tdLVf8jXSQ&s"
                                        }
                                        alt={
                                          provider.businessName ||
                                          provider.username
                                        }
                                        className="w-full h-full object-cover transition-transform hover:scale-105 duration-700"
                                      />

                                      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-black/60 to-transparent"></div>
                                    </div>

                                    <CardContent className="px-2 flex-grow py-0">
                                      <div className="flex items-center gap-2">
                                        <div className="top-3 right-3 bg-white/70 dark:bg-black/50 backdrop-blur-md rounded-full px-3 py-1.5 text-sm font-semibold shadow-lg">
                                          <span className="flex items-center text-xs">
                                            {provider.priceRange
                                              ? `${formatCurrency(
                                                  provider.priceRange.min
                                                )}`
                                              : "Varies"}
                                          </span>
                                        </div>
                                        <div className="top-3 left-3 bg-white/70 dark:bg-black/50 backdrop-blur-md rounded-full px-3 py-1.5 text-sm shadow-lg">
                                          <span className="flex items-center text-xs">
                                            <Star className="h-3.5 w-3.5 mr-1 text-amber-500 fill-amber-500" />
                                            <span className="font-bold">
                                              {provider.rating || "4.8"}
                                            </span>
                                            <span className="text-xs text-muted-foreground ml-1">
                                              ({provider.reviewCount || "0"})
                                            </span>
                                          </span>
                                        </div>
                                      </div>
                                    </CardContent>
                                    <div className="px-5">
                                      <div className="h-px w-full bg-border/40 mb-4 -mt-3"></div>
                                      <div className="flex items-center justify-center">
                                        <Button className="rounded-full bg-sky-500 shadow-2xl hover:shadow-3xl shadow-sky-500/50 transition-all py-5 w-full cursor-pointer">
                                          Choose
                                        </Button>
                                      </div>
                                    </div>
                                  </Card>
                                </div>
                              </CarouselItem>
                            ))}
                          </CarouselContent>
                          <CarouselPrevious />
                          <CarouselNext />
                        </Carousel>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {flowers.map((flower: any) => (
                          <Card
                            key={flower.id}
                            className={`cursor-pointer transition-all hover:border-primary ${
                              selectedFlower?.id === flower.id
                                ? "border-2 border-primary"
                                : ""
                            }`}
                            onClick={() => handleFlowerSelect(flower)}
                          >
                            <div className="h-40 bg-muted">
                              {flower.imageUrl ? (
                                <img
                                  src={flower.imageUrl}
                                  alt={flower.name}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                  <Flower className="h-10 w-10 text-muted-foreground" />
                                </div>
                              )}
                            </div>
                            <CardHeader className="pb-2">
                              <div className="flex justify-between">
                                <CardTitle className="text-base">
                                  {flower.name}
                                </CardTitle>
                                <div className="text-lg font-bold text-primary">
                                  {formatCurrency(flower.price)}
                                </div>
                              </div>
                            </CardHeader>
                            <CardContent className="pb-4">
                              <CardDescription className="text-foreground text-sm">
                                {flower.description ||
                                  `Beautiful ${flower.name} arrangement for the funeral service.`}
                              </CardDescription>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {selectedFlower && (
                  <div className="p-4 bg-muted rounded-lg mt-4">
                    <h4 className="font-medium mb-2">
                      Selected Flower Arrangement: {selectedFlower.name}
                    </h4>
                    <p className="text-muted-foreground text-sm">
                      {selectedFlower.description}
                    </p>
                    <div className="mt-2 text-sm flex items-center text-primary">
                      <DollarSign className="h-4 w-4 mr-1" />
                      Price: {formatCurrency(selectedFlower.price)}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Step 4: Memorial Room Selection (Optional) */}
            {currentStep === 3 && selectedService && (
              <div className="space-y-4">
                <div className="flex items-center justify-enter">
                  <h3 className="text-lg font-medium">
                    Select Memorial Room (Optional)
                  </h3>
                  {selectedRoom && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => handleRoomSelect(null)}
                      size="sm"
                    >
                      Clear Selection
                    </Button>
                  )}
                </div>

                {!selectedService.hasMemorialRoom ? (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">
                      This service does not include memorial room options.
                    </p>
                  </div>
                ) : (
                  <div className="flex justify-center">
                    {roomsLoading ? (
                      <div className="flex items-center justify-center py-8">
                        <div className="animate-spin h-8 w-8 border-2 border-primary rounded-full border-t-transparent"></div>
                      </div>
                    ) : rooms.length === 0 ? (
                      <div className="text-center overflow-x-hidden md:overflow-x-visible">
                        <Carousel
                          opts={{
                            align: "start",
                          }}
                          className="w-full max-w-xl"
                        >
                          <CarouselContent>
                            {Array.from({ length: 5 }).map((_, index) => (
                              <CarouselItem
                                key={index}
                                className="md:basis-1/2 lg:basis-1/3"
                              >
                                <div className="p-1 ">
                                  <Card
                                    key={provider.id}
                                    className="overflow-hidden flex flex-col h-full rounded-2xl border border-border/40 shadow-xl hover:shadow-2xl transition-all duration-300 pt-0"
                                  >
                                    <div className="relative h-32">
                                      <img
                                        src={
                                          index === 0
                                            ? "https://chapels.goldenhaven.com.ph/wp-content/uploads/2021/01/Golden-Haven-Memorial-Services-and-Chapel-1024x682.jpg"
                                            : index === 1
                                            ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTugVUO9wDqGtjY8pzC6Rysgba2yGIijSy9AQ&s"
                                            : "https://chapels.goldenhaven.com.ph/wp-content/uploads/2020/11/Las-Pinas-Chapel-Rooms-11-scaled.jpg"
                                        }
                                        alt={
                                          provider.businessName ||
                                          provider.username
                                        }
                                        className="w-full h-full object-cover transition-transform hover:scale-105 duration-700"
                                      />

                                      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-black/60 to-transparent"></div>
                                    </div>

                                    <CardContent className="px-2 flex-grow py-0">
                                      <div className="flex items-center gap-2">
                                        <div className="top-3 right-3 bg-white/70 dark:bg-black/50 backdrop-blur-md rounded-full px-3 py-1.5 text-sm font-semibold shadow-lg">
                                          <span className="flex items-center text-xs">
                                            {provider.priceRange
                                              ? `${formatCurrency(
                                                  provider.priceRange.min
                                                )}`
                                              : "Varies"}
                                          </span>
                                        </div>
                                        <div className="top-3 left-3 bg-white/70 dark:bg-black/50 backdrop-blur-md rounded-full px-3 py-1.5 text-sm shadow-lg">
                                          <span className="flex items-center text-xs">
                                            <Star className="h-3.5 w-3.5 mr-1 text-amber-500 fill-amber-500" />
                                            <span className="font-bold">
                                              {provider.rating || "4.8"}
                                            </span>
                                            <span className="text-xs text-muted-foreground ml-1">
                                              ({provider.reviewCount || "0"})
                                            </span>
                                          </span>
                                        </div>
                                      </div>
                                    </CardContent>
                                    <div className="px-5">
                                      <div className="h-px w-full bg-border/40 mb-4 -mt-3"></div>
                                      <div className="flex items-center justify-center">
                                        <Button className="rounded-full bg-sky-500 shadow-2xl hover:shadow-3xl shadow-sky-500/50 transition-all py-5 w-full cursor-pointer">
                                          Choose
                                        </Button>
                                      </div>
                                    </div>
                                  </Card>
                                </div>
                              </CarouselItem>
                            ))}
                          </CarouselContent>
                          <CarouselPrevious />
                          <CarouselNext />
                        </Carousel>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {rooms.map((room: any) => (
                          <Card
                            key={room.id}
                            className={`cursor-pointer transition-all hover:border-primary ${
                              selectedRoom?.id === room.id
                                ? "border-2 border-primary"
                                : ""
                            }`}
                            onClick={() => handleRoomSelect(room)}
                          >
                            <div className="h-40 bg-muted">
                              {room.imageUrl ? (
                                <img
                                  src={room.imageUrl}
                                  alt={room.name}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                  <Home className="h-10 w-10 text-muted-foreground" />
                                </div>
                              )}
                            </div>
                            <CardHeader className="pb-2">
                              <div className="flex justify-between">
                                <CardTitle className="text-base">
                                  {room.name}
                                </CardTitle>
                                <div className="text-lg font-bold text-primary">
                                  {formatCurrency(room.price)}
                                </div>
                              </div>
                            </CardHeader>
                            <CardContent className="pb-4">
                              <CardDescription className="text-foreground text-sm">
                                {room.description ||
                                  `Spacious memorial room for the funeral service.`}
                              </CardDescription>

                              {room.capacity && (
                                <div className="mt-2 text-xs flex items-center text-muted-foreground">
                                  <Users className="h-3 w-3 mr-1" />
                                  Capacity: {room.capacity} people
                                </div>
                              )}
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {selectedRoom && (
                  <div className="p-4 bg-muted rounded-lg mt-4">
                    <h4 className="font-medium mb-2">
                      Selected Memorial Room: {selectedRoom.name}
                    </h4>
                    <p className="text-muted-foreground text-sm">
                      {selectedRoom.description}
                    </p>
                    <div className="mt-2 text-sm flex items-center text-primary">
                      <DollarSign className="h-4 w-4 mr-1" />
                      Price: {formatCurrency(selectedRoom.price)}
                    </div>
                    {selectedRoom.capacity && (
                      <div className="mt-1 text-sm flex items-center text-muted-foreground">
                        <Users className="h-4 w-4 mr-1" />
                        Capacity: {selectedRoom.capacity} people
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Step 5: Contact Details */}
            {currentStep === 4 && (
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Contact Details</h3>

                <div className="grid grid-cols-1 gap-4">
                  <FormField
                    name="contactName"
                    render={({ field }) => (
                      <FormItem className="">
                        <FormLabel>Contact Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter contact name"
                            {...field}
                            className="w-full py-4"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    name="contactPhone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contact Phone</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter phone number"
                            {...field}
                            className="w-full py-4"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    name="date"
                    render={({ field }) => (
                      <FormItem className="flex flex-col ">
                        <FormLabel>Service Date</FormLabel>
                        <Popover >
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={`w-full pl-3 text-left font-normal  ${
                                  !field.value ? "text-muted-foreground" : ""
                                }`}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            {/* <CalendarComponent
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) => date < new Date()}
                              initialFocus
                            /> */}
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    name="time"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Service Time</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select time" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="09:00">9:00 AM</SelectItem>
                            <SelectItem value="10:00">10:00 AM</SelectItem>
                            <SelectItem value="11:00">11:00 AM</SelectItem>
                            <SelectItem value="13:00">1:00 PM</SelectItem>
                            <SelectItem value="14:00">2:00 PM</SelectItem>
                            <SelectItem value="15:00">3:00 PM</SelectItem>
                            <SelectItem value="16:00">4:00 PM</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    name="notes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Additional Notes</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Any special requests or notes for the service provider"
                            className="resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            )}

            {/* Step 6: Summary and Confirmation */}
            {currentStep === 5 && (
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Booking Summary</h3>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Service Details</CardTitle>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="space-y-2">
                      <div className="flex justify-between items-start">
                        <div className="font-medium">
                          {selectedService?.name}
                        </div>
                        <div className="text-primary font-bold">
                          {formatCurrency(selectedService?.basePrice || 0)}
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {selectedService?.description}
                      </div>

                      <Separator className="my-2" />

                      {selectedService?.allowsCustomCasket && (
                        <>
                          <div className="font-medium">Casket</div>
                          {customizeCasket ? (
                            <div>
                              <div className="flex justify-between items-start">
                                <div>Custom Casket</div>
                                <div className="text-primary font-bold">
                                  {formatCurrency(
                                    Math.round(
                                      (15000 *
                                        (casketWidth *
                                          casketHeight *
                                          casketLength)) /
                                        (75 * 65 * 180)
                                    )
                                  )}
                                </div>
                              </div>
                              <div className="text-sm text-muted-foreground">
                                Color: {form.getValues("casketColor")},
                                Material: {form.getValues("casketMaterial")},
                                Finish: {form.getValues("casketFinish")}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                Dimensions: {casketWidth}cm × {casketHeight}cm ×{" "}
                                {casketLength}cm
                              </div>
                            </div>
                          ) : selectedCasket ? (
                            <div>
                              <div className="flex justify-between items-start">
                                <div>{selectedCasket.name}</div>
                                <div className="text-primary font-bold">
                                  {formatCurrency(selectedCasket.price)}
                                </div>
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {selectedCasket.description}
                              </div>
                            </div>
                          ) : (
                            <div className="text-sm text-muted-foreground">
                              No casket selected
                            </div>
                          )}

                          <Separator className="my-2" />
                        </>
                      )}

                      {selectedService?.hasFlowerOptions && (
                        <>
                          <div className="font-medium">Flowers</div>
                          {selectedFlower ? (
                            <div>
                              <div className="flex justify-between items-start">
                                <div>{selectedFlower.name}</div>
                                <div className="text-primary font-bold">
                                  {formatCurrency(selectedFlower.price)}
                                </div>
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {selectedFlower.description}
                              </div>
                            </div>
                          ) : (
                            <div className="text-sm text-muted-foreground">
                              No flowers selected
                            </div>
                          )}

                          <Separator className="my-2" />
                        </>
                      )}

                      {selectedService?.hasMemorialRoom && (
                        <>
                          <div className="font-medium">Memorial Room</div>
                          {selectedRoom ? (
                            <div>
                              <div className="flex justify-between items-start">
                                <div>{selectedRoom.name}</div>
                                <div className="text-primary font-bold">
                                  {formatCurrency(selectedRoom.price)}
                                </div>
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {selectedRoom.description}
                              </div>
                            </div>
                          ) : (
                            <div className="text-sm text-muted-foreground">
                              No memorial room selected
                            </div>
                          )}

                          <Separator className="my-2" />
                        </>
                      )}

                      <div className="font-medium">Booking Details</div>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="text-muted-foreground">Date:</div>
                        <div>
                          {form.getValues("date")
                            ? format(form.getValues("date"), "PPP")
                            : "Not set"}
                        </div>

                        <div className="text-muted-foreground">Time:</div>
                        <div>{form.getValues("time")}</div>

                        <div className="text-muted-foreground">Contact:</div>
                        <div>{form.getValues("contactName")}</div>

                        <div className="text-muted-foreground">Phone:</div>
                        <div>{form.getValues("contactPhone")}</div>
                      </div>

                      {form.getValues("notes") && (
                        <>
                          <div className="font-medium mt-2">Notes</div>
                          <div className="text-sm text-muted-foreground">
                            {form.getValues("notes")}
                          </div>
                        </>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col pt-0">
                    <Separator className="my-2" />
                    <div className="flex justify-between items-center w-full">
                      <div className="font-medium">Total Amount</div>
                      <div className="text-xl font-bold text-primary">
                        {formatCurrency(calculateTotal())}
                      </div>
                    </div>
                  </CardFooter>
                </Card>
              </div>
            )}

            <DialogFooter className="mt-8 flex justify-between items-center pt-6 border-t">
              {currentStep > 0 ? (
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevStep}
                  className="flex items-center gap-2 border-primary/20 hover:bg-primary/5"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous Step
                </Button>
              ) : (
                <div></div> // Empty div to maintain flex spacing when no back button
              )}

              <div className="flex items-center gap-3">
                {currentStep < steps.length - 1 ? (
                  <Button
                    type="button"
                    onClick={nextStep}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground flex items-center gap-2 px-8"
                  >
                    Continue
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    disabled={createBookingMutation.isPending}
                    className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2 px-8"
                  >
                    {createBookingMutation.isPending ? (
                      <>
                        <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                        Processing...
                      </>
                    ) : (
                      <>
                        Complete Booking
                        <Check className="h-4 w-4" />
                      </>
                    )}
                  </Button>
                )}
              </div>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default BookingForm;
