import { useState } from "react";
import { format } from "date-fns";
import {
  Calendar,
  Plus,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OnlineBurialCard from "@/components/online-burial/OnlineBurialCard";
import TitlePage from "@/components/ui/title-page";
import { mockPreviousStreams, mockUpcomingStreams } from "@/lib/mockdata";
import CreateStreamModal from "@/components/online-burial/CreateStreamModal";
import ViewStreamModal from "@/components/online-burial/ViewStreamModal";

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

      {/* create streaam */}
      <CreateStreamModal
        activeStep={activeStep}
        createModalOpen={createModalOpen}
        handleEndLive={handleEndLive}
        handleNextStep={handleNextStep}
        handlePrevStep={handlePrevStep}
        handleStartLive={handleStartLive}
        isMuted={isMuted}
        isRecording={isRecording}
        isVideoOff={isVideoOff}
        newStream={newStream}
        setCreateModalOpen={setCreateModalOpen}
        setIsMuted={setIsMuted}
        setIsVideoOff={setIsVideoOff}
        setNewStream={setNewStream}
      />

      {/* View Stream Modal */}
      <ViewStreamModal currentStream={currentStream} handleEndLive={handleEndLive} handleStartLive={handleStartLive} isMuted={isMuted} isRecording={isRecording} isVideoOff={isVideoOff} setIsMuted={setIsMuted} setIsVideoOff={setIsVideoOff} setViewModalOpen={setViewModalOpen} viewModalOpen={viewModalOpen}  />
    </div>
  );
};
export default onlineBurial;
