"use client";

import { useState, useEffect } from "react";
import LoginScreen from "@/components/LoginScreen";
import SajidDashboard from "@/components/SajidDashboard";
import NasywaDashboard from "@/components/NasywaDashboard";
import AdminDashboard from "@/components/AdminDashboard";
import ServiceWorkerRegister from "@/components/ServiceWorkerRegister";

export default function Home() {
  const [user, setUser] = useState<{ name: string; role: string } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for saved user on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("power-couple-user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error("Failed to parse saved user", e);
      }
    }
    setIsLoading(false);
  }, []);

  const handleLogin = (userData: { name: string; role: string }) => {
    setUser(userData);
    localStorage.setItem("power-couple-user", JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("power-couple-user");
  };

  // Show loading state while checking localStorage
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  if (user.role === "sajid") {
    return (
      <>
        <ServiceWorkerRegister userRole="sajid" />
        <SajidDashboard user={user} onLogout={handleLogout} />
      </>
    );
  }

  if (user.role === "nasywa") {
    return (
      <>
        <ServiceWorkerRegister userRole="nasywa" />
        <NasywaDashboard user={user} onLogout={handleLogout} />
      </>
    );
  }

  if (user.role === "admin") {
    return <AdminDashboard user={user} onLogout={handleLogout} />;
  }

  return null;
}
