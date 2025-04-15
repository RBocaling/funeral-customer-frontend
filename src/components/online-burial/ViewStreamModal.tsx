import { Dialog, DialogContent } from "../ui/dialog";
import { Button } from "../ui/button";
import {
  Calendar,
  Eye,
  Lock,
  Mic,
  MicOff,
  PhoneOff,
  Play,
  Users,
  Video,
  VideoOff,
  X,
} from "lucide-react";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { format } from "date-fns";

const ViewStreamModal = ({
  viewModalOpen,
  isRecording,
  setViewModalOpen,
  currentStream,
  setIsMuted,
  isMuted,
  setIsVideoOff,
  isVideoOff,
  handleEndLive,
  handleStartLive,
}:{
    viewModalOpen: boolean,
    isRecording: boolean,
    setViewModalOpen:any,
    currentStream:any,
    setIsMuted:any,
    isMuted:any,
    setIsVideoOff:any,
    isVideoOff:any,
    handleEndLive:any,
    handleStartLive:any,
  }) => {
  return (
    <div>
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

export default ViewStreamModal;
