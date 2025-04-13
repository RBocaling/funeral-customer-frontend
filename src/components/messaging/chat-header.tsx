import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MenuIcon, Search, X } from "lucide-react";
import { Chat } from "@/lib/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface HeaderProps {
  onMenuClick: () => void;
  selectedChat?: Chat;
  onSearch: (query: string) => void;
  searchQuery: string;
}

export function ChatHeader({
  onMenuClick,
  selectedChat,
  onSearch,
  searchQuery,
}: HeaderProps) {
  return (
    <div className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background/80 px-6 backdrop-blur-lg">
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden"
        onClick={onMenuClick}
      >
        <MenuIcon className="h-5 w-5" />
      </Button>
      <div className="flex flex-1 items-center gap-4">
        {selectedChat && (
          <div className="flex items-center gap-3">
            <div className="relative">
              <Avatar className="h-8 w-8">
                <AvatarImage
                  src={selectedChat.avatar}
                  alt={selectedChat.name}
                />
                <AvatarFallback>{selectedChat.name.charAt(0)}</AvatarFallback>
              </Avatar>
              {selectedChat.online && (
                <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full border-2 border-background bg-green-500" />
              )}
            </div>
            <span className="font-semibold">{selectedChat.name}</span>
          </div>
        )}
        <div className="relative ml-auto max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Search messages..."
            className="rounded-full bg-secondary pl-10 pr-10"
          />
          {searchQuery && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full"
              onClick={() => onSearch("")}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
