import { useState } from "react";
import {
  Eye,
  Plus,
  Search,
  X,
  Play,
  Lock,
  Trash2,
  PencilLine,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";

const data = [
  {
    id: "1",
    title: "Final Resting Cradle of Peace",
    description: "Crafted with elegance to honor a life well lived.",
    scheduledDate: "2025-04-08T15:00:00",
    thumbnail: "",
    isPrivate: false,
    list: 10,
    type: "caskets",
  },
  {
    id: "2",
    title: "Floral Tribute for Juan Dela Cruz",
    description:
      "A graceful arrangement of blooms to symbolize love, remembrance, and peace.",
    scheduledDate: "2025-04-08T15:00:00",
    thumbnail: "",
    isPrivate: false,
    list: 10,
    type: "flowers",
  },
  {
    id: "3",
    title: "Memorial Setup for Juan Dela Cruz",
    description:
      "A heartfelt tribute space designed to reflect his legacy, love, and the memories he leaves behind.",
    scheduledDate: "2025-04-08T15:00:00",
    thumbnail: "",
    isPrivate: false,
    list: 10,
    type: "memorials",
  },
];

const funeralService = () => {
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [currentStream, setCurrentStream] = useState<any>(null);
  const [activeStep, setActiveStep] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [newStream, setNewStream] = useState({
    title: "",
    description: "",
    isPrivate: false,
    password: "",
    scheduledDate: new Date().toISOString(),
  });

  const handleCreateStream = () => {
    setNewStream({
      title: "",
      description: "",
      isPrivate: false,
      password: "",
      scheduledDate: new Date().toISOString(),
    });
    setActiveStep(1);
    setCreateModalOpen(true);
  };

  const handleViewStream = (stream: any) => {
    setCurrentStream(stream);
    setViewModalOpen(true);
  };



  const handlePrevStep = () => {
    if (activeStep > 1) {
      setActiveStep(activeStep - 1);
    }
  };

  const handleStartLive = () => {
    setIsRecording(true);
  };

 

  return (
    <div className="space-y-6 container mx-auto px-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 ">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Services</h1>
          <p className="text-muted-foreground mt-1">
            Create and manage funeral services for distant family members
          </p>
        </div>
        <div className="flex items-center gap-2 mt-4 sm:mt-0">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search services..."
              className="pl-10 rounded-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button
            onClick={handleCreateStream}
            size="sm"
            className="rounded-full bg-primary/90 hover:bg-primary"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Service
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {data
          ?.filter(
            (stream) =>
              stream.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
              stream.description
                .toLowerCase()
                .includes(searchQuery.toLowerCase())
          )
          .map((stream: any) => (
            <Card
              key={stream.id}
              className="overflow-hidden hover:shadow-md transition-shadow rounded-xl pt-0 relative"
            >
              <div className="relative h-48  flex items-center justify-center">
                {stream.isPrivate && (
                  <Badge className="absolute top-3 right-3 bg-gray-800/70 text-white dark:bg-gray-700 flex items-center gap-1 px-2 py-1">
                    <Lock className="h-3 w-3" /> Private
                  </Badge>
                )}

                <Badge className="absolute bottom-3 left-3 bg-gray-800 text-white flex items-center gap-1 whitespace-nowrap z-10 uppercase">
                  {stream.type}
                </Badge>

                {/* price */}
                <div className="absolute top-3 right-3 bg-white/70 dark:bg-black/50 backdrop-blur-md rounded-full px-3 py-1.5 text-sm font-semibold shadow-lg z-10">
                  <span className="flex items-center">{stream.list} pcs</span>
                </div>
                {/* bg */}
                <img
                  src={
                    stream?.type === "caskets"
                      ? "/casket1.jpg"
                      : stream?.type === "flowers"
                      ? "/flower2.webp"
                      : stream?.type === "memorials"
                      ? "/memorial.jpg"
                      : ""
                  }
                  className="w-full h-full object-cover transition-transform hover:scale-105 duration-700 absolute top-0 left-0 w-full h-full"
                />
              </div>
              <CardContent className="px-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold line-clamp-1">{stream.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {stream.description}
                </p>
                <div className="flex justify-between">
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-full text-xs flex gap-1 cursor-pointer"
                    onClick={() => handleViewStream(stream)}
                  >
                    <Eye className="h-3.5 w-3.5" /> View List
                  </Button>
                  <Button
                    size="sm"
                    className="rounded-full bg-red-600/10 hover:bg-red-600/30  text-xs text-red-500 cursor-pointer"
                    onClick={() => handleViewStream(stream)}
                  >
                    <Trash2 className="h-3.5 w-3.5 mr-1" /> Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}

        {/* Create New Card */}
        <Card
          className="overflow-hidden border-dashed border-2 hover:border-primary/50 transition-colors bg-transparent hover:bg-muted/30 rounded-xl cursor-pointer flex items-center justify-center"
          onClick={handleCreateStream}
        >
          <CardContent className="p-8 flex flex-col items-center justify-center text-center">
            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Plus className="h-8 w-8 text-primary" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Create New Service</h3>
            <p className="text-sm text-muted-foreground">
              Offer meaningful services—from elegant caskets to floral tributes
              and memorials—that honor the lives of loved ones with grace.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Create Stream Modal */}
      <Dialog open={createModalOpen} onOpenChange={setCreateModalOpen}>
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
              <Label htmlFor="title"> Service</Label>
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
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="Enter the title of your service"
                value={newStream.title}
                onChange={(e) =>
                  setNewStream({ ...newStream, title: e.target.value })
                }
                className="w-full py-4"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Add details about the service"
                className="min-h-[100px] rounded-2xl"
                value={newStream.description}
                onChange={(e) =>
                  setNewStream({
                    ...newStream,
                    description: e.target.value,
                  })
                }
              />
            </div>
          </div>

          <DialogFooter className="px-6 py-4 border-t">
            {activeStep === 1 ? (
              <div className="flex justify-end w-full gap-2">
                <Button
                  variant="outline"
                  onClick={() => setCreateModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button onClick={() => setCreateModalOpen(false)} className="rounded-full">
                  Add Now
                </Button>
              </div>
            ) : (
              <div className="flex justify-between w-full">
                <Button variant="outline" onClick={handlePrevStep}>
                  Back
                </Button>
                {!isRecording && (
                  <Button
                    onClick={handleStartLive}
                    className="rounded-full bg-primary/90 hover:bg-primary"
                  >
                    <Play className="h-4 w-4 mr-2" /> Go Live Now
                  </Button>
                )}
              </div>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Stream Modal */}
      <Dialog
        open={viewModalOpen}
        onOpenChange={(open) => !isRecording && setViewModalOpen(open)}
      >
        <DialogContent className="sm:max-w-[800px] p-0 rounded-2xl overflow-hidden">
          {currentStream && (
            <>
              <div className="relative bg-transparent bg-gray-100 dark:bg-gray-800 ">
                <h2 className="text-xl font-semibold mb-2 p-3">Casket List</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-2 z-10 rounded-full bg-black/50 text-white hover:bg-black/70 hover:text-white"
                  onClick={() => !isRecording && setViewModalOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>

                <div className="h-[400px] bg-gray-100 dark:bg-gray-800 flex items-center justify-center z-50">
                  <Carousel
                    opts={{
                      align: "start",
                    }}
                    className="w-full max-w-2xl z-20"
                  >
                    <CarouselContent>
                      {Array.from({ length: 5 }).map((_, index) => (
                        <CarouselItem
                          key={index}
                          className="md:basis-1/2 lg:basis-1/3 shadow-2xl shadow-violet-500/20"
                        >
                          <div className=" ">
                            <Card className="overflow-hidden flex flex-col h-full rounded-2xl border border-border/40 shadow-xl hover:shadow-2xl transition-all duration-300 pt-0">
                              <div className="relative h-32">
                                <img
                                  src={
                                    index === 0
                                      ? "https://www.ruebelfuneralhome.com/images/merchandise/metal/HP09-Mother.jpg"
                                      : index === 1
                                      ? "https://kingsfunerals.com.au/wp-content/uploads/2023/06/Aurelia_O.jpg"
                                      : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLFJSnQ7ENbpP5ugIgpuwp7pSSeRj6qUnXoOt4YnAYae1ZD7KnUelZi1T6F-DiWX5X0VI&usqp=CAU"
                                  }
                                  className="w-full h-full object-cover transition-transform hover:scale-105 duration-700"
                                />

                                <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-black/60 to-transparent"></div>
                              </div>

                              <CardContent className="px-2 flex-grow py-0">
                                <div className="flex items-center  justify-between gap-7 px-2">
                                  <div className="top-3 right-3   text-sm font-semibold shadow-lg">
                                    <span className="flex items-center text-xs">
                                      Premium
                                    </span>
                                  </div>
                                  <div className="flex items-center justify-start gap-4">
                                    <button className="rounded-full   text-xs text-red-500 cursor-pointer">
                                      <Trash2 size={20} />{" "}
                                    </button>
                                    <button className="rounded-full   text-xs text-green-500 cursor-pointer">
                                      <PencilLine size={20} />{" "}
                                    </button>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                  </Carousel>
                </div>
                <img
                  src="/transparent-hive.png"
                  className="absolute top-0 left-0 opacity-20 w-full h-full"
                  alt=""
                />
              </div>

              <div className="p-6 flex items-start justify-between">
                <div className="flex flex-col gap-3">
                  <h2 className="text-xl font-semibold mb-2">
                    {currentStream.title}
                  </h2>
                  <p className="text-muted-foreground mb-4">
                    {currentStream.description}
                  </p>
                </div>
                <div className="flex items-center gap-5">
                  <Button
                    size="sm"
                    className="rounded-full bg-red-600/10 hover:bg-red-600/30  text-xs text-red-500 cursor-pointer"
                  >
                    <Trash2 className="h-3.5 w-3.5 mr-1" /> Delete All
                  </Button>
                  <Button className="rounded-full font-medium ">
                    Add Casket
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default funeralService;
