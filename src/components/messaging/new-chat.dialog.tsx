import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Chat } from "@/lib/types";

interface NewChatDialogProps {
  onNewChat: (chat: Chat) => void;
  trigger: React.ReactNode;
}

export function NewChatDialog({ onNewChat, trigger }: NewChatDialogProps) {
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newChat: Chat = {
      id: Date.now().toString(),
      name: name.trim(),
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${Date.now()}`,
      lastMessage: "Start a conversation...",
      timestamp: new Date().toISOString(),
      unread: 0,
      online: true,
    };

    onNewChat(newChat);
    setName("");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>New Chat</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter contact name"
              className="col-span-3"
            />
          </div>
          <Button type="submit" className="w-full">
            Start Chat
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
