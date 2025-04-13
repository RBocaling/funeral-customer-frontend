import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { format } from "date-fns";
import { Message } from "@/lib/types";
import { Paperclip, SendHorizontal } from "lucide-react";
import { Input } from "../ui/input";

interface MessageListProps {
  messages: Message[];
}

export function MessageList({ messages }: MessageListProps) {
  return (
    <div className="flex flex-col gap-5">
      <ScrollArea className="h-[65vh] w-full rounded-lg px-4 relative">
        <div className="flex flex-col gap-6 py-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${
                message.isOwn ? "flex-row-reverse" : "flex-row"
              }`}
            >
              {!message.isOwn && (
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={message.sender.avatar}
                    alt={message.sender.name}
                  />
                  <AvatarFallback>
                    {message.sender.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              )}
              <div
                className={`flex flex-col gap-1 ${
                  message.isOwn ? "items-end" : "items-start"
                }`}
              >
                <div className="flex items-center gap-2 px-2">
                  <span className="text-xs text-muted-foreground">
                    {format(new Date(message.timestamp), "HH:mm")}
                  </span>
                </div>
                <div
                  className={`message-bubble ${
                    message.isOwn
                      ? "message-bubble-sent"
                      : "message-bubble-received"
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.content}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
      <div className="flex items-center gap-5 px-5">
        <button>
          <Paperclip className="text-sky-500" />
        </button>
        <Input
          type="text"
          placeholder="Enter Message.."
          className="flex-1 rounded-xl py-4"
        />
        <button>
          <SendHorizontal className="text-sky-500" />
        </button>
      </div>
    </div>
  );
}
