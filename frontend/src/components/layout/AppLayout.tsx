import React from 'react';
import AppSidebar from "@/components/AppSidebar";
import { Bell, Search, Menu } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface AppLayoutProps {
  children: React.ReactNode;
  title?: string;
}

export function AppLayout({ children, title }: AppLayoutProps) {
  return (
    <div className="min-h-screen flex w-full bg-[#EBF4DD] relative overflow-hidden font-sans selection:bg-[#5A7863]/20 selection:text-[#5A7863]">
      {/* Dynamic Background Elements */}
      <div className="absolute -top-[10%] -right-[5%] w-[40%] h-[40%] bg-white/40 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[5%] -left-[5%] w-[30%] h-[30%] bg-[#90AB8B]/10 blur-[100px] rounded-full pointer-events-none" />

      <AppSidebar />

      <div className="flex-1 flex flex-col min-h-screen relative z-10">
        {/* Header */}
        <header className="h-20 bg-white/40 backdrop-blur-2xl sticky top-0 z-40 flex items-center justify-between px-10 border-b border-white/40 shadow-[0_4px_30px_rgba(0,0,0,0.03)]">
          <div className="flex items-center gap-6">
            <Button variant="ghost" size="icon" className="md:hidden text-[#3B4953] hover:bg-[#5A7863]/10 rounded-2xl">
              <Menu className="h-6 w-6" />
            </Button>

            {title && (
              <div className="space-y-0.5">
                <h1 className="text-3xl font-extrabold text-[#3B4953] font-outfit tracking-tight">
                  {title}
                </h1>
                <div className="h-1 w-8 bg-gradient-to-r from-[#5A7863] to-transparent rounded-full" />
              </div>
            )}
          </div>

          <div className="flex items-center gap-5">
            <div className="relative hidden lg:block group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#3B4953]/30 group-focus-within:text-[#5A7863] transition-colors" />
              <Input
                placeholder="Intelligent Search..."
                className="pl-11 w-80 bg-white/30 border-white/50 focus:bg-white/80 focus:border-[#5A7863]/30 focus:ring-[#5A7863]/10 transition-all rounded-[1.25rem] h-11 shadow-sm"
              />
            </div>

            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="relative text-[#3B4953] hover:bg-[#5A7863]/10 hover:text-[#5A7863] rounded-2xl transition-all active:scale-90">
                <Bell className="h-5 w-5" />
                <span className="absolute top-2.5 right-2.5 h-2.5 w-2.5 bg-[#5A7863] rounded-full ring-2 ring-white animate-pulse"></span>
              </Button>

              <div className="h-8 w-[1px] bg-[#3B4953]/10 mx-1 hidden sm:block" />

              <div className="hidden sm:flex items-center gap-3 pl-2 group cursor-pointer hover:opacity-80 transition-opacity">
                <div className="text-right">
                  <p className="text-xs font-bold text-[#3B4953] leading-tight">Admin</p>
                  <p className="text-[10px] font-bold text-[#5A7863]/60 uppercase tracking-tighter">Verified</p>
                </div>
                <div className="h-10 w-10 rounded-[1rem] bg-gradient-to-br from-[#5A7863] to-[#3B4953] flex items-center justify-center text-white font-bold shadow-lg ring-2 ring-white/50">
                  A
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-10 overflow-auto">
          <div className="max-w-7xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-5 duration-700">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
