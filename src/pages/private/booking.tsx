import React, { useState } from "react";
import {
  Calendar,
  MapPin,
  Users,
  MessageSquare,
  X,
  Phone,
  Flower2,
  Box,
  Church,
  DollarSign,
  Clock,
  Heart,
  User,
  Mail,
  CalendarDays,
  UserPlus,
  Search,
  Filter,
  ChevronDown,
} from "lucide-react";
import Map from "@/components/booking/Map";
import TitlePage from "@/components/ui/title-page";

// Sample funeral service bookings
const bookings = [
  {
    id: 1,
    deceasedName: "Sarah Johnson",
    customerName: "Michael Johnson",
    customerEmail: "michael.johnson@email.com",
    customerPhone: "+1 (555) 123-4567",
    location: "Grace Memorial Chapel",
    date: "March 15, 2025",
    time: "10:00 AM",
    attendees: 120,
    status: "Confirmed",
    services: {
      casket: "Premium Mahogany",
      flowers: "White Lilies & Roses",
      memorial: "Digital Memorial Service",
    },
    additionalNotes:
      "Family requests privacy during the service. Digital memorial link will be shared with attendees.",
    totalPrice: 8500,
    image:
      "https://media.istockphoto.com/id/1447462464/photo/close-up-of-person-in-black-praying-at-outdoor-funeral.jpg?s=612x612&w=0&k=20&c=NQWKq6W8KemPyFuV9gtiPo7md4vskgiF1l5iQfj1MlU=",
  },
  {
    id: 2,
    deceasedName: "Robert Wilson",
    customerName: "Emily Wilson",
    customerEmail: "emily.wilson@email.com",
    customerPhone: "+1 (555) 234-5678",
    location: "Eternal Peace Cemetery",
    date: "March 16, 2025",
    time: "2:30 PM",
    attendees: 80,
    status: "Pending",
    services: {
      casket: "Classic Oak",
      flowers: "Mixed Seasonal Bouquet",
      memorial: "Traditional Service",
    },
    additionalNotes:
      "Please arrange for live music during the service. Family prefers classical compositions.",
    totalPrice: 6800,
    image:
      "https://honeywell.scene7.com/is/image/honeywell/hon-corp-commercial-buildings-tab6",
  },
  {
    id: 3,
    deceasedName: "Maria Rodriguez",
    customerName: "Carlos Rodriguez",
    customerEmail: "carlos.rodriguez@email.com",
    customerPhone: "+1 (555) 345-6789",
    location: "Sacred Heart Church",
    date: "March 17, 2025",
    time: "11:15 AM",
    attendees: 150,
    status: "Confirmed",
    services: {
      casket: "Silver Steel",
      flowers: "Red & White Roses",
      memorial: "Hybrid Service",
    },
    additionalNotes:
      "Bilingual service requested. Please ensure all materials are available in both English and Spanish.",
    totalPrice: 7200,
    image:
      "https://images.unsplash.com/photo-1490122417551-6ee9691429d0?auto=format&fit=crop&q=80&w=1000",
  },
];

