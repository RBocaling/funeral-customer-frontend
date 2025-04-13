export const mockProviders = [
  {
    id: 1,
    username: "eternalrest",
    email: "contact@eternalrest.ph",
    password: "",
    fullName: "Eternal Rest Funeral Services",
    userType: "provider",
    profileComplete: true,
    createdAt: new Date(),
    businessName: "Eternal Rest Funeral Services",
    location: "Bacoor, Cavite",
    rating: 4.9,
    reviewCount: 156,
    bookingCount: 235,
    priceRange: {
      min: 1500000,
      max: 3500000,
    },
    allowsCustomCasket: true,
    hasFlowerOptions: true,
    hasMemorialRoom: true,
    profileBio:
      "Serving families with compassion and dignity for over 25 years. We offer comprehensive funeral services with customizable options to honor your loved ones.",
  },
  {
    id: 2,
    username: "serenepassage",
    email: "care@serenepassage.ph",
    password: "",
    fullName: "Serene Passage Memorial",
    userType: "provider",
    profileComplete: true,
    createdAt: new Date(),
    businessName: "Serene Passage Memorial",
    location: "Dasmariñas, Cavite",
    rating: 4.7,
    reviewCount: 98,
    bookingCount: 187,
    priceRange: {
      min: 1200000,
      max: 2800000,
    },
    allowsCustomCasket: true,
    hasFlowerOptions: true,
    hasMemorialRoom: false,
    profileBio:
      "Providing respectful funeral arrangements with a focus on personalized services and eco-friendly options. Our compassionate team helps you create meaningful memorials.",
  },
  {
    id: 3,
    username: "gracefuljourney",
    email: "support@gracefuljourney.ph",
    password: "",
    fullName: "Graceful Journey Funerals",
    userType: "provider",
    profileComplete: true,
    createdAt: new Date(),
    businessName: "Graceful Journey Funerals",
    location: "Imus, Cavite",
    rating: 4.8,
    reviewCount: 124,
    bookingCount: 210,
    priceRange: {
      min: 1800000,
      max: 4000000,
    },
    allowsCustomCasket: false,
    hasFlowerOptions: true,
    hasMemorialRoom: true,
    profileBio:
      "A modern approach to funeral services, combining traditional respect with contemporary memorialization options. We offer beautiful venues and exceptional customer service.",
  },
  {
    id: 4,
    username: "peacefulrepose",
    email: "info@peacefulrepose.ph",
    password: "",
    fullName: "Peaceful Repose Services",
    userType: "provider",
    profileComplete: true,
    createdAt: new Date(),
    businessName: "Peaceful Repose Services",
    location: "General Trias, Cavite",
    rating: 4.6,
    reviewCount: 87,
    bookingCount: 165,
    priceRange: {
      min: 1000000,
      max: 2500000,
    },
    allowsCustomCasket: true,
    hasFlowerOptions: false,
    hasMemorialRoom: false,
    profileBio:
      "Affordable and dignified funeral services with a focus on casket customization. We help families create meaningful farewells without financial burden.",
  },
  {
    id: 5,
    username: "heavensgate",
    email: "service@heavensgate.ph",
    password: "",
    fullName: "Heaven's Gate Memorial",
    userType: "provider",
    profileComplete: true,
    createdAt: new Date(),
    businessName: "Heaven's Gate Memorial",
    location: "Tagaytay, Cavite",
    rating: 4.9,
    reviewCount: 143,
    bookingCount: 245,
    priceRange: {
      min: 2000000,
      max: 5000000,
    },
    allowsCustomCasket: true,
    hasFlowerOptions: true,
    hasMemorialRoom: true,
    profileBio:
      "Premium funeral services with scenic memorial spaces in Tagaytay. Our luxurious facilities and attentive staff ensure a perfect tribute to your loved ones.",
  },
  {
    id: 6,
    username: "sacredmemories",
    email: "help@sacredmemories.ph",
    password: "",
    fullName: "Sacred Memories Funeral Home",
    userType: "provider",
    profileComplete: true,
    createdAt: new Date(),
    businessName: "Sacred Memories Funeral Home",
    location: "Silang, Cavite",
    rating: 4.5,
    reviewCount: 76,
    bookingCount: 142,
    priceRange: {
      min: 1300000,
      max: 2700000,
    },
    allowsCustomCasket: false,
    hasFlowerOptions: true,
    hasMemorialRoom: true,
    profileBio:
      "Traditional funeral services with a focus on religious and cultural practices. We respect diverse traditions and provide specialized ceremonies for all faiths.",
  },
  {
    id: 7,
    username: "sacredmemories",
    email: "help@sacredmemories.ph",
    password: "",
    fullName: "Premium Memories Funeral Home",
    userType: "provider",
    profileComplete: true,
    createdAt: new Date(),
    businessName: "Sacred Memories Funeral Home",
    location: "Silang, Cavite",
    rating: 4.5,
    reviewCount: 76,
    bookingCount: 142,
    priceRange: {
      min: 7000000,
      max: 1000000,
    },
    allowsCustomCasket: false,
    hasFlowerOptions: true,
    hasMemorialRoom: true,
    profileBio:
      "Traditional funeral services with a focus on religious and cultural practices. We respect diverse traditions and provide specialized ceremonies for all faiths.",
  },
  {
    id: 8,
    username: "sacredmemories",
    email: "help@sacredmemories.ph",
    password: "",
    fullName: "Uniqe Memories Funeral Home",
    userType: "provider",
    profileComplete: true,
    createdAt: new Date(),
    businessName: "Sacred Memories Funeral Home",
    location: "Silang, Cavite",
    rating: 4.5,
    reviewCount: 76,
    bookingCount: 142,
    priceRange: {
      min: 2500000,
      max: 5000000,
    },
    allowsCustomCasket: false,
    hasFlowerOptions: true,
    hasMemorialRoom: true,
    profileBio:
      "Traditional funeral services with a focus on religious and cultural practices. We respect diverse traditions and provide specialized ceremonies for all faiths.",
  },
];


