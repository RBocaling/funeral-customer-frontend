import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Mail, Heart, ChevronRight, Phone, MapPin } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import TitlePage from "@/components/ui/title-page";
import { familyMembers } from "@/lib/mockdata";

const FamilyMembers = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="space-y-8 container px-5 mx-auto ">
      <div className="relative ">
        <div className="relative  flex flex-col md:flex-row gap-5 md:items-center md:justify-between">
          <TitlePage
            label="Family Members"
            description="Manage your family members and send invitations"
          />
          <Button onClick={() => setOpen(true)}>Add New Member</Button>
        </div>
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
                <Label htmlFor="title"> Relation</Label>
                <Select>
                  <SelectTrigger className="w-full py-7 rounded-2xl">
                    <SelectValue placeholder="Select a Services" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Services</SelectLabel>
                      <SelectItem value="apple">Casket</SelectItem>
                      <SelectItem value="banana">Flower</SelectItem>
                      <SelectItem value="banana">Memorial</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="title">Name</Label>
                <Input
                  id="title"
                  placeholder="Enter the title of your service"
                  className="w-full py-4"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="title">Email</Label>
                <Input
                  id="title"
                  placeholder="Enter the title of your email"
                  className="w-full py-4"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Describe (optional)</Label>
                <Textarea
                  id="description"
                  placeholder="Add details about the service"
                  className="min-h-[100px] rounded-2xl"
                />
              </div>
            </div>

            <DialogFooter className="px-6 py-4 border-t">
              <div className="flex justify-end w-full gap-2">
                <Button variant="outline">Cancel</Button>
                <Button className="rounded-full">Add Now</Button>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {familyMembers.map((member) => (
          <div
            key={member.id}
            className="dark:bg-gray-800/40 backdrop-blur-sm rounded-3xl pt-0 overflow-hidden pb-6 border border-gray-700/30 shadow-xl shadow-black/10"
          >
            <div className="p-4">
              <div className="flex items-center gap-4">
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-gray-600"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-lg font-semibold text-white">
                        {member.name}
                      </h2>
                      <div className="flex items-center gap-2 mt-1">
                        <Heart className="w-4 h-4 text-red-400" />
                        <span className="text-sm text-gray-400">
                          {member.relation}
                        </span>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-500" />
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-300">
                      <Phone className="w-4 h-4 text-sky-400" />
                      <span>{member.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-300">
                      <Mail className="w-4 h-4 text-sky-400" />
                      <span>{member.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-300">
                      <MapPin className="w-4 h-4 text-sky-400" />
                      <span>{member.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FamilyMembers;
