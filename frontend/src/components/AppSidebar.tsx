
import { Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Users, CalendarCheck, DollarSign, ListTodo, BarChart3, Settings, LogOut, LayoutDashboard } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

const AppSidebar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const pathname = location.pathname;

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    const menuItems = [
        { title: "Dashboard", icon: LayoutDashboard, url: "/dashboard" },
        { title: "Employees", icon: Users, url: "/employees" },
        { title: "Attendance", icon: CalendarCheck, url: "/attendance" },
        { title: "Payroll", icon: DollarSign, url: "/payroll" },
        { title: "Tasks", icon: ListTodo, url: "/tasks" },
        { title: "Reports", icon: BarChart3, url: "/reports" },
    ];

    return (
        <div className="hidden border-r border-[#3B4953]/20 bg-[#2C373E] md:flex flex-col w-72 min-h-screen text-[#EBF4DD] shadow-2xl z-50 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-[#3B4953]/50 to-transparent pointer-events-none" />

            <div className="flex h-20 items-center px-8 relative z-10">
                <Link to="/dashboard" className="flex items-center gap-3 font-semibold hover:opacity-90 transition-all active:scale-95">
                    <img src="/favicon.png" alt="Kora" className="h-9 w-9 rounded-xl shadow-lg border border-white/10" />
                    <span className="text-2xl font-extrabold tracking-tight text-white font-outfit">Kora</span>
                </Link>
            </div>

            <div className="flex-1 overflow-y-auto py-4 px-4 space-y-6 relative z-10">
                <div className="px-4">
                    <p className="text-[10px] font-bold uppercase tracking-[2px] text-[#90AB8B] mb-4 opacity-60">Main Management</p>
                    <nav className="grid gap-2">
                        {menuItems.map((item) => (
                            <Link
                                key={item.url}
                                to={item.url}
                                className={`group flex items-center gap-3 rounded-2xl px-4 py-3.5 transition-all duration-300 font-semibold relative overflow-hidden ${pathname === item.url
                                    ? "bg-white/10 text-white shadow-inner"
                                    : "text-[#EBF4DD]/60 hover:bg-white/5 hover:text-white"
                                    }`}
                            >
                                {pathname === item.url && (
                                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#5A7863] rounded-r-full" />
                                )}
                                <item.icon className={`h-5 w-5 transition-transform duration-300 group-hover:scale-110 ${pathname === item.url ? "text-[#90AB8B]" : "text-[#90AB8B]/50"}`} />
                                {item.title}
                            </Link>
                        ))}
                    </nav>
                </div>
            </div>

            <div className="p-6 mt-auto relative z-10">
                <div className="glass-panel p-4 rounded-3xl border-white/5 bg-white/5 space-y-4 shadow-2xl">
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-[#5A7863] to-[#3B4953] flex items-center justify-center border border-white/20 shadow-lg">
                                <span className="text-lg font-bold text-white">A</span>
                            </div>
                            <div className="absolute -bottom-1 -right-1 h-3.5 w-3.5 bg-green-500 border-2 border-[#2C373E] rounded-full" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold text-white truncate">Administrator</p>
                            <p className="text-[10px] font-bold text-[#90AB8B] uppercase tracking-wider">System Owner</p>
                        </div>
                    </div>

                    <Button
                        variant="ghost"
                        className="w-full justify-start gap-3 text-[#EBF4DD]/60 hover:text-white hover:bg-red-500/10 hover:border-red-500/20 border border-transparent rounded-2xl transition-all duration-300 h-11"
                        onClick={handleLogout}
                    >
                        <LogOut className="h-4 w-4" />
                        <span className="font-semibold text-sm">Logout Session</span>
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default AppSidebar;
