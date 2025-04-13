import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Label } from "../ui/label";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { MapPin } from "lucide-react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";
const PersonalInfo = ({ open, setOpen }: any) => {
  const [isOpenMap, setIsOpenMap] = useState<boolean>(false);
  const manilaCoords = { lat: 14.5995, lng: 120.9842 };
  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[600px] p-0 rounded-2xl overflow-hidden">
          <DialogHeader className="p-6 pb-0">
            <DialogTitle className="text-xl">Create Service</DialogTitle>
            <DialogDescription>
              Create a meaningful tribute with our personalized memorial
              services, honoring the unique life and legacy of your loved one.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 p-7">
            <div className="space-y-2">
              <Label htmlFor="title">Full Name</Label>
              <div className="flex items-center gap-5">
                <Input
                  id="firstname"
                  placeholder="Enter your firstname"
                  className="w-full py-4"
                />
                <Input
                  id="lastname"
                  placeholder="Enter your lastname"
                  className="w-full py-4"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="title">Email</Label>
              <Input
                id="title"
                placeholder="Enter your email"
                className="w-full py-4"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="title">Contact No</Label>
              <Input
                id="title"
                placeholder="Enter your Contact No."
                className="w-full py-4"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="title">Address</Label>
                <button
                  onClick={() => setIsOpenMap(!isOpenMap)}
                  className="text-sky-500 font-medium bg-sky-70s0/10 py-3 px-5 rounded-full flex items-center gap-2 cursor-pointer"
                >
                  {!isOpenMap && (
                    <MapPin
                      size={20}
                      className="animate-bounce bg-transparent rounded-full shadow-xl shadow-sky-500"
                    />
                  )}

                  {isOpenMap ? "Set Manually" : "Use Map"}
                </button>
              </div>
              {isOpenMap ? (
                <div className="rounded-3xl overflow-hidden w-full h-[250px]">
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
                        iconUrl:
                          "https://cdn-icons-png.flaticon.com/512/684/684908.png",
                        iconSize: [32, 32],
                        iconAnchor: [16, 32],
                      })}
                    >
                      <Popup>Funeral Service Center - Manila</Popup>
                    </Marker>
                  </MapContainer>
                </div>
              ) : (
                <div className="flex items-center gap-5">
                  <Input
                    id="city"
                    placeholder="Enter City"
                    className="w-full py-4"
                  />
                  <Input
                    id="barangay"
                    placeholder="Enter Barangay"
                    className="w-full py-4"
                  />
                  <Input
                    id="purok"
                    placeholder="Enter Purok"
                    className="w-full py-4"
                  />
                </div>
              )}
            </div>
          </div>

          <DialogFooter className="px-6 py-4 border-t">
            <div className="flex justify-end w-full gap-2">
              <Button variant="outline">Cancel</Button>
              <Button className="rounded-full">Submit</Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PersonalInfo;
