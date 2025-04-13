import { CustomerType } from "@/types/customerType";
import { create } from "zustand";

type AuthStore = {
  user: CustomerType | null;
  setUser: (user: CustomerType | null) => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));
