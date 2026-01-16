"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { LogIn, User, Shield } from "lucide-react";

interface LoginProps {
    onLogin: (user: { name: string; role: string }) => void;
}

export default function LoginScreen({ onLogin }: LoginProps) {
    const [selectedRole, setSelectedRole] = useState<string>("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const users = [
        { name: "Sajid", role: "sajid", icon: User, color: "from-blue-500 to-cyan-500" },
        { name: "Nasywa", role: "nasywa", icon: User, color: "from-pink-500 to-rose-500" },
        { name: "Admin", role: "admin", icon: Shield, color: "from-purple-500 to-indigo-500" },
    ];

    const handleLogin = () => {
        // Simple password check (you can enhance this)
        const passwords: Record<string, string> = {
            sajid: "sajid123",
            nasywa: "nasywa123",
            admin: "admin123"
        };

        if (!selectedRole) {
            setError("Please select a user");
            return;
        }

        if (password === passwords[selectedRole]) {
            const user = users.find(u => u.role === selectedRole);
            if (user) {
                onLogin({ name: user.name, role: user.role });
            }
        } else {
            setError("Incorrect password");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-background to-primary/5">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md"
            >
                <div className="text-center mb-8 lg:mb-12">
                    <div className="w-16 h-16 lg:w-20 lg:h-20 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4 neon-border">
                        <LogIn className="w-8 h-8 lg:w-10 lg:h-10 text-primary-foreground" />
                    </div>
                    <h1 className="text-3xl lg:text-4xl font-bold mb-2 neon-text bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
                        Power Couple
                    </h1>
                    <p className="text-sm lg:text-base text-muted-foreground">Select your account to continue</p>
                </div>

                <div className="glass rounded-3xl p-6 lg:p-8 border border-white/10">
                    <div className="space-y-4 mb-6">
                        {users.map((user) => {
                            const Icon = user.icon;
                            return (
                                <button
                                    key={user.role}
                                    onClick={() => {
                                        setSelectedRole(user.role);
                                        setError("");
                                    }}
                                    className={`w-full p-4 rounded-2xl border-2 transition-all flex items-center gap-4 ${selectedRole === user.role
                                        ? "border-primary bg-primary/10 scale-105"
                                        : "border-white/5 hover:border-white/20 glass"
                                        }`}
                                >
                                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${user.color} flex items-center justify-center`}>
                                        <Icon className="w-6 h-6 text-white" />
                                    </div>
                                    <div className="text-left flex-1">
                                        <p className="font-semibold">{user.name}</p>
                                        <p className="text-xs text-muted-foreground capitalize">{user.role}</p>
                                    </div>
                                    {selectedRole === user.role && (
                                        <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                                            <div className="w-2 h-2 rounded-full bg-white" />
                                        </div>
                                    )}
                                </button>
                            );
                        })}
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="text-sm text-muted-foreground mb-2 block">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    setError("");
                                }}
                                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                                placeholder="Enter your password"
                                className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border outline-none focus:ring-2 focus:ring-primary transition-all"
                            />
                        </div>

                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="p-3 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm"
                            >
                                {error}
                            </motion.div>
                        )}

                        <button
                            onClick={handleLogin}
                            disabled={!selectedRole || !password}
                            className="w-full py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed neon-border"
                        >
                            Login
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