function Modal({
  booking,
  onClose,
  isTrack,
  setIsTrack,
}: {
  booking: (typeof bookings)[0];
  onClose: () => void;
  isTrack: boolean;
  setIsTrack: (isTrack:boolean)=>void;
  }) {
  console.log("booking", booking);
  
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div
        className="bg-gray-800/90 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
        style={{
          boxShadow:
            "0 8px 32px -4px rgba(0, 0, 0, 0.3), 0 4px 16px -2px rgba(0, 0, 0, 0.15)",
        }}
      >
        <div className="relative h-64">
          <img
            src={booking.image}
            alt={booking.deceasedName}
            className="w-full h-full object-cover rounded-t-3xl"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent rounded-t-3xl" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-all duration-300"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="absolute bottom-4 left-6">
            <div className="flex items-center gap-2 text-white/80 text-sm">
              <Heart className="w-4 h-4 text-sky-400" />
              <span>In Memory of</span>
            </div>
            <h2 className="text-3xl font-semibold text-white mt-1">
              {booking.deceasedName}
            </h2>
          </div>
        </div>

        <div className="p-6 space-y-8">
          {isTrack ? (
            <div className="">
              <Map />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">
                    Customer Information
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center dark:text-gray-300">
                      <User className="w-4 h-4 mr-3 text-sky-400" />
                      <span>{booking.customerName}</span>
                    </div>
                    <div className="flex items-center dark:text-gray-300">
                      <Mail className="w-4 h-4 mr-3 text-sky-400" />
                      <span>{booking.customerEmail}</span>
                    </div>
                    <div className="flex items-center dark:text-gray-300">
                      <Phone className="w-4 h-4 mr-3 text-sky-400" />
                      <span>{booking.customerPhone}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">
                    Service Details
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center dark:text-gray-300">
                      <MapPin className="w-4 h-4 mr-3 text-sky-400" />
                      <span>{booking.location}</span>
                    </div>
                    <div className="flex items-center dark:text-gray-300">
                      <CalendarDays className="w-4 h-4 mr-3 text-sky-400" />
                      <span>
                        {booking.date} at {booking.time}
                      </span>
                    </div>
                    <div className="flex items-center dark:text-gray-300">
                      <UserPlus className="w-4 h-4 mr-3 text-sky-400" />
                      <span>{booking.attendees} Expected Attendees</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">
                    Selected Services
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center dark:text-gray-300">
                      <Box className="w-4 h-4 mr-3 text-sky-400" />
                      <span>Casket: {booking.services.casket}</span>
                    </div>
                    <div className="flex items-center dark:text-gray-300">
                      <Flower2 className="w-4 h-4 mr-3 text-sky-400" />
                      <span>Flowers: {booking.services.flowers}</span>
                    </div>
                    <div className="flex items-center dark:text-gray-300">
                      <Church className="w-4 h-4 mr-3 text-sky-400" />
                      <span>Memorial: {booking.services.memorial}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">
                    Additional Notes
                  </h3>
                  <p className="dark:text-gray-300 text-sm leading-relaxed">
                    {booking.additionalNotes}
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="border-t border-gray-700/30 pt-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-gray-400 text-sm">Total Amount</span>
                <div className="text-2xl font-semibold text-white mt-1">
                  ${booking.totalPrice.toLocaleString()}
                </div>
              </div>
              <div className="flex items-center gap-5">
                <span
                  className={`px-4 py-2 rounded-full text-sm border-r pr-5 ${
                    booking.status === "Confirmed"
                      ? "bg-green-500/20 text-green-300"
                      : "bg-yellow-500/20 text-yellow-300"
                  }`}
                >
                  {booking.status}
                </span>
                {booking?.status === "Pending" && (
                  <button
                    onClick={() => setIsTrack(!isTrack)}
                    className="text-sky-500 font-medium bg-sky-70s0/10 py-3 px-5 rounded-full flex items-center gap-2 cursor-pointer"
                  >
                    <MapPin
                      size={20}
                      className="animate-bounce bg-transparent rounded-full shadow-xl shadow-sky-500"
                    />
                    {isTrack ? "Close Track" : "Track Booked"}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Booking() {
  const [selectedBooking, setSelectedBooking] = useState<
    (typeof bookings)[0] | null
    >(null);
  const [isTrack, setIsTrack] = useState<boolean>(false)

  return (
    <div className="relative ">
      <div className="container px-5 mx-auto">
        <div className="flex justify-between items-center mb-12">
          <TitlePage
            label="My Bookings"
          />
          <div className="relative flex items-center gap-5 mb-7">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search bookings..."
                className="w-full bg-gray-800/50 border border-gray-700/30 rounded-xl pl-10 pr-4 py-2 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/30"
              />
            </div>

            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select className="w-full bg-gray-800/50 border border-gray-700/30 rounded-xl pl-10 pr-4 py-2 text-gray-300 appearance-none focus:outline-none focus:ring-2 focus:ring-purple-500/30">
                <option value="">All Locations</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>

            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select className="w-full bg-gray-800/50 border border-gray-700/30 rounded-xl pl-10 pr-4 py-2 text-gray-300 appearance-none focus:outline-none focus:ring-2 focus:ring-purple-500/30">
                <option value="">All Statuses</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="group relative dark:bg-gray-800/40 backdrop-blur-xl shadow-xl shadow-black/10 rounded-3xl overflow-hidden border border-gray-700/30"
              //
            >
              <div className="absolute top-4 right-4 z-10 flex gap-2">
                <button className="bg-sky-500/50 hover:bg-sky-500/30 text-white-300 p-2 rounded-full transition-all duration-300">
                  <MessageSquare className="w-5 h-5" />
                </button>
                <button className="bg-red-500/50 hover:bg-red-500/30 text-white-300 p-2 rounded-full transition-all duration-300">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="relative h-48">
                <img
                  src="https://media.istockphoto.com/id/1447462464/photo/close-up-of-person-in-black-praying-at-outdoor-funeral.jpg?s=612x612&w=0&k=20&c=NQWKq6W8KemPyFuV9gtiPo7md4vskgiF1l5iQfj1MlU="
                  alt={booking.deceasedName}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center gap-2 text-white/80 text-sm">
                    <Heart className="w-4 h-4 text-sky-400" />
                    <span>In Memory of</span>
                  </div>
                  <h2 className="text-2xl font-semibold text-white mt-1">
                    {booking.deceasedName}
                  </h2>
                </div>
              </div>

              <div className="p-6 space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center dark:text-gray-300">
                      <Users className="w-4 h-4 mr-2 text-sky-400" />
                      <span className="text-xs">
                        Arranged by: {booking.customerName}
                      </span>
                    </div>

                    <div className="flex items-center dark:text-gray-300 text-xs tracking-wider">
                      <MapPin className="w-4 h-4 mr-2 text-sky-400" />
                      {booking.location}
                    </div>

                    <div className="flex items-center dark:text-gray-300 text-xs tracking-wider">
                      <Calendar className="w-4 h-4 mr-2 text-sky-400" />
                      {booking.date}
                    </div>

                    <div className="flex items-center dark:text-gray-300 text-xs tracking-wider">
                      <Clock className="w-4 h-4 mr-2 text-sky-400" />
                      {booking.time}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center dark:text-gray-300 text-xs tracking-wider">
                      <Box className="w-4 h-4 mr-2 text-sky-400" />
                      {booking.services.casket}
                    </div>

                    <div className="flex items-center dark:text-gray-300 text-xs tracking-wider">
                      <Flower2 className="w-4 h-4 mr-2 text-sky-400" />
                      {booking.services.flowers}
                    </div>

                    <div className="flex items-center dark:text-gray-300 text-xs tracking-wider">
                      <Church className="w-4 h-4 mr-2 text-sky-400" />
                      {booking.services.memorial}
                    </div>

                    <div className="flex items-center dark:text-gray-300 text-xs tracking-wider">
                      <DollarSign className="w-4 h-4 mr-2 text-sky-400" />$
                      {booking.totalPrice.toLocaleString()}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-700/30">
                  <div className="flex items-center justify-between">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        booking.status === "Confirmed"
                          ? "bg-green-500/20 text-green-300"
                          : "bg-yellow-500/20 text-yellow-300"
                      }`}
                    >
                      {booking.status}
                    </span>
                    <button
                      onClick={() => setSelectedBooking(booking)}
                      className="bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-full text-sm transition-all duration-300 shadow-2xl shadow-sky-500/50"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>

              <div className="absolute inset-0 border-2 border-transparent group-hover:border-sky-500/30 rounded-3xl pointer-events-none transition-colors duration-300" />
            </div>
          ))}
        </div>
      </div>

      {selectedBooking && (
        <Modal
          booking={selectedBooking}
          onClose={() => setSelectedBooking(null)}
          isTrack={isTrack}
          setIsTrack={setIsTrack}
        />
      )}
    </div>
  );
}

export default Booking;
