import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import MessageError from "@/components/ui/MessageError";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [isError, setIsError] = useState<boolean>(false)

  const handleLogin = (e:any) => {
     e.preventDefault()
     if (username === "test" && password === "test123") {
       navigate("/");
     } else {
       setIsError(true)
     }
   };
  return (
    <div className="w-full min-h-screen   text-white flex flex-col justify-center relative">
      <div className="max-w-md w-full mx-auto">
        <div className="flex items-center gap-2 cursor-pointer mb-5">
          <img src="/mockLogo.png" alt="Memorial" className="h-10 w-10" />
          <span className="font-bold hidden sm:inline-block">
            Memorial Services
          </span>
        </div>

        <h2 className="text-2xl font-bold mb-2 text-gradient">
          Log in to your account
        </h2>
        <p className="text-sm text-gray-400 mb-6">
          Welcome back! Please enter your details.
        </p>
        {isError && (
          <MessageError message="Invalid credentials. Please verify your email and password, then try again." />
        )}
        <form className="space-y-5 relative z-20 mt-3">
          <Input
            type="text"
            placeholder="Email"
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-3 bg-neutral-800 focus:bg-neutral-800/70 border border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
          <Input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 bg-neutral-800 focus:bg-neutral-800/70 border border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
          <Button
            onClick={handleLogin}
            className="w-full py-6 bg-sky-500 shadow-2xl shadow-sky-500/20 hover:bg-sky-600 rounded-full font-semibold"
          >
            Sign in
          </Button>
        </form>

        <p className="text-sm mt-6 text-center text-gray-400 relative z-20">
          Don’t have an account?{" "}
          <Link to="/register" className="text-sky-400 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
      <img
        src="/grid-bg.png"
        className="absolute top-0 left-0 w-full h-full -z-10s opacity-60"
        alt=""
      />
    </div>
  );
};

export default Login;
