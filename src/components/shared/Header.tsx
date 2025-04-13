import { useState } from "react";
import {
  Moon,
  Sun,
  LayoutDashboard,
  MessageSquare,
  LogOut,
  Menu,
  X,
  Bath,
  TvMinimalPlay,
  Mail,
  Shuffle,
} from "lucide-react";
import { useLocation } from "wouter";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useThemeStore } from "@/store/themeStore";

// Simple theme toggle component
const ModeToggle = () => {
  const { theme, setTheme } = useThemeStore();

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="text-sky-500 shadow-xl shadow-sky-500/50 cursor-pointer bg-transparent rounded-full"
    >
      {theme === "dark" ? (
        <Sun className="h-6 w-6" />
      ) : (
        <Moon className="h-6 w-6" />
      )}
      <span className="sr-only">Toggle theme</span>
    </button>
  );
};

const Header = () => {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => location === path;

  const handleLogout = () => {
    alert("test");
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Array of nav items for easy scalability and management
  const navItems = [
    {
      label: "Dashboard",
      icon: <LayoutDashboard className="h-4 w-4 mr-2" />,
      href: "/",
    },
    {
      label: "Services",
      icon: <Bath className="h-4 w-4 mr-2" />,
      href: "/services",
    },
    {
      label: "My Bookings",
      icon: <Shuffle className="h-4 w-4 mr-2" />,
      href: "/bookings",
    },
    {
      label: "Online Burial",
      icon: <TvMinimalPlay className="h-4 w-4 mr-2" />,
      href: "/online-burial",
    },

    {
      label: "Family Members",
      icon: <MessageSquare className="h-4 w-4 mr-2" />,
      href: "/family-members",
    },
  ];

  return (
    <header className="sticky top-0 z-50  w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-5">
        <div className="flex items-center gap-2">
          <Link to="/dashboard">
            <div className="flex items-center gap-2 cursor-pointer">
              <img src="/mockLogo.png" alt="Memorial" className="h-10 w-10" />
              <span className="font-bold hidden sm:inline-block">
                Memorial Services
              </span>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link key={item.href} to={item.href}>
              <div
                className={`relative flex items-center text-sm cursor-pointer ${
                  isActive(item.href)
                    ? "font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.icon}
                {item.label}
              </div>
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-5">
          <Link
            to="/messages"
            className="relative text-sky-500 shadow-xl shadow-sky-500/50 cursor-pointer bg-transparent rounded-full"
          >
            <Mail />
            <div className="absolute -top-1 -right-2 ">
              <span className="relative flex size-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex size-2 rounded-full bg-red-500"></span>
              </span>
            </div>
          </Link>

          <ModeToggle />
          <Link to="/profile">
            <Avatar className="text-sky-500 shadow-xl shadow-violet-500/50">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </Link>

          {/* Mobile menu button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 rounded-md hover:bg-accent"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t">
          <div className="container py-4 space-y-1">
            {navItems.map((item) => (
              <Link key={item.href} to={item.href}>
                <div
                  className={`flex items-center py-2 text-sm font-medium cursor-pointer ${
                    isActive(item.href)
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.icon}
                  {item.label}
                </div>
              </Link>
            ))}
            <button
              onClick={() => {
                handleLogout();
                setMobileMenuOpen(false);
              }}
              className="flex items-center py-2 text-sm font-medium text-muted-foreground hover:text-foreground w-full"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
