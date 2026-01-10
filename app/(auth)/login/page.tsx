"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/use-auth";
import { useState } from "react";
import Link from "next/link";

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    const success = await login(email, password);
    if (!success) {
      setError("Invalid email or password");
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col">
      <div className="space-y-2">
        <div>
          <h1 className="font-semibold">Log in to your account</h1>
          <p className="text-gray-400 text-sm">Welcome back! Please enter your details.</p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="example@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </Button>
          
          <div className="flex flex-row justify-center">
            <span className="text-gray-500">Forget Password?</span> 
            <Link href="/forgetpassword" className="ml-1">Reset it</Link>
          </div>
          
          <div className="flex flex-row justify-center">
            <span className="text-gray-500">Don't have an account?</span>
            <Link href="/register" className="ml-1">Sign up</Link>
          </div>
        </form>
      </div>
    </div>
  );
}