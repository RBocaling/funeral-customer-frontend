import {
  Eye,
  Lock,
  Play,
  Plus,
  Share2,
  Users,
  Video,
  Calendar,
} from "lucide-react";
import { Card, CardContent } from "../ui/card"
import { Badge } from "../ui/badge"
import { format } from "date-fns"
import { Button } from "../ui/button"
import { useLocation } from "wouter"

type PreviousType = {
  id: string;
  title: string;
  description: string;
  dateCreated: string;
  thumbnail: string;
  isPrivate: boolean;
  viewers: number;
  duration: string;
};

type UpcomingType = {
  id: string;
  title: string;
  description: string;
  scheduledDate: string;
  thumbnail: string;
  isPrivate: boolean;
};

type HandleCreateStream = () => void | Promise<void>;
type HandleViewStream = (id: any) => void | Promise<void>;

type PropsType =
  | {
      type: "previous";
      data: PreviousType[];
      searchQuery: string;
      handleCreateStream: HandleCreateStream;
      handleViewStream: HandleViewStream;
    }
  | {
      type: "upcoming";
      data: UpcomingType[];
      searchQuery: string;
      handleCreateStream: any;
      handleViewStream: HandleViewStream;
    };

const OnlineBurialCard = ({
  type,
  data,
  searchQuery,
  handleCreateStream,
  handleViewStream,
}: PropsType) => {
  const [_, navigate] = useLocation();
  return (
    <div>
      {type === "upcoming" ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {data
            ?.filter(
              (stream) =>
                stream.title
                  .toLowerCase()
                  .includes(searchQuery.toLowerCase()) ||
                stream.description
                  .toLowerCase()
                  .includes(searchQuery.toLowerCase())
            )
            .map((stream) => (
              <Card
                key={stream.id}
                className="dark:bg-gray-800/40 backdrop-blur-sm rounded-3xl pt-0 overflow-hidden pb-6 border border-gray-700/30 shadow-xl shadow-black/10"
              >
                <div className="relative h-48 bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                  {stream.thumbnail ? (
                    <img
                      src={stream.thumbnail}
                      alt={stream.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center">
                      <Video className="h-12 w-12 text-gray-400" />
                      <p className="text-sm text-gray-500 mt-2">
                        Scheduled Live
                      </p>
                    </div>
                  )}

                  {stream.isPrivate && (
                    <Badge className="absolute top-3 right-3 bg-gray-800/70 text-white dark:bg-gray-700 flex items-center gap-1 px-2 py-1">
                      <Lock className="h-3 w-3" /> Private
                    </Badge>
                  )}

                  <Badge className="absolute bottom-3 left-3 bg-gray-800 text-white flex items-center gap-1 whitespace-nowrap">
                    <Calendar className="h-3 w-3" />
                    {format(new Date(stream.scheduledDate), "MMM dd, h:mm a")}
                  </Badge>
                </div>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold line-clamp-1">
                      {stream.title}
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {stream.description}
                  </p>
                  <div className="flex justify-between">
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-full text-xs flex gap-1"
                      onClick={() => handleViewStream(stream)}
                    >
                      <Eye className="h-3.5 w-3.5" /> View Details
                    </Button>
                    <Button
                      size="sm"
                      className="rounded-full bg-primary/90 hover:bg-primary text-xs"
                      onClick={() => handleViewStream(stream)}
                    >
                      <Play className="h-3.5 w-3.5 mr-1" /> Join
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
              <h3 className="font-semibold text-lg mb-2">
                Create New Live Stream
              </h3>
              <p className="text-sm text-muted-foreground">
                Schedule a new virtual service for family and friends
              </p>
            </CardContent>
          </Card>
        </div>
      ) : type === "previous" ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {data
            ?.filter(
              (stream) =>
                stream.title
                  .toLowerCase()
                  .includes(searchQuery.toLowerCase()) ||
                stream.description
                  .toLowerCase()
                  .includes(searchQuery.toLowerCase())
            )
            .map((stream) => (
              <Card
                key={stream.id}
                className="dark:bg-gray-800/40 backdrop-blur-sm rounded-3xl pt-0 overflow-hidden pb-6 border border-gray-700/30 shadow-xl shadow-black/10"
              >
                <div className="relative h-48 bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                  {stream.thumbnail ? (
                    <img
                      src={stream.thumbnail}
                      alt={stream.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center">
                      <Video className="h-12 w-12 text-gray-400" />
                      <p className="text-sm text-gray-500 mt-2">Recorded</p>
                    </div>
                  )}

                  {stream.isPrivate && (
                    <Badge className="absolute top-3 right-3 bg-gray-800/70 text-white dark:bg-gray-700 flex items-center gap-1 px-2 py-1">
                      <Lock className="h-3 w-3" /> Private
                    </Badge>
                  )}

                  <Badge className="absolute bottom-3 right-3 bg-gray-700/80 text-white flex items-center gap-1">
                    <Users className="h-3 w-3" /> {stream.viewers}
                  </Badge>

                  <Badge className="absolute bottom-3 left-3 bg-gray-700/80 text-white">
                    {stream.duration}
                  </Badge>
                </div>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold line-clamp-1">
                      {stream.title}
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-1 line-clamp-1">
                    {stream.description}
                  </p>
                  <p className="text-xs text-muted-foreground mb-4">
                    {format(new Date(stream.dateCreated), "MMM dd, yyyy")}
                  </p>
                  <div className="flex justify-between">
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-full text-xs flex gap-1"
                      onClick={() =>
                        navigate(`/customer/online-burol/${stream.id}`)
                      }
                    >
                      <Share2 className="h-3.5 w-3.5" /> Share
                    </Button>
                    <Button
                      size="sm"
                      className="rounded-full bg-primary/90 hover:bg-primary text-xs"
                      onClick={() =>
                        navigate(`/customer/online-burol/${stream.id}`)
                      }
                    >
                      <Play className="h-3.5 w-3.5 mr-1" /> Watch
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default OnlineBurialCard;
