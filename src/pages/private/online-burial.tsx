import { useState } from "react";
import { useLocation } from "wouter";
import { format } from "date-fns";
import {
  Calendar,
  Eye,
  Plus,
  Search,
  Video,
  X,
  Play,
  Share2,
  Users,
  Lock,
  MicOff,
  Mic,
  VideoOff,
  PhoneOff,
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import Stepper from "@/components/ui/stepper";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import OnlineBurialCard from "@/components/online-burial/OnlineBurialCard";
import TitlePage from "@/components/ui/title-page";

// Mock data for previous live streams
const mockPreviousStreams = [
  {
    id: "1",
    title: "Memorial Service for Maria Santos",
    description: "Family memorial service for our beloved mother",
    dateCreated: "2025-02-15T14:30:00",
    thumbnail: "",
    isPrivate: true,
    viewers: 24,
    duration: "1h 45m",
  },
  {
    id: "2",
    title: "Prayer Vigil for Pedro Reyes",
    description: "Evening prayer vigil with family and friends",
    dateCreated: "2025-03-01T19:00:00",
    thumbnail: "",
    isPrivate: false,
    viewers: 56,
    duration: "2h 10m",
  },
  {
    id: "3",
    title: "Funeral Mass for Antonio Cruz",
    description: "Celebration of life for our loving father and grandfather",
    dateCreated: "2025-03-28T10:00:00",
    thumbnail: "",
    isPrivate: false,
    viewers: 112,
    duration: "2h 30m",
  },
];

// Mock data for upcoming live streams
const mockUpcomingStreams = [
  {
    id: "4",
    title: "Memorial Service for Juan Dela Cruz",
    description: "A celebration of life for our beloved father",
    scheduledDate: "2025-04-08T15:00:00",
    thumbnail: "",
    isPrivate: false,
  },
];

const onlineBurial = () => {
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [currentStream, setCurrentStream] = useState<any>(null);
  const [activeStep, setActiveStep] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);

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

  const handleNextStep = () => {
    if (activeStep < 2) {
      setActiveStep(activeStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (activeStep > 1) {
      setActiveStep(activeStep - 1);
    }
  };

  const handleStartLive = () => {
    setIsRecording(true);
  };

  const handleEndLive = () => {
    setIsRecording(false);
    setViewModalOpen(false);
  };

  return (
    <div className="space-y-6 container mx-auto px-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 ">
        <TitlePage
          label="Online Burol"
          description="Create and manage virtual funeral services for distant family
            members"
        />
        <div className="flex items-center gap-2 mt-4 sm:mt-0">
          {/* Search */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search live streams..."
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
            Create Live Stream
          </Button>
        </div>
      </div>

      <Tabs defaultValue="upcoming" className="w-full">
        <div className="flex items-center gap-7 mb-6">
          <TabsList>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="previous">Previous</TabsTrigger>
          </TabsList>
          <Button variant="outline" size="sm" className="rounded-full">
            <Calendar className="h-4 w-4 mr-2" />
            {format(new Date(), "MMM dd, yyyy")}
          </Button>
        </div>

        <TabsContent value="upcoming">
          <OnlineBurialCard
            type="upcoming"
            data={mockUpcomingStreams}
            searchQuery=""
            handleCreateStream={handleCreateStream}
            handleViewStream={handleViewStream}
          />
        </TabsContent>

        <TabsContent value="previous">
          <OnlineBurialCard
            type="previous"
            data={mockPreviousStreams}
            searchQuery=""
            handleCreateStream={handleCreateStream}
            handleViewStream={handleViewStream}
          />
        </TabsContent>
      </Tabs>

      {/* Create Stream Modal */}
      <Dialog open={createModalOpen} onOpenChange={setCreateModalOpen}>
        <DialogContent className="sm:max-w-[600px] p-0 rounded-2xl overflow-hidden">
          <DialogHeader className="p-6 pb-0">
            <DialogTitle className="text-xl">Create Online Burol</DialogTitle>
            <DialogDescription>
              Set up a virtual funeral service for remote family and friends
            </DialogDescription>
          </DialogHeader>

          <div className="px-6 py-4">
            <Stepper
              steps={[
                {
                  number: 1,
                  title: "Stream Details",
                  completed: activeStep > 1,
                  active: activeStep === 1,
                },
                {
                  number: 2,
                  title: "Go Live",
                  completed: false,
                  active: activeStep === 2,
                },
              ]}
              className="mb-6"
            />

            {activeStep === 1 && (
              <div className="space-y-4">
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
                    className="min-h-[100px]"
                    value={newStream.description}
                    onChange={(e) =>
                      setNewStream({
                        ...newStream,
                        description: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="date">Date & Time</Label>
                  <Input
                    id="date"
                    type="datetime-local"
                    value={newStream.scheduledDate.slice(0, 16)}
                    onChange={(e) =>
                      setNewStream({
                        ...newStream,
                        scheduledDate: new Date(e.target.value).toISOString(),
                      })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="private"
                        checked={newStream.isPrivate}
                        onCheckedChange={(checked) =>
                          setNewStream({ ...newStream, isPrivate: checked })
                        }
                      />
                      <Label htmlFor="private">Private Stream</Label>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Only people with the password can join
                    </p>
                  </div>

                  {newStream.isPrivate && (
                    <div className="w-32">
                      <Input
                        type="password"
                        placeholder="Password"
                        value={newStream.password}
                        onChange={(e) =>
                          setNewStream({
                            ...newStream,
                            password: e.target.value,
                          })
                        }
                      />
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeStep === 2 && (
              <div className="space-y-4">
                <div className="rounded-xl bg-gray-100 dark:bg-gray-800 h-[300px] flex items-center justify-center">
                  {isRecording ? (
                    <div className="relative w-full h-full">
                      <div className="flex flex-col items-center justify-center h-full">
                        <div className="h-16 w-16 rounded-full bg-primary/10 border-4 border-primary animate-pulse flex items-center justify-center">
                          <Video className="h-8 w-8 text-primary" />
                        </div>
                        <p className="mt-4 text-center text-primary font-semibold">
                          <span className="animate-pulse">●</span> Live Now
                        </p>
                      </div>

                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="rounded-full bg-gray-800/80 text-white hover:bg-gray-800 hover:text-white border-none"
                          onClick={() => setIsMuted(!isMuted)}
                        >
                          {isMuted ? (
                            <MicOff className="h-4 w-4" />
                          ) : (
                            <Mic className="h-4 w-4" />
                          )}
                        </Button>

                        <Button
                          variant="outline"
                          size="icon"
                          className="rounded-full bg-gray-800/80 text-white hover:bg-gray-800 hover:text-white border-none"
                          onClick={() => setIsVideoOff(!isVideoOff)}
                        >
                          {isVideoOff ? (
                            <VideoOff className="h-4 w-4" />
                          ) : (
                            <Video className="h-4 w-4" />
                          )}
                        </Button>

                        <Button
                          size="icon"
                          className="rounded-full bg-red-500 hover:bg-red-600 text-white"
                          onClick={handleEndLive}
                        >
                          <PhoneOff className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="absolute top-4 right-4">
                        <Badge className="bg-red-500 text-white animate-pulse flex items-center gap-1 px-3 py-1">
                          Live
                        </Badge>
                      </div>

                      {/* <div className="absolute bottom-4 right-4 flex space-x-2">
                        <Avatar className="h-8 w-8 border-2 border-white">
                          <AvatarFallback>U1</AvatarFallback>
                        </Avatar>
                        <Avatar className="h-8 w-8 border-2 border-white">
                          <AvatarFallback>U2</AvatarFallback>
                        </Avatar>
                        <Badge className="bg-gray-800/80 text-white">+3</Badge>
                      </div> */}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center text-center px-4">
                      <Video className="h-16 w-16 text-gray-400 mb-4" />
                      <h3 className="font-semibold text-lg mb-1">
                        Ready to Start
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4 max-w-md">
                        Your camera and microphone will activate when you start
                        the stream.
                      </p>
                      <Button
                        onClick={handleStartLive}
                        className="rounded-full bg-primary/90 hover:bg-primary"
                      >
                        <Play className="h-4 w-4 mr-2" /> Go Live Now
                      </Button>
                    </div>
                  )}
                </div>

                <div className="p-4 rounded-lg bg-muted">
                  <h4 className="font-medium mb-2">Stream Information</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="text-muted-foreground">Title:</p>
                      <p className="font-medium">{newStream.title}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Privacy:</p>
                      <p className="font-medium">
                        {newStream.isPrivate ? "Private" : "Public"}
                      </p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-muted-foreground">Description:</p>
                      <p className="font-medium">{newStream.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
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
                <Button
                  onClick={handleNextStep}
                  disabled={
                    !newStream.title ||
                    (!newStream.password && newStream.isPrivate)
                  }
                >
                  Next
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
              <div className="relative">
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-2 z-10 rounded-full bg-black/50 text-white hover:bg-black/70 hover:text-white"
                  onClick={() => !isRecording && setViewModalOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>

                <div className="h-[400px] bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                  {isRecording ? (
                    <div className="relative w-full h-full">
                      <div className="flex flex-col items-center justify-center h-full">
                        <div className="h-20 w-20 rounded-full bg-primary/10 border-4 border-primary animate-pulse flex items-center justify-center">
                          <Video className="h-10 w-10 text-primary" />
                        </div>
                        <p className="mt-4 text-center text-primary font-semibold">
                          <span className="animate-pulse">●</span> Live Now
                        </p>
                      </div>

                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center space-x-3">
                        <Button
                          variant="outline"
                          size="icon"
                          className="rounded-full bg-gray-800/80 text-white hover:bg-gray-800 hover:text-white border-none h-10 w-10"
                          onClick={() => setIsMuted(!isMuted)}
                        >
                          {isMuted ? (
                            <MicOff className="h-4 w-4" />
                          ) : (
                            <Mic className="h-4 w-4" />
                          )}
                        </Button>

                        <Button
                          variant="outline"
                          size="icon"
                          className="rounded-full bg-gray-800/80 text-white hover:bg-gray-800 hover:text-white border-none h-10 w-10"
                          onClick={() => setIsVideoOff(!isVideoOff)}
                        >
                          {isVideoOff ? (
                            <VideoOff className="h-4 w-4" />
                          ) : (
                            <Video className="h-4 w-4" />
                          )}
                        </Button>

                        <Button
                          size="icon"
                          className="rounded-full bg-red-500 hover:bg-red-600 text-white h-12 w-12"
                          onClick={handleEndLive}
                        >
                          <PhoneOff className="h-5 w-5" />
                        </Button>
                      </div>

                      <div className="absolute top-4 right-4">
                        <Badge className="bg-red-500 text-white animate-pulse flex items-center gap-1 px-3 py-1">
                          Live
                        </Badge>
                      </div>

                      <div className="absolute bottom-4 right-4 flex space-x-2">
                        <Avatar className="h-8 w-8 border-2 border-white">
                          <AvatarFallback>U1</AvatarFallback>
                        </Avatar>
                        <Avatar className="h-8 w-8 border-2 border-white">
                          <AvatarFallback>U2</AvatarFallback>
                        </Avatar>
                        <Badge className="bg-gray-800/80 text-white">+6</Badge>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center text-center px-4">
                      <Video className="h-16 w-16 text-gray-400 mb-4" />
                      <h3 className="font-semibold text-lg mb-1">
                        {currentStream.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4 max-w-md">
                        {currentStream.description}
                      </p>

                      {currentStream.isPrivate && (
                        <div className="bg-gray-200 dark:bg-gray-700 p-3 rounded-lg mb-4 flex items-center">
                          <Lock className="h-4 w-4 mr-2 text-amber-500" />
                          <span className="text-sm">
                            This is a private stream and requires a password to
                            join
                          </span>
                        </div>
                      )}

                      <Button
                        onClick={handleStartLive}
                        className="rounded-full bg-primary/90 hover:bg-primary"
                      >
                        <Play className="h-4 w-4 mr-2" /> Join Stream
                      </Button>
                    </div>
                  )}
                </div>
              </div>

              <div className="p-6">
                <h2 className="text-xl font-semibold mb-2">
                  {currentStream.title}
                </h2>
                <p className="text-muted-foreground mb-4">
                  {currentStream.description}
                </p>

                <div className="flex flex-wrap gap-3">
                  <div className="bg-muted rounded-full px-3 py-1 text-sm flex items-center">
                    <Calendar className="h-3.5 w-3.5 mr-1.5" />
                    {format(
                      new Date(
                        currentStream.scheduledDate || currentStream.dateCreated
                      ),
                      "MMM dd, h:mm a"
                    )}
                  </div>

                  <div className="bg-muted rounded-full px-3 py-1 text-sm flex items-center">
                    {currentStream.isPrivate ? (
                      <>
                        <Lock className="h-3.5 w-3.5 mr-1.5" /> Private
                      </>
                    ) : (
                      <>
                        <Eye className="h-3.5 w-3.5 mr-1.5" /> Public
                      </>
                    )}
                  </div>

                  {currentStream.viewers && (
                    <div className="bg-muted rounded-full px-3 py-1 text-sm flex items-center">
                      <Users className="h-3.5 w-3.5 mr-1.5" />
                      {currentStream.viewers} viewers
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default onlineBurial;
