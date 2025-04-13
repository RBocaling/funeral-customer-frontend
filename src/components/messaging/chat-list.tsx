import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { format } from "date-fns";
import { Chat } from "@/lib/types";

interface ChatListProps {
  chats: Chat[];
  selectedChatId: string;
  onChatSelect: (chatId: string) => void;
}

export function ChatList({
  chats,
  selectedChatId,
  onChatSelect,
}: ChatListProps) {
  return (
    <ScrollArea className="h-[80vh]">
      <div className="space-y-1 p-2 w-80">
        {chats.map((chat) => (
          <button
            key={chat.id}
            className={`w-full rounded-xl p-3 text-left transition-all hover:bg-secondary/80 active:scale-[0.98] ${
              selectedChatId === chat.id ? "bg-secondary" : ""
            }`}
            onClick={() => onChatSelect(chat.id)}
          >
            <div className="flex items-center gap-3">
              <div className="relative">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={chat.avatar} alt={chat.name} />
                  <AvatarFallback>{chat.name.charAt(0)}</AvatarFallback>
                </Avatar>
                {chat.online && (
                  <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background bg-green-500" />
                )}
              </div>
              <div className="flex-1 overflow-hidden">
                <div className="flex items-center justify-between">
                  <span className="font-semibold">{chat.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {format(new Date(chat.timestamp), "HH:mm")}
                  </span>
                </div>
                <p className="mt-0.5 truncate  text-sm text-muted-foreground">
                  {chat.lastMessage}
                </p>
              </div>
              {chat.unread > 0 && (
                <Badge
                  variant="secondary"
                  className="ml-auto rounded-full bg-primary px-2 py-0.5 text-xs font-medium text-primary-foreground"
                >
                  {chat.unread}
                </Badge>
              )}
            </div>
          </button>
        ))}
      </div>
    </ScrollArea>
  );
}
