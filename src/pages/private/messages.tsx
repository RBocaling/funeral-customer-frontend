import { useState } from "react";
import { MessageList } from "@/components/messaging/message-list";
import { ChatSidebar } from "@/components/messaging/chat-sidebar";
import { ChatHeader } from "@/components/messaging/chat-header";
import { chats as initialChats, messages as initialMessages } from "@/lib/mockdata";
import { Chat, Message, TabType } from "@/lib/types";

function Messages() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedChatId, setSelectedChatId] = useState(initialChats[0].id);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<TabType>("all");
  const [chats, setChats] = useState<Chat[]>(initialChats);
  const [messages, _] = useState<Message[]>(initialMessages);

  const filteredChats = chats.filter((chat) => {
    const matchesSearch =
      chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesTab =
      activeTab === "all" ||
      (activeTab === "unread" && chat.unread > 0) ||
      (activeTab === "important" && chat.id === "1"); // Example condition for important

    return matchesSearch && matchesTab;
  });

  const selectedChatMessages = messages.filter(
    (message) => message.chatId === selectedChatId
  );

  const selectedChat = chats.find((chat) => chat.id === selectedChatId);

  const handleNewChat = (newChat: Chat) => {
    setChats((prevChats) => [newChat, ...prevChats]);
    setSelectedChatId(newChat.id);
    setIsSidebarOpen(false);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div className="flex overflow-hidden bg-background mx-auto max-w-7xl">
      <ChatSidebar
        isOpen={isSidebarOpen}
        chats={filteredChats}
        selectedChatId={selectedChatId}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onChatSelect={(chatId) => {
          setSelectedChatId(chatId);
          setIsSidebarOpen(false);
        }}
        onNewChat={handleNewChat}
      />
      <div className="flex flex-1 flex-col">
        <ChatHeader
          onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)}
          selectedChat={selectedChat}
          onSearch={handleSearch}
          searchQuery={searchQuery}
        />
        <main className="relative flex-1">
          <MessageList messages={selectedChatMessages} />
        </main>
      </div>
    </div>
  );
}

export default Messages;
