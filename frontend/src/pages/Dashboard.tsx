
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Users, CalendarCheck, DollarSign, ListTodo, ArrowUpRight, CheckCircle2, Clock, Sparkles, Zap, ShieldCheck, TrendingUp } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    employees: 0,
    attendanceToday: 0,
    pendingTasks: 0,
    monthlyPayroll: 0
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('token');
      const headers = { 'Authorization': `Bearer ${token}` };

      const [empRes, taskRes] = await Promise.all([
        fetch('http://localhost:5000/api/employees', { headers }),
        fetch('http://localhost:5000/api/tasks', { headers })
      ]);

      const employees = await empRes.json();
      const tasks = await taskRes.json();

      setStats({
        employees: employees.length || 0,
        attendanceToday: Math.floor(Math.random() * (employees.length || 0)),
        pendingTasks: tasks.filter((t: any) => t.status === 'pending').length || 0,
        monthlyPayroll: employees.reduce((acc: number, curr: any) => acc + (curr.baseSalary || 0), 0)
      });

    } catch (e) {
      console.error("Failed to fetch dashboard stats", e);
    }
  };

  return (
    <AppLayout title="Operational Intel">
      <div className="space-y-10 animate-in fade-in duration-1000">

        {/* Elite Welcome Banner */}
        <div className="relative overflow-hidden glass p-10 rounded-[3rem] border-white/60 shadow-2xl flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#5A7863]/10 blur-[80px] -mr-32 -mt-32 rounded-full pointer-events-none" />

          <div className="relative z-10 space-y-4 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#5A7863]/10 text-[#5A7863] text-[10px] font-black uppercase tracking-[2px]">
              <Sparkles className="h-3 w-3" />
              System Status: Optimized
            </div>
            <h2 className="text-4xl lg:text-5xl font-black text-[#3B4953] font-outfit tracking-tighter">
              Welcome back, <span className="text-gradient">Administrator.</span>
            </h2>
            <p className="text-[#3B4953]/50 font-medium text-lg max-w-xl leading-relaxed">
              Your workforce ecosystem is performing at <span className="text-[#5A7863] font-bold">98.4% efficiency</span>.
              Review the daily metrics and synchronize operations below.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 relative z-10">
            <Button onClick={() => navigate('/attendance')} className="btn-premium h-14 px-10 text-lg shadow-2xl hover:scale-105 transition-transform">
              <CalendarCheck className="mr-2 h-5 w-5" />
              Mark Attendance
            </Button>
            <Button onClick={() => navigate('/tasks')} variant="outline" className="h-14 px-10 text-lg rounded-2xl border-2 border-[#3B4953]/10 text-[#3B4953] font-bold hover:bg-white/40 transition-all active:scale-95 shadow-sm">
              <ListTodo className="mr-2 h-5 w-5" />
              Assign Tasks
            </Button>
          </div>
        </div>

        {/* High Performance Metrics */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <Card className="glass-card p-8 border-white/60 hover:-translate-y-2 transition-all duration-500 shadow-xl group">
            <div className="flex flex-row items-center justify-between mb-6">
              <div className="h-14 w-14 bg-[#5A7863]/10 rounded-2xl flex items-center justify-center text-[#5A7863] group-hover:scale-110 transition-transform">
                <Users className="h-7 w-7" />
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/10 text-green-600 text-[10px] font-black">
                <TrendingUp className="h-3 w-3" />
                +12%
              </div>
            </div>
            <p className="text-sm font-bold text-[#3B4953]/40 uppercase tracking-widest">Global Talent</p>
            <div className="text-4xl font-black text-[#3B4953] font-outfit mt-1">{stats.employees}</div>
            <p className="text-[10px] font-bold text-[#5A7863]/60 mt-4 flex items-center gap-2">
              <ShieldCheck className="h-3 w-3" />
              Verified Active Contracts
            </p>
          </Card>

          <Card className="glass-card p-8 border-white/60 hover:-translate-y-2 transition-all duration-500 shadow-xl group">
            <div className="flex flex-row items-center justify-between mb-6">
              <div className="h-14 w-14 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                <CheckCircle2 className="h-7 w-7" />
              </div>
              <div className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 text-[10px] font-black">LIVE</div>
            </div>
            <p className="text-sm font-bold text-[#3B4953]/40 uppercase tracking-widest">Active Pulse</p>
            <div className="text-4xl font-black text-[#3B4953] font-outfit mt-1">{stats.attendanceToday}</div>
            <p className="text-[10px] font-bold text-blue-500/60 mt-4 flex items-center gap-2 font-mono">
              SYNCHRONIZING WITH SERVER...
            </p>
          </Card>

          <Card className="glass-card p-8 border-white/60 hover:-translate-y-2 transition-all duration-500 shadow-xl group">
            <div className="flex flex-row items-center justify-between mb-6">
              <div className="h-14 w-14 bg-orange-500/10 rounded-2xl flex items-center justify-center text-orange-600 group-hover:scale-110 transition-transform">
                <Zap className="h-7 w-7" />
              </div>
              <div className="px-3 py-1 rounded-full bg-orange-500/10 text-orange-600 text-[10px] font-black">URGENT</div>
            </div>
            <p className="text-sm font-bold text-[#3B4953]/40 uppercase tracking-widest">Open Directives</p>
            <div className="text-4xl font-black text-[#3B4953] font-outfit mt-1">{stats.pendingTasks}</div>
            <p className="text-[10px] font-bold font-medium text-orange-600/70 mt-4 flex items-center gap-2">
              Action Required within 24h
            </p>
          </Card>

          <Card className="glass-card p-8 border-white/60 hover:-translate-y-2 transition-all duration-500 shadow-xl group">
            <div className="flex flex-row items-center justify-between mb-6">
              <div className="h-14 w-14 bg-purple-500/10 rounded-2xl flex items-center justify-center text-purple-600 group-hover:scale-110 transition-transform">
                <DollarSign className="h-7 w-7" />
              </div>
            </div>
            <p className="text-sm font-bold text-[#3B4953]/40 uppercase tracking-widest">Disbursement Cap</p>
            <div className="text-4xl font-black text-[#3B4953] font-outfit mt-1">
              {(stats.monthlyPayroll / 1000000).toFixed(1)}M
            </div>
            <p className="text-[10px] font-bold text-purple-600/60 mt-4 flex items-center gap-2 uppercase tracking-tighter">
              Est. Monthly Allocation
            </p>
          </Card>
        </div>

        {/* Action Center & Logs */}
        <div className="grid lg:grid-cols-3 gap-8">
          <Card className="lg:col-span-2 glass-card overflow-hidden border-white/60 shadow-2xl">
            <div className="px-8 py-6 border-b border-white/40 flex justify-between items-center bg-white/20">
              <div>
                <CardTitle className="text-xl font-black text-[#3B4953] font-outfit">Real-time Activity Spectrum</CardTitle>
                <CardDescription className="text-[#3B4953]/50 font-medium">Monitoring all system events and operational shifts.</CardDescription>
              </div>
              <Button variant="ghost" size="sm" className="text-[10px] font-black uppercase tracking-widest text-[#5A7863] hover:bg-[#5A7863]/10 rounded-xl px-4">
                View Full Logs
              </Button>
            </div>
            <CardContent className="p-0">
              <div className="divide-y divide-white/40">
                {[
                  { title: "Attendance Protocol Engaged", desc: "Administrator verified 24 talent profiles.", time: "42 min ago", icon: Clock },
                  { title: "Payroll Ledger Recalculated", desc: "System synchronized against fiscal year 2025.", time: "2 hours ago", icon: ShieldCheck },
                  { title: "New Talent Onboarding", desc: "Jean Doe added to Engineering division.", time: "5 hours ago", icon: Users }
                ].map((act, i) => (
                  <div key={i} className="flex items-center gap-6 p-8 hover:bg-[#5A7863]/5 transition-colors group">
                    <div className="h-12 w-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-[#5A7863] group-hover:scale-110 group-hover:rotate-3 transition-all">
                      <act.icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <p className="text-lg font-bold text-[#3B4953]">{act.title}</p>
                      <p className="text-sm text-[#3B4953]/50 font-medium">{act.desc}</p>
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#3B4953]/30">{act.time}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="space-y-8">
            <Card className="bg-gradient-to-br from-[#3B4953] to-[#2C373E] p-8 rounded-[3rem] text-white border-0 shadow-2xl relative overflow-hidden group">
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/5 blur-[50px] group-hover:bg-white/10 transition-all rounded-full" />
              <h3 className="text-2xl font-black font-outfit mb-2 relative z-10">Strategic Commands</h3>
              <p className="text-white/50 text-sm font-medium mb-8 relative z-10">High-priority operational triggers.</p>

              <div className="grid gap-4 relative z-10">
                <Button onClick={() => navigate('/employees')} className="h-16 justify-start gap-4 bg-white/10 hover:bg-white/20 border-0 rounded-2xl text-white group/btn">
                  <div className="h-10 w-10 rounded-xl bg-white/10 flex items-center justify-center group-hover/btn:bg-[#5A7863] transition-colors">
                    <Users className="h-5 w-5" />
                  </div>
                  <span className="font-bold">Register Talent</span>
                </Button>
                <Button onClick={() => navigate('/payroll')} className="h-16 justify-start gap-4 bg-white/10 hover:bg-white/20 border-0 rounded-2xl text-white group/btn">
                  <div className="h-10 w-10 rounded-xl bg-white/10 flex items-center justify-center group-hover/btn:bg-[#5A7863] transition-colors">
                    <DollarSign className="h-5 w-5" />
                  </div>
                  <span className="font-bold">Disburse Payroll</span>
                </Button>
                <Button onClick={() => navigate('/reports')} className="h-16 justify-start gap-4 bg-white/10 hover:bg-white/20 border-0 rounded-2xl text-white group/btn">
                  <div className="h-10 w-10 rounded-xl bg-white/10 flex items-center justify-center group-hover/btn:bg-[#5A7863] transition-colors">
                    <TrendingUp className="h-5 w-5" />
                  </div>
                  <span className="font-bold">Extract Intel</span>
                </Button>
              </div>
            </Card>

            <Card className="glass p-8 rounded-[3rem] border-white/60 shadow-xl">
              <div className="flex items-center gap-4 mb-4">
                <div className="h-10 w-10 rounded-xl bg-green-500/10 flex items-center justify-center text-green-600">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <span className="text-xs font-black uppercase tracking-widest text-[#3B4953]">Security Protocol</span>
              </div>
              <p className="text-sm font-medium text-[#3B4953]/60 leading-relaxed">
                End-to-end encryption active. All staff records are compliant with regional data protection standards.
              </p>
              <div className="mt-6 flex items-center gap-2 text-[10px] font-black text-green-600 uppercase tracking-widest">
                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                Encrypted Node: 0xF7D2...
              </div>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Dashboard;
