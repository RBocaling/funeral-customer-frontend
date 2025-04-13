import { createContext, ReactNode, useContext, useMemo } from "react";
import {
  useQuery,
  useMutation,
  UseMutationResult,
} from "@tanstack/react-query";
import { z } from "zod";
import { getQueryFn, apiRequest, queryClient } from "@/lib/queryClient";
import { useLocation } from "wouter";

type User = {
  id: string;
  username: string;
  userType: "admin" | "member";
  profileComplete: boolean;
  fullName?:string
};

type LoginData = {
  username: string;
  password: string;
};

type RegisterData = LoginData & {
  email?: string;
};

const loginSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

const registerSchema = loginSchema.extend({
  email: z.string().email().optional(),
});

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  error: Error | null;
  loginMutation: UseMutationResult<User, Error, LoginData>;
  logoutMutation: UseMutationResult<void, Error, void>;
  registerMutation: UseMutationResult<User, Error, RegisterData>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [, setLocation] = useLocation();

  const {
    data: user,
    error,
    isLoading,
  } = useQuery<User | null, Error>({
    queryKey: ["/api/user"],
    queryFn: getQueryFn({ on401: "returnNull" }),
  });

  const loginMutation = useMutation<User, Error, LoginData>({
    mutationFn: async (credentials) => {
      const parsed = loginSchema.safeParse(credentials);
      if (!parsed.success) throw new Error("Invalid login data");

      const res = await apiRequest("POST", "/api/login", parsed.data);
      return res.json();
    },
    onSuccess: (user) => {
      queryClient.setQueryData(["/api/user"], user);

      const next = user.profileComplete
        ? `/${user.userType}/dashboard`
        : `/${user.userType}/profile`;

      setLocation(next);
      
    },
    onError: () => {
    
    },
  });

  const registerMutation = useMutation<User, Error, RegisterData>({
    mutationFn: async (credentials) => {
      const parsed = registerSchema.safeParse(credentials);
      if (!parsed.success) throw new Error("Invalid registration data");

      const res = await apiRequest("POST", "/api/register", parsed.data);
      return res.json();
    },
    onSuccess: (user) => {
      queryClient.setQueryData(["/api/user"], user);
      setLocation(`/${user.userType}/profile`);
      
    },
    onError: () => {
      
    },
  });

  const logoutMutation = useMutation<void, Error, void>({
    mutationFn: async () => {
      await apiRequest("POST", "/api/logout");
    },
    onSuccess: () => {
      queryClient.setQueryData(["/api/user"], null);
      setLocation("/auth");
      
    },
    onError: () => {
      
    },
  });

  const value = useMemo(
    () => ({
      user: user ?? null,
      isLoading,
      error,
      loginMutation,
      logoutMutation,
      registerMutation,
    }),
    [user, isLoading, error, loginMutation, logoutMutation, registerMutation]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}
