import { create } from "zustand";

export type Theme = "dark" | "light" | "system";

type ThemeStore = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

export const useThemeStore = create<ThemeStore>(() => ({
  theme: "system",
  setTheme: () => {},
}));

export const useTheme = () =>
  useThemeStore((state) => ({
    theme: state.theme,
    setTheme: state.setTheme,
  }));
