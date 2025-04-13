import { Material, CasketPart } from "./constants";

export interface MaterialOption {
  id: Material;
  name: string;
  description: string;
}

export interface ColorOption {
  name: string;
  hex: string;
}

export interface StyleOption {
  id: string;
  name: string;
}

export interface CasketConfig {
  style: string;
  parts: {
    [key in CasketPart]: {
      color: string;
      material: Material;
    }
  };
  dimensions: {
    length: number;
    width: number;
    height: number;
  };
}

export interface CasketDesign {
  id: string;
  name: string;
  config: CasketConfig;
  createdAt: Date;
}


// message
export interface Message {
  id: string;
  content: string;
  sender: {
    name: string;
    avatar: string;
  };
  timestamp: string;
  isOwn: boolean;
  chatId: string;
}

export interface Chat {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  online: boolean;
}

export type TabType = "all" | "unread" | "important";