import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Box, Check, Truck } from "lucide-react";
import BookingStatus from "./BookingStatus";

const manilaCoords = { lat: 14.5995, lng: 120.9842 };

const Map = () => {
  const steps = [
    {
      title: "Booking Confirmed",
      subtitle: "8:00 AM · Feb 8, 2023",
      icon: <Check className="w-5 h-5" />,
      status: "completed",
    },
    {
      title: "Preparing Items",
      subtitle: "Casket, Flowers & Setup",
      icon: <Truck className="w-5 h-5" />,
      status: "active",
    },
    {
      title: "Service Day",
      subtitle: "Estimated: Feb 15, 2023",
      icon: <Box className="w-5 h-5" />,
      status: "upcoming",
    },
  ];
  return (
    <div className="w-full h-[370px]  rounded-3xl  flex flex-col">
      <BookingStatus steps={steps} />

      <div className="rounded-3xl overflow-hidden w-full h-full">
        <MapContainer
          center={manilaCoords}
          zoom={13}
          scrollWheelZoom={false}
          className="h-full w-full"
        >
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker
            position={manilaCoords}
            icon={L.icon({
              iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
              iconSize: [32, 32],
              iconAnchor: [16, 32],
            })}
          >
            <Popup>Funeral Service Center - Manila</Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
};

export default Map;
