import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
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
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { UserPlus, Mail, MoreVertical, Activity, Users, Heart, ChevronRight, Phone, MapPin } from "lucide-react";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import TitlePage from "@/components/ui/title-page";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  relation: z.string().min(1, {
    message: "Please select a relation.",
  }),
});

const FamilyMembers = () => {
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      relation: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    toast.success("Invitation sent successfully!");
    setOpen(false);
    form.reset();
  };
const familyMembers = [
  {
    id: 1,
    name: "Juan Dela Cruz",
    relation: "Grand Father",
    phone: "+1 (555) 123-4567",
    email: "juan.t@example.com",
    location: "San Francisco, CA",
    avatar:
      "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?&w=150&h=150&fit=crop",
  },
  {
    id: 2,
    name: "John Dela Cruz",
    relation: "Father",
    phone: "+1 (555) 234-5678",
    email: "john.t@example.com",
    location: "San Francisco, CA",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?&w=150&h=150&fit=crop",
  },
  {
    id: 3,
    name: "Sarah Dela Cruz",
    relation: "Sister",
    phone: "+1 (555) 345-6789",
    email: "sarah.t@example.com",
    location: "Los Angeles, CA",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?&w=150&h=150&fit=crop",
  },
  {
    id: 4,
    name: "Michael Dela Cruz",
    relation: "Brother",
    phone: "+1 (555) 456-7890",
    email: "michael.t@example.com",
    location: "New York, NY",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?&w=150&h=150&fit=crop",
  },
];




  return (
    <div className="space-y-8 container px-5 mx-auto ">
      <div className="relative ">
        <div className="relative  flex items-center justify-between">
        
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
