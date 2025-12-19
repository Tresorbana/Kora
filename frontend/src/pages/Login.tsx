import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Loader2 } from "lucide-react";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { toast } = useToast();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
                toast({
                    title: "Welcome back!",
                    description: "Logged in successfully",
                });
                navigate("/dashboard");
            } else {
                toast({
                    variant: "destructive",
                    title: "Access Denied",
                    description: data.message || "Invalid credentials",
                });
            }
        } catch (err) {
            toast({
                variant: "destructive",
                title: "Connection Error",
                description: "Could not connect to the server.",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#EBF4DD] p-4 font-sans relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(144,171,139,0.15),transparent),radial-gradient(circle_at_bottom_left,rgba(90,120,99,0.1),transparent)] pointer-events-none" />

            {/* Back Button */}
            <Button
                variant="ghost"
                onClick={() => navigate("/")}
                className="absolute top-6 left-6 text-[#3B4953] hover:text-[#5A7863] hover:bg-[#5A7863]/10 gap-2 z-10 transition-all active:scale-95"
            >
                <ArrowLeft className="h-4 w-4" />
                Back to Home
            </Button>

            <div className="w-full max-w-md space-y-8 animate-in fade-in zoom-in duration-700 relative z-10">
                <div className="text-center space-y-4">
                    <div className="relative group cursor-default inline-block">
                        <div className="absolute -inset-1 bg-gradient-to-r from-[#5A7863] to-[#3B4953] rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
                        <img src="/logo.png" alt="Kora Logo" className="relative h-20 w-auto rounded-xl shadow-lg transform group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="space-y-1">
                        <h1 className="text-4xl font-extrabold tracking-tight text-[#3B4953] font-outfit">Welcome back</h1>
                        <p className="text-[#3B4953]/60 font-medium">Elevate your workforce with precision.</p>
                    </div>
                </div>

                <div className="glass shadow-2xl rounded-3xl overflow-hidden animate-in slide-in-from-bottom-8 duration-700 delay-100">
                    <div className="px-8 py-10">
                        <form onSubmit={handleLogin} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="username" className="text-[#3B4953] font-semibold flex items-center gap-2">
                                    Username
                                </Label>
                                <Input
                                    id="username"
                                    placeholder="Enter your username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                    className="bg-white/50 border-[#5A7863]/20 focus:border-[#5A7863] focus:ring-[#5A7863]/20 h-12 rounded-xl transition-all"
                                />
                            </div>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="password" className="text-[#3B4953] font-semibold">Password</Label>
                                    <a href="#" className="text-xs text-[#5A7863] hover:text-[#3B4953] hover:underline font-bold transition-colors">Forgot password?</a>
                                </div>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="bg-white/50 border-[#5A7863]/20 focus:border-[#5A7863] focus:ring-[#5A7863]/20 h-12 rounded-xl transition-all"
                                />
                            </div>
                            <Button type="submit" className="w-full h-12 btn-premium text-lg active:scale-[0.98]" disabled={loading}>
                                {loading ? <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Verifying...</> : "Sign In to Kora"}
                            </Button>
                        </form>
                    </div>
                </div>

                <p className="text-center text-sm text-[#3B4953]/70 font-medium pb-4">
                    New to Kora? <span className="text-[#5A7863] font-bold cursor-pointer hover:underline">Get an account</span>
                </p>
            </div>
        </div>
    );
};

export default Login;
