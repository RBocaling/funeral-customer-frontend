import { useState } from "react";
import {
  Calendar,
  MapPin,
  Users,
  MessageSquare,
  X,
  Flower2,
  Box,
  Church,
  DollarSign,
  Clock,
  Heart,
  Search,
  Filter,
  ChevronDown,
} from "lucide-react";
import TitlePage from "@/components/ui/title-page";
import { bookings } from "@/lib/mockdata";
import BookingView from "@/components/booking/BookingView";

function Booking() {
  const [selectedBooking, setSelectedBooking] = useState<
    (typeof bookings)[0] | null
  >(null);
  const [isTrack, setIsTrack] = useState<boolean>(false);

  return (
    <div className="relative ">
      <div className="container px-5 mx-auto">
        <div className="flex flex-col md:flex-row gap-5 md:justify-between md:items-center mb-12">
          <TitlePage label="My Bookings" />
          <div className="relative flex items-center gap-5 mb-3 md:mb-7">
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
        <BookingView
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
