import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import Stepper from "../ui/stepper";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Switch } from "../ui/switch";
import { Mic, MicOff, PhoneOff, Play, Video, VideoOff } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

const CreateStreamModal = ({
  newStream,
  createModalOpen,
  setCreateModalOpen,
  activeStep,
  setNewStream,
  isRecording,
  setIsMuted,
  isMuted,
  setIsVideoOff,
  isVideoOff,
  handleEndLive,
  handleStartLive,
  handleNextStep,
  handlePrevStep,
}: {
  newStream: any;
  createModalOpen: boolean;
  setCreateModalOpen: any;
  activeStep: any;
  setNewStream: any;
  isRecording: any;
  setIsMuted: any;
  isMuted: any;
  setIsVideoOff: any;
  isVideoOff: any;
  handleEndLive: any;
  handleStartLive: any;
  handleNextStep: any;
  handlePrevStep: any;
}) => {
  return (
    <div>
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
    </div>
  );
};

export default CreateStreamModal;
