"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
    LogOut,
    Users,
    MessageSquare,
    Settings as SettingsIcon,
    Plus,
    Trash2,
    RotateCcw,
    Shield,
    Activity,
    Database,
    Image as ImageIcon,
    Menu,
    X
} from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface AdminDashboardProps {
    user: { name: string; role: string };
    onLogout: () => void;
}

export default function AdminDashboard({ user, onLogout }: AdminDashboardProps) {
    const [activeTab, setActiveTab] = useState("overview");
    const [keys, setKeys] = useState<any[]>([]);
    const [newKey, setNewKey] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [showSidebar, setShowSidebar] = useState(false);

    useEffect(() => {
        fetchKeys();
        const savedTheme = localStorage.getItem('power-couple-theme');
        if (savedTheme) setPalette(savedTheme);
    }, []);

    const fetchKeys = async () => {
        try {
            const res = await fetch("/api/admin/keys");
            const data = await res.json();
            setKeys(Array.isArray(data) ? data : []);
        } catch (e) {
            console.error("Failed to fetch keys", e);
        }
    };

    const handleAddKey = async () => {
        if (!newKey.trim()) {
            alert("Please enter a valid API key");
            return;
        }
        setIsLoading(true);
        try {
            const res = await fetch("/api/admin/keys", {
                method: "POST",
                body: JSON.stringify({ key: newKey.trim() }),
                headers: { "Content-Type": "application/json" }
            });
            if (res.ok) {
                alert("API Key added successfully!");
                setNewKey("");
                fetchKeys();
            } else {
                const data = await res.json();
                alert(`Error: ${data.error || "Failed to add key"}`);
            }
        } catch (e) {
            console.error(e);
            alert("Failed to connect to server");
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeleteKey = async (id: string) => {
        if (!confirm("Delete this API key?")) return;
        try {
            const res = await fetch("/api/admin/keys", {
                method: "DELETE",
                body: JSON.stringify({ id }),
                headers: { "Content-Type": "application/json" }
            });
            if (res.ok) {
                alert("API Key deleted");
                fetchKeys();
            } else {
                alert("Failed to delete key");
            }
        } catch (e) {
            console.error(e);
            alert("Error deleting key");
        }
    };

    const palettes = [
        { name: "Indigo Neon", primary: "263.4 70% 50.4%", accent: "indigo" },
        { name: "Emerald Forest", primary: "142.1 76.2% 36.3%", accent: "emerald" },
        { name: "Rose Quartz", primary: "346.8 77.2% 49.8%", accent: "rose" },
        { name: "Amber Glow", primary: "37.9 92.1% 50.2%", accent: "amber" },
    ];

    const setPalette = (hsl: string) => {
        // Apply to both html and body to be sure
        document.documentElement.style.setProperty('--primary', hsl);
        document.documentElement.style.setProperty('--ring', hsl);
        document.body.style.setProperty('--primary', hsl);
        document.body.style.setProperty('--ring', hsl);

        // Also update any specific theme-provider wrappers if needed
        const wrappers = document.querySelectorAll('[data-theme]');
        wrappers.forEach(el => (el as HTMLElement).style.setProperty('--primary', hsl));

        localStorage.setItem('power-couple-theme', hsl);
        console.log("Theme updated and saved:", hsl);
    };

    const stats = [
        { label: "Total Users", value: "2", icon: Users, color: "from-blue-500 to-cyan-500" },
        { label: "Messages Today", value: "0", icon: MessageSquare, color: "from-purple-500 to-indigo-500" },
        { label: "Active API Keys", value: keys.filter(k => k.status === "active").length.toString(), icon: Activity, color: "from-green-500 to-emerald-500" },
        { label: "System Status", value: "Online", icon: Database, color: "from-pink-500 to-rose-500" },
    ];

    return (
        <div className="flex h-screen bg-background overflow-hidden">
            {/* Mobile Overlay */}
            {showSidebar && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setShowSidebar(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={cn(
                "fixed lg:relative inset-y-0 left-0 z-50 w-72 lg:w-80 border-r border-border bg-card/95 backdrop-blur-xl flex flex-col transition-transform duration-300",
                showSidebar ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
            )}>
                <div className="p-4 lg:p-6 border-b border-border">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center">
                                <Shield className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
                            </div>
                            <div>
                                <h2 className="font-semibold text-sm lg:text-base">{user.name}</h2>
                                <p className="text-xs text-muted-foreground">Administrator</p>
                            </div>
                        </div>
                        <div className="flex gap-1">
                            <button
                                onClick={() => setShowSidebar(false)}
                                className="lg:hidden p-2 hover:bg-muted rounded-lg transition-colors"
                            >
                                <X className="w-5 h-5 text-muted-foreground" />
                            </button>
                            <button
                                onClick={onLogout}
                                className="p-2 hover:bg-muted rounded-lg transition-colors"
                            >
                                <LogOut className="w-4 h-4 lg:w-5 lg:h-5 text-muted-foreground" />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-3 lg:p-4">
                    <p className="text-xs text-muted-foreground uppercase font-bold mb-3 px-2">Menu</p>
                    <div className="space-y-2">
                        <button
                            onClick={() => {
                                setActiveTab("overview");
                                setShowSidebar(false);
                            }}
                            className={cn(
                                "w-full p-3 lg:p-4 rounded-2xl transition-all flex items-center gap-3",
                                activeTab === "overview"
                                    ? "bg-primary/10 border-2 border-primary"
                                    : "glass border border-white/5 hover:border-white/20"
                            )}
                        >
                            <Activity className="w-5 h-5" />
                            <span className="font-semibold text-sm">Overview</span>
                        </button>
                        <button
                            onClick={() => {
                                setActiveTab("api-keys");
                                setShowSidebar(false);
                            }}
                            className={cn(
                                "w-full p-3 lg:p-4 rounded-2xl transition-all flex items-center gap-3",
                                activeTab === "api-keys"
                                    ? "bg-primary/10 border-2 border-primary"
                                    : "glass border border-white/5 hover:border-white/20"
                            )}
                        >
                            <SettingsIcon className="w-5 h-5" />
                            <span className="font-semibold text-sm">API Keys</span>
                        </button>
                        <button
                            onClick={() => {
                                setActiveTab("users");
                                setShowSidebar(false);
                            }}
                            className={cn(
                                "w-full p-3 lg:p-4 rounded-2xl transition-all flex items-center gap-3",
                                activeTab === "users"
                                    ? "bg-primary/10 border-2 border-primary"
                                    : "glass border border-white/5 hover:border-white/20"
                            )}
                        >
                            <Users className="w-5 h-5" />
                            <span className="font-semibold text-sm">Users</span>
                        </button>
                        <button
                            onClick={() => {
                                setActiveTab("media");
                                setShowSidebar(false);
                            }}
                            className={cn(
                                "w-full p-3 lg:p-4 rounded-2xl transition-all flex items-center gap-3",
                                activeTab === "media"
                                    ? "bg-primary/10 border-2 border-primary"
                                    : "glass border border-white/5 hover:border-white/20"
                            )}
                        >
                            <ImageIcon className="w-5 h-5" />
                            <span className="font-semibold text-sm">Media Gallery</span>
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto p-4 lg:p-12">
                {/* Mobile Menu Button */}
                <button
                    onClick={() => setShowSidebar(true)}
                    className="lg:hidden fixed top-4 left-4 z-30 p-3 bg-card border border-border rounded-xl shadow-lg hover:bg-muted transition-colors"
                >
                    <Menu className="w-5 h-5" />
                </button>

                {activeTab === "overview" && (
                    <div className="space-y-6 lg:space-y-8">
                        <div className="pt-16 lg:pt-0">
                            <h1 className="text-2xl lg:text-3xl font-bold mb-2">Admin Dashboard</h1>
                            <p className="text-muted-foreground text-sm lg:text-base">Monitor and manage your Power Couple system</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {stats.map((stat, idx) => {
                                const Icon = stat.icon;
                                return (
                                    <motion.div
                                        key={stat.label}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: idx * 0.1 }}
                                        className="p-6 rounded-2xl glass border border-white/5 hover:border-primary/20 transition-all"
                                    >
                                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4`}>
                                            <Icon className="w-6 h-6 text-white" />
                                        </div>
                                        <p className="text-2xl font-bold mb-1">{stat.value}</p>
                                        <p className="text-sm text-muted-foreground">{stat.label}</p>
                                    </motion.div>
                                );
                            })}
                        </div>

                        <div className="p-8 rounded-3xl bg-indigo-500/5 border border-indigo-500/10">
                            <h2 className="text-xl font-semibold mb-6">Database Status</h2>
                            <DbDiagnostic />
                        </div>

                        <div className="p-8 rounded-3xl glass border border-white/5">
                            <h2 className="text-xl font-semibold mb-6">Theme Palette</h2>
                            <div className="flex flex-wrap gap-4">
                                {palettes.map((p) => (
                                    <button
                                        key={p.name}
                                        onClick={() => setPalette(p.primary)}
                                        className="flex items-center gap-3 px-6 py-4 rounded-2xl glass border border-white/5 hover:border-primary/50 transition-all"
                                    >
                                        <div className="w-6 h-6 rounded-full" style={{ backgroundColor: `hsl(${p.primary})` }} />
                                        <span className="text-sm font-medium">{p.name}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === "api-keys" && (
                    <div className="space-y-8">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-3xl font-bold mb-2">API Keys</h1>
                                <p className="text-muted-foreground">Manage your Gemini API keys for translation</p>
                            </div>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    placeholder="Paste AIzaSy... key"
                                    value={newKey}
                                    onChange={(e) => setNewKey(e.target.value)}
                                    className="px-4 py-2 bg-muted/50 border border-border rounded-xl text-sm w-64 outline-none focus:ring-1 focus:ring-primary"
                                />
                                <button
                                    onClick={handleAddKey}
                                    disabled={isLoading}
                                    className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:bg-primary/90 transition-all disabled:opacity-50"
                                >
                                    <Plus className="w-4 h-4" /> Add
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {keys.map((k) => (
                                <div key={k.id} className="p-6 rounded-2xl glass border border-white/5 hover:border-indigo-500/20 transition-all">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className={cn(
                                            "px-2 py-1 rounded text-[10px] font-bold uppercase",
                                            k.status === "active" ? "bg-green-500/20 text-green-500" : "bg-yellow-500/20 text-yellow-500"
                                        )}>
                                            {k.status}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <button className="p-1.5 hover:bg-muted rounded-lg transition-colors">
                                                <RotateCcw className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDeleteKey(k.id)}
                                                className="p-1.5 hover:bg-muted rounded-lg transition-colors text-muted-foreground hover:text-destructive"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                    <p className="font-mono text-sm mb-4 truncate">{k.key}</p>
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-xs mb-1">
                                            <span className="text-muted-foreground">Total Calls</span>
                                            <span>{k.usage}</span>
                                        </div>
                                        <div className="w-full h-1 bg-muted rounded-full overflow-hidden">
                                            <div className="h-full bg-primary" style={{ width: `${Math.min(k.usage / 10, 100)}%` }} />
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {keys.length === 0 && (
                                <div className="col-span-full py-12 text-center text-muted-foreground border-2 border-dashed border-border rounded-3xl">
                                    No API keys yet. Add your first key above to get started.
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {activeTab === "users" && (
                    <div className="space-y-8">
                        <div>
                            <h1 className="text-3xl font-bold mb-2">User Management</h1>
                            <p className="text-muted-foreground">View and manage system users</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {[
                                { name: "Sajid", role: "User", color: "from-blue-500 to-cyan-500", status: "Active" },
                                { name: "Nasywa", role: "User", color: "from-pink-500 to-rose-500", status: "Active" }
                            ].map((user) => (
                                <div key={user.name} className="p-6 rounded-2xl glass border border-white/5">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${user.color} flex items-center justify-center`}>
                                            <Users className="w-8 h-8 text-white" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-lg">{user.name}</h3>
                                            <p className="text-sm text-muted-foreground">{user.role}</p>
                                        </div>
                                        <div className="px-3 py-1 rounded-full bg-green-500/20 text-green-500 text-xs font-bold">
                                            {user.status}
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
                                        <div>
                                            <p className="text-xs text-muted-foreground mb-1">Messages</p>
                                            <p className="font-semibold">0</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-muted-foreground mb-1">Last Active</p>
                                            <p className="font-semibold text-sm">Just now</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                {activeTab === "media" && (
                    <div className="space-y-8">
                        <div>
                            <h1 className="text-3xl font-bold mb-2">Media Gallery</h1>
                            <p className="text-muted-foreground">Monitor images and drawings exchanged between users</p>
                        </div>

                        <MediaGallery />
                    </div>
                )}
            </main>
        </div>
    );
}

function DbDiagnostic() {
    const [status, setStatus] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    const checkDb = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/debug/db");
            const data = await res.json();
            setStatus(data);
        } catch (e: any) {
            setStatus({ status: "failed", error: e.message });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-4">
            <button
                onClick={checkDb}
                disabled={loading}
                className="px-4 py-2 bg-indigo-500 text-white rounded-xl hover:bg-indigo-600 transition-colors disabled:opacity-50"
            >
                {loading ? "Checking..." : "Verify DB Connection"}
            </button>
            {status && (
                <div className={cn(
                    "p-4 rounded-xl text-xs font-mono break-all",
                    status.status === "connected" ? "bg-green-500/10 text-green-500" : "bg-destructive/10 text-destructive"
                )}>
                    <p>Status: {status.status}</p>
                    {status.messageCount !== undefined && <p>Total Messages: {status.messageCount}</p>}
                    {status.error && <p className="mt-2">Error: {status.error}</p>}
                    {!status.hasDbUrl && <p className="mt-2 text-yellow-500">Warning: No DATABASE_URL found in Environment!</p>}
                </div>
            )}
        </div>
    );
}

function MediaGallery() {
    const [images, setImages] = useState<any[]>([]);

    useEffect(() => {
        fetch("/api/images")
            .then(res => res.json())
            .then(data => setImages(Array.isArray(data) ? data : []));
    }, []);

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {images.map((img) => (
                <div key={img.id} className="group relative aspect-square rounded-2xl overflow-hidden glass border border-white/10">
                    <img src={img.url} alt="Shared" className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                        <p className="text-xs font-bold text-white uppercase">{img.sender} → {img.receiver}</p>
                        <p className="text-[10px] text-white/70">{new Date(img.createdAt).toLocaleString()}</p>
                    </div>
                </div>
            ))}
            {images.length === 0 && (
                <div className="col-span-full py-12 text-center text-muted-foreground border-2 border-dashed border-border rounded-3xl">
                    No images shared yet.
                </div>
            )}
        </div>
    );
}
