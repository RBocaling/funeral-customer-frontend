import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
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
  Settings,
  Star,
  Building,
  Users,
} from "lucide-react";
import { format } from "date-fns";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { BookingFormData, bookingSchema } from "@/lib/schemas";
import CasketConfigurator from "../casket/CasketConfigurator";

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
  const { toast } = useToast();
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
    resolver: zodResolver(bookingSchema),
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
      toast({
        title: "Error",
        description: "Failed to load services. Please try again.",
        variant: "destructive",
      });
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
      toast({
        title: "Error",
        description: "Failed to load caskets. Please try again.",
        variant: "destructive",
      });
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
      toast({
        title: "Error",
        description: "Failed to load flower arrangements. Please try again.",
        variant: "destructive",
      });
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
      toast({
        title: "Error",
        description: "Failed to load memorial rooms. Please try again.",
        variant: "destructive",
      });
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
      toast({
        title: "Booking successful",
        description: "Your funeral service has been booked successfully.",
      });
      setIsOpen(false);
    },
    onError: (error: Error) => {
      toast({
        title: "Booking failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Form submission
  const onSubmit = (data: BookingForm) => {
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
      toast({
        title: "Please select a service",
        description: "Select a service to proceed with your booking.",
        variant: "destructive",
      });
      return;
    }

    if (currentStep === 1 && selectedService?.allowsCustomCasket) {
      if (!selectedCasket && !customizeCasket) {
        toast({
          title: "Casket selection required",
          description: "Please select a casket or customize one to continue.",
          variant: "destructive",
        });
        return;
      }

      if (customizeCasket) {
        const casketColor = form.getValues("casketColor");
        const casketMaterial = form.getValues("casketMaterial");
        const casketFinish = form.getValues("casketFinish");

        if (!casketColor || !casketMaterial || !casketFinish) {
          toast({
            title: "Complete casket customization",
            description:
              "Please specify all casket details (color, material, and finish).",
            variant: "destructive",
          });
          return;
        }
      }
    }

    if (currentStep === 4) {
      const contactName = form.getValues("contactName");
      const contactPhone = form.getValues("contactPhone");

      if (!contactName || !contactPhone) {
        toast({
          title: "Contact details required",
          description:
            "Please provide your name and phone number for booking confirmation.",
          variant: "destructive",
        });
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
    toast({
      title: "Service Details",
      description: `Viewing detailed information for ${
        provider.businessName || provider.username
      }`,
    });
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
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto bg-background/95 backdrop-blur-xl border-primary/10 shadow-xl rounded-4xl overflow-x-hidden">
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
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                <Card className="overflow-hidden border backdrop-blur-sm bg-background/80 shadow-lg rounded-xl">
                  <div className="relative h-48 bg-gradient-to-r from-primary/5 to-primary/10">
                    {provider.profileImage ? (
                      <img
                        src={provider.profileImage}
                        alt={provider.businessName || provider.username}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{
                          backgroundImage: `url('https://images.unsplash.com/photo-1588421357574-87938a86fa28?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
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
                <h3 className="text-lg font-medium">Select a Casket</h3>

                {!selectedService.allowsCustomCasket ? (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">
                      This service does not allow custom casket selection.
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="flex flex-col md:flex-row gap-4">
                      <Card
                        className={`
                          flex-1 cursor-pointer transition-all duration-300
                          backdrop-blur-sm border shadow-md 
                          hover:shadow-lg hover:bg-background/90
                          ${
                            !customizeCasket
                              ? "border-primary/70 bg-primary/5 shadow-primary/10"
                              : "border-muted bg-background/80"
                          }
                        `}
                        onClick={() => setCustomizeCasket(false)}
                      >
                        <CardHeader className="pb-2">
                          <CardTitle
                            className={`text-base flex items-center gap-2 ${
                              !customizeCasket ? "text-primary" : ""
                            }`}
                          >
                            <Package className="h-4 w-4" />
                            Select from Catalog
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <CardDescription
                            className={
                              !customizeCasket ? "text-foreground/90" : ""
                            }
                          >
                            Choose from our range of pre-designed caskets with
                            various materials and finishes.
                          </CardDescription>
                        </CardContent>
                      </Card>

                      <Card
                        className={`
                          flex-1 cursor-pointer transition-all duration-300
                          backdrop-blur-sm border shadow-md
                          hover:shadow-lg hover:bg-background/90
                          ${
                            customizeCasket
                              ? "border-primary/70 bg-primary/5 shadow-primary/10"
                              : "border-muted bg-background/80"
                          }
                        `}
                        onClick={toggleCustomCasket}
                      >
                        <CardHeader className="pb-2">
                          <CardTitle
                            className={`text-base flex items-center gap-2 ${
                              customizeCasket ? "text-primary" : ""
                            }`}
                          >
                            <Settings className="h-4 w-4" />
                            Customize a Casket
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <CardDescription
                            className={
                              customizeCasket ? "text-foreground/90" : ""
                            }
                          >
                            Create a custom casket with your choice of color,
                            material, and dimensions.
                          </CardDescription>
                        </CardContent>
                      </Card>
                    </div>

                    {customizeCasket ? (
                      <CasketConfigurator />
                    ) : (
                      <div>
                        {casketsLoading ? (
                          <div className="flex items-center justify-center py-8">
                            <div className="animate-spin h-8 w-8 border-2 border-primary rounded-full border-t-transparent"></div>
                          </div>
                        ) : caskets.length === 0 ? (
                          <div className="text-center py-8">
                            <div className="space-y-4 p-4 bg-muted rounded-lg">
                              <h4 className="font-medium">
                                Choose Casket Manually
                              </h4>

                              <FormField
                                control={form.control}
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
                                        <SelectItem value="oak">Oak</SelectItem>
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
                                control={form.control}
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
                                control={form.control}
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

                              <div className="space-y-4">
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
                  <div>
                    {flowersLoading ? (
                      <div className="flex items-center justify-center py-8">
                        <div className="animate-spin h-8 w-8 border-2 border-primary rounded-full border-t-transparent"></div>
                      </div>
                    ) : flowers.length === 0 ? (
                      <div className="text-center py-8">
                        <p className="text-muted-foreground">
                          No flower arrangements available
                        </p>
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
                <div className="flex items-center justify-between">
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
                  <div>
                    {roomsLoading ? (
                      <div className="flex items-center justify-center py-8">
                        <div className="animate-spin h-8 w-8 border-2 border-primary rounded-full border-t-transparent"></div>
                      </div>
                    ) : rooms.length === 0 ? (
                      <div className="text-center py-8">
                        <p className="text-muted-foreground">
                          No memorial rooms available
                        </p>
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
                    control={form.control}
                    name="contactName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contact Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter contact name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="contactPhone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contact Phone</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter phone number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Service Date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={`w-full pl-3 text-left font-normal ${
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
                            <CalendarComponent
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) => date < new Date()}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
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
                    control={form.control}
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
