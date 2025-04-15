import { Theme, useThemeStore } from "@/store/themeStore";
import { useEffect } from "react";

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "vite-ui-theme",
}: {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
}) {
  const theme = useThemeStore((state) => state.theme);
  const setTheme = (newTheme: Theme) => {
    localStorage.setItem(storageKey, newTheme);
    useThemeStore.setState({ theme: newTheme });
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem(storageKey) as Theme | null;
    const initialTheme = savedTheme || defaultTheme;
    setTheme(initialTheme);
    useThemeStore.setState({
      setTheme,
    });
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");

    const appliedTheme =
      theme === "system"
        ? window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light"
        : theme;

    root.classList.add(appliedTheme);
  }, [theme]);

  return <div>{children}</div>;
}
