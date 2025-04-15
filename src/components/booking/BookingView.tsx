import { bookings } from "@/lib/mockdata";
import { Box, CalendarDays, Church, Flower2, Heart, Mail, MapPin, Phone, User, UserPlus, X } from "lucide-react";
import Map from "./Map";

const BookingView = ({
    booking,
    onClose,
    isTrack,
    setIsTrack,
  }: {
    booking: (typeof bookings)[0];
    onClose: () => void;
    isTrack: boolean;
    setIsTrack: (isTrack:boolean)=>void;
    }) => {
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
  
export default BookingView