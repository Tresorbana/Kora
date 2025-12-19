
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle2, BarChart3, Users, Clock, ShieldCheck, ArrowRight } from "lucide-react";

const LandingPage = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[#EBF4DD] flex flex-col font-sans text-[#3B4953] relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(144,171,139,0.1),transparent),radial-gradient(circle_at_bottom_left,rgba(90,120,99,0.05),transparent)] pointer-events-none" />

            {/* Navigation */}
            <header className="sticky top-0 z-50 px-6 py-4">
                <nav className="glass max-w-7xl mx-auto px-8 py-4 rounded-[2rem] flex items-center justify-between border-white/60 shadow-xl shadow-black/5">
                    <div className="flex items-center gap-3">
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-[#5A7863] to-[#3B4953] rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
                            <img src="/favicon.png" alt="Kora" className="relative h-10 w-10 rounded-xl shadow-md" />
                        </div>
                        <span className="text-2xl font-black tracking-tighter text-[#3B4953] font-outfit">Kora</span>
                    </div>

                    <div className="hidden lg:flex items-center gap-10">
                        {["Features", "About", "Contact"].map((item) => (
                            <a
                                key={item}
                                href={`#${item.toLowerCase()}`}
                                className="text-sm font-bold uppercase tracking-widest text-[#3B4953]/60 hover:text-[#5A7863] transition-colors"
                            >
                                {item}
                            </a>
                        ))}
                    </div>

                    <div className="flex items-center gap-4">
                        <Button
                            variant="ghost"
                            onClick={() => navigate("/login")}
                            className="font-bold text-[#3B4953]/70 hover:text-[#5A7863] hover:bg-[#5A7863]/5 px-6 rounded-xl"
                        >
                            Log in
                        </Button>
                        <Button
                            onClick={() => navigate("/login")}
                            className="btn-premium h-11 px-8 shadow-xl shadow-[#5A7863]/20 hover:scale-105 transition-transform"
                        >
                            Get Started
                        </Button>
                    </div>
                </nav>
            </header>

            {/* Hero Section */}
            <main className="flex-1 relative">
                <section className="px-6 pt-20 pb-32 max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
                    <div className="space-y-10 animate-in fade-in slide-in-from-left-10 duration-1000">
                        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-2xl bg-white/50 border border-white/60 text-[#5A7863] text-xs font-black uppercase tracking-[2px] shadow-sm">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#5A7863] opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#5A7863]"></span>
                            </span>
                            Revolutionizing HR in Rwanda
                        </div>

                        <h1 className="text-6xl lg:text-8xl font-black tracking-tight leading-[0.9] text-[#3B4953] font-outfit">
                            Master your <span className="text-gradient">Workforce.</span>
                        </h1>

                        <p className="text-xl text-[#3B4953]/60 leading-relaxed max-w-lg font-medium">
                            Kora is the premium staff management ecosystem for elite businesses. Automate payroll, track attendance, and scale your operations with unmatched elegance.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-6 pt-4">
                            <Button
                                size="lg"
                                onClick={() => navigate("/login")}
                                className="btn-premium h-16 px-10 text-lg rounded-2xl shadow-2xl active:scale-95"
                            >
                                Start Your Legacy
                                <ArrowRight className="ml-3 h-6 w-6" />
                            </Button>
                            <Button
                                variant="outline"
                                size="lg"
                                className="h-16 px-10 text-lg rounded-2xl border-2 border-[#3B4953]/10 text-[#3B4953] font-bold hover:bg-white/40 transition-all active:scale-95"
                            >
                                Watch Demo
                            </Button>
                        </div>

                        <div className="flex items-center gap-12 pt-10 px-2 opacity-60 grayscale hover:grayscale-0 transition-all">
                            {[Users, BarChart3, Clock].map((Icon, i) => (
                                <div key={i} className="flex items-center gap-2">
                                    <Icon className="h-5 w-5 text-[#5A7863]" />
                                    <span className="text-[10px] font-black uppercase tracking-[2px]">Enterprise Grade</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="relative group perspective-1000 animate-in fade-in zoom-in duration-1000 delay-300">
                        <div className="absolute -inset-10 bg-gradient-to-tr from-[#90AB8B]/30 to-transparent rounded-[3rem] blur-3xl opacity-50 group-hover:opacity-80 transition duration-1000"></div>
                        <div className="relative glass-card p-4 rounded-[3rem] border-white/80 shadow-2xl transform transition-all duration-700 group-hover:rotate-y-6 group-hover:rotate-x-2 group-hover:scale-105">
                            <div className="bg-[#3B4953]/90 backdrop-blur-md p-4 flex items-center gap-3 rounded-t-[2rem]">
                                <div className="flex gap-2">
                                    <div className="w-3 h-3 rounded-full bg-red-400/80 shadow-[0_0_10px_rgba(248,113,113,0.5)]"></div>
                                    <div className="w-3 h-3 rounded-full bg-amber-400/80 shadow-[0_0_10px_rgba(251,191,36,0.5)]"></div>
                                    <div className="w-3 h-3 rounded-full bg-green-400/80 shadow-[0_0_10px_rgba(52,211,153,0.5)]"></div>
                                </div>
                                <div className="h-4 w-40 bg-white/10 rounded-full mx-auto" />
                            </div>
                            <div className="p-10 space-y-10 bg-white/80 rounded-b-[2rem]">
                                <div className="grid grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <p className="text-[10px] font-black text-[#5A7863] uppercase tracking-widest opacity-60">Total Talent</p>
                                        <p className="text-4xl font-black text-[#3B4953] font-outfit">1,248</p>
                                        <div className="h-1.5 w-full bg-[#5A7863]/10 rounded-full overflow-hidden">
                                            <div className="h-full w-[70%] bg-[#5A7863] rounded-full" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-[10px] font-black text-[#5A7863] uppercase tracking-widest opacity-60">Revenue Boost</p>
                                        <p className="text-4xl font-black text-[#3B4953] font-outfit">+42%</p>
                                        <div className="h-1.5 w-full bg-[#5A7863]/10 rounded-full overflow-hidden">
                                            <div className="h-full w-[85%] bg-[#5A7863] rounded-full" />
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div className="h-10 w-full bg-[#5A7863]/5 rounded-2xl border border-[#5A7863]/10 flex items-center px-6 justify-between">
                                        <span className="text-xs font-bold text-[#5A7863]">Automated Payroll Sent</span>
                                        <span className="text-xs font-black text-green-600">SUCCESSFUL</span>
                                    </div>
                                    <div className="h-10 w-full bg-[#3B4953]/5 rounded-2xl border border-[#3B4953]/10 flex items-center px-6 justify-between">
                                        <span className="text-xs font-bold text-[#3B4953]">Daily Attendance Audit</span>
                                        <span className="text-xs font-black text-[#3B4953]/60">99.8% ACCURACY</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Grid */}
                <section id="features" className="py-32 relative">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="text-center mb-24 space-y-4">
                            <h2 className="text-5xl font-black text-[#3B4953] font-outfit tracking-tighter">Engineered for Excellence.</h2>
                            <p className="text-xl text-[#3B4953]/40 max-w-2xl mx-auto font-medium">Uncompromising tools for modern African enterprises.</p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-10">
                            {[
                                { title: "Workforce HQ", desc: "Centralized intelligence for all employee lifecycle data.", icon: Users },
                                { title: "Precision Pulse", desc: "Advanced attendance tracking with geolocation verification.", icon: Clock },
                                { title: "Wealth Automate", desc: "Err-free payroll engine optimized for Rwandan tax laws.", icon: ShieldCheck }
                            ].map((feature, i) => (
                                <div key={i} className="glass shadow-xl p-10 rounded-[3rem] border-white/60 hover:-translate-y-4 hover:shadow-2xl transition-all duration-500 group">
                                    <div className="h-16 w-16 bg-white rounded-2xl flex items-center justify-center text-[#5A7863] mb-8 shadow-inner group-hover:scale-110 group-hover:rotate-3 transition-all">
                                        <feature.icon className="h-8 w-8" />
                                    </div>
                                    <h3 className="text-2xl font-black text-[#3B4953] mb-4 font-outfit">{feature.title}</h3>
                                    <p className="text-[#3B4953]/60 leading-relaxed font-medium">{feature.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>

            <footer className="bg-[#2C373E] text-[#EBF4DD] py-20 px-6 relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#5A7863] via-[#90AB8B] to-[#3B4953]" />
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 justify-between items-center gap-12">
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <img src="/favicon.png" alt="Kora" className="h-12 w-12 rounded-2xl" />
                            <span className="text-3xl font-black tracking-tighter font-outfit">Kora</span>
                        </div>
                        <p className="text-[#EBF4DD]/40 max-w-sm font-medium">The definitive operating system for high-performance teams in Rwanda and beyond.</p>
                    </div>
                    <div className="md:text-right space-y-4">
                        <p className="text-[10px] font-black uppercase tracking-[3px] text-[#5A7863]">Built with pride in Rwanda</p>
                        <p className="text-[#EBF4DD]/20 text-xs">© 2025 Kora Systems. Elite Software for Elite Companies.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