// /messag
import { Chat, Message } from "./types";

export const messages: Message[] = [
  {
    id: "1",
    content: "Hey there! How are you doing?",
    sender: {
      name: "Alice Cooper",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop",
    },
    timestamp: "2024-03-20T09:00:00Z",
    isOwn: false,
    chatId: "1",
  },
  {
    id: "2",
    content: "I'm doing great! Just finished working on that new project.",
    sender: {
      name: "You",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&auto=format&fit=crop",
    },
    timestamp: "2024-03-20T09:01:00Z",
    isOwn: true,
    chatId: "1",
  },
  {
    id: "3",
    content:
      "That's awesome! Would love to see it sometime. How about we catch up over coffee?",
    sender: {
      name: "Alice Cooper",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop",
    },
    timestamp: "2024-03-20T09:02:00Z",
    isOwn: false,
    chatId: "1",
  },
  {
    id: "4",
    content: "Sounds perfect! How about tomorrow afternoon?",
    sender: {
      name: "You",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&auto=format&fit=crop",
    },
    timestamp: "2024-03-20T09:03:00Z",
    isOwn: true,
    chatId: "1",
  },
  {
    id: "5",
    content: "Can you review the project documentation?",
    sender: {
      name: "Bob Wilson",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop",
    },
    timestamp: "2024-03-20T08:45:00Z",
    isOwn: false,
    chatId: "2",
  },
  {
    id: "6",
    content: "Thanks for your help yesterday!",
    sender: {
      name: "Carol Smith",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150&auto=format&fit=crop",
    },
    timestamp: "2024-03-19T18:30:00Z",
    isOwn: false,
    chatId: "3",
  },
];

export const chats: Chat[] = [
  {
    id: "1",
    name: "Alice Cooper",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop",
    lastMessage:
      "That's awesome! Would love to see it sometime. How about we catch up over coffee?",
    timestamp: "2024-03-20T09:02:00Z",
    unread: 2,
    online: true,
  },
  {
    id: "2",
    name: "Bob Wilson",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop",
    lastMessage: "Let me know when you're free to discuss the project",
    timestamp: "2024-03-20T08:45:00Z",
    unread: 0,
    online: false,
  },
  {
    id: "3",
    name: "Carol Smith",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150&auto=format&fit=crop",
    lastMessage: "Thanks for your help yesterday!",
    timestamp: "2024-03-19T18:30:00Z",
    unread: 1,
    online: true,
  },
];