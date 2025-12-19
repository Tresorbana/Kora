
import { useState, useEffect } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Wallet, Download, RefreshCcw, Landmark, Receipt, TrendingDown, MoreHorizontal } from "lucide-react";

export default function Payroll() {
    const [month, setMonth] = useState<string>(new Date().getMonth() + 1 + "");
    const [year, setYear] = useState<string>(new Date().getFullYear() + "");
    const [payrolls, setPayrolls] = useState<any[]>([]);
    const { toast } = useToast();

    const generatePayroll = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/payroll/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ month: parseInt(month), year: parseInt(year) })
            });
            const data = await res.json();
            setPayrolls(data);
            toast({ title: "Payroll synchronization successful", description: "All records have been recalculated based on latest attendance data." });
        } catch (e) {
            toast({ title: "Optimization failed", description: "Could not generate payroll records at this time.", variant: "destructive" });
        }
    };

    const fetchPayroll = async () => {
        try {
            const res = await fetch(`http://localhost:5000/api/payroll?month=${month}&year=${year}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            const data = await res.json();
            setPayrolls(data);
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        fetchPayroll();
    }, [month, year]);

    const downloadCSV = () => {
        window.open(`http://localhost:5000/api/payroll/export?month=${month}&year=${year}`, '_blank');
    };

    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    return (
        <AppLayout title="Payroll Intelligence">
            <div className="space-y-8 animate-in fade-in duration-700">
                {/* Header Actions */}
                <div className="flex flex-col lg:flex-row gap-6 items-stretch lg:items-center justify-between glass p-8 rounded-[2.5rem] border-white/60 shadow-xl">
                    <div className="flex flex-wrap gap-4 items-end">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-[#5A7863] ml-1">Period Month</label>
                            <Select value={month} onValueChange={setMonth}>
                                <SelectTrigger className="w-[180px] h-12 rounded-2xl bg-white/50 border-white/80 shadow-sm focus:ring-[#5A7863]/20">
                                    <SelectValue placeholder="Month" />
                                </SelectTrigger>
                                <SelectContent className="rounded-2xl border-white/60 glass">
                                    {Array.from({ length: 12 }, (_, i) => i + 1).map(m => (
                                        <SelectItem key={m} value={m.toString()} className="rounded-xl focus:bg-[#5A7863]/10">
                                            {monthNames[m - 1]}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-[#5A7863] ml-1">Fiscal Year</label>
                            <Select value={year} onValueChange={setYear}>
                                <SelectTrigger className="w-[140px] h-12 rounded-2xl bg-white/50 border-white/80 shadow-sm focus:ring-[#5A7863]/20">
                                    <SelectValue placeholder="Year" />
                                </SelectTrigger>
                                <SelectContent className="rounded-2xl border-white/60 glass">
                                    {['2024', '2025', '2026', '2027'].map(y => (
                                        <SelectItem key={y} value={y} className="rounded-xl focus:bg-[#5A7863]/10">{y}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <Button onClick={generatePayroll} className="btn-premium h-12 px-8 rounded-2xl flex items-center gap-2 group">
                            <RefreshCcw className="h-4 w-4 group-hover:rotate-180 transition-transform duration-500" />
                            Recalculate Wealth
                        </Button>
                    </div>

                    <Button variant="outline" onClick={downloadCSV} className="h-12 px-8 rounded-2xl border-2 border-[#3B4953]/10 text-[#3B4953] font-bold hover:bg-white/40 transition-all flex items-center gap-2">
                        <Download className="h-4 w-4" />
                        Export Ledger
                    </Button>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="glass-card p-6 border-white/60">
                        <div className="flex items-center gap-4">
                            <div className="h-12 w-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-600">
                                <Landmark className="h-6 w-6" />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-[#3B4953]/40 uppercase tracking-widest">Total Liability</p>
                                <p className="text-2xl font-black text-[#3B4953] font-outfit">
                                    {payrolls.reduce((acc, curr) => acc + curr.netPay, 0).toLocaleString()} <span className="text-sm font-bold opacity-40">RWF</span>
                                </p>
                            </div>
                        </div>
                    </Card>
                    <Card className="glass-card p-6 border-white/60">
                        <div className="flex items-center gap-4">
                            <div className="h-12 w-12 rounded-2xl bg-orange-500/10 flex items-center justify-center text-orange-600">
                                <TrendingDown className="h-6 w-6" />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-[#3B4953]/40 uppercase tracking-widest">Deductions Salvaged</p>
                                <p className="text-2xl font-black text-[#3B4953] font-outfit">
                                    {payrolls.reduce((acc, curr) => acc + curr.lateDeductions, 0).toLocaleString()} <span className="text-sm font-bold opacity-40">RWF</span>
                                </p>
                            </div>
                        </div>
                    </Card>
                    <Card className="glass-card p-6 border-white/60">
                        <div className="flex items-center gap-4">
                            <div className="h-12 w-12 rounded-2xl bg-[#5A7863]/10 flex items-center justify-center text-[#5A7863]">
                                <Receipt className="h-6 w-6" />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-[#3B4953]/40 uppercase tracking-widest">Verified Recipients</p>
                                <p className="text-2xl font-black text-[#3B4953] font-outfit">{payrolls.length}</p>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Payroll Table */}
                <Card className="glass-card overflow-hidden rounded-[2.5rem] border-white/60 shadow-2xl">
                    <div className="px-8 py-6 border-b border-white/40 flex justify-between items-center bg-white/20">
                        <div>
                            <h3 className="text-xl font-black text-[#3B4953] font-outfit">Payroll Ledger</h3>
                            <p className="text-xs text-[#3B4953]/50 font-medium">Comprehensive breakdown of monthly disbursements.</p>
                        </div>
                        <Button variant="ghost" size="icon" className="rounded-xl hover:bg-[#5A7863]/10">
                            <MoreHorizontal className="h-5 w-5 text-[#3B4953]/40" />
                        </Button>
                    </div>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader className="bg-[#5A7863]/5">
                                <TableRow className="hover:bg-transparent border-none">
                                    <TableHead className="py-6 pl-10 font-bold uppercase tracking-widest text-[10px] text-[#5A7863]">Talent Identity</TableHead>
                                    <TableHead className="py-6 font-bold uppercase tracking-widest text-[10px] text-[#5A7863]">Base Allocation</TableHead>
                                    <TableHead className="py-6 font-bold uppercase tracking-widest text-[10px] text-[#5A7863]">Active Days</TableHead>
                                    <TableHead className="py-6 font-bold uppercase tracking-widest text-[10px] text-[#5A7863]">Adjustments</TableHead>
                                    <TableHead className="py-6 font-bold uppercase tracking-widest text-[10px] text-[#5A7863]">Net Disbursement</TableHead>
                                    <TableHead className="py-6 pr-10 font-bold uppercase tracking-widest text-[10px] text-[#5A7863]">Execution Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {payrolls.map((p) => (
                                    <TableRow key={p._id} className="group hover:bg-[#5A7863]/5 transition-colors duration-300 border-b border-[#5A7863]/5">
                                        <TableCell className="py-8 pl-10">
                                            <div className="flex items-center gap-3">
                                                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#5A7863] to-[#3B4953] flex items-center justify-center text-white font-bold text-xs">
                                                    {(p.employeeId?.name || "U")[0]}
                                                </div>
                                                <span className="font-bold text-[#3B4953] text-lg">{p.employeeId?.name || "Unknown Talent"}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="py-8 font-medium text-[#3B4953]/60">{p.baseSalary.toLocaleString()} RWF</TableCell>
                                        <TableCell className="py-8 font-bold text-[#3B4953]">{p.attendanceCount} <span className="text-[10px] opacity-40 uppercase tracking-tighter">units</span></TableCell>
                                        <TableCell className="py-8">
                                            <div className="flex items-center gap-1.5 text-red-500 font-bold">
                                                <TrendingDown className="h-3 w-3" />
                                                -{p.lateDeductions.toLocaleString()}
                                            </div>
                                        </TableCell>
                                        <TableCell className="py-8">
                                            <span className="px-4 py-2 rounded-xl bg-[#5A7863]/10 text-[#5A7863] font-black font-outfit text-xl">
                                                {p.netPay.toLocaleString()}
                                            </span>
                                        </TableCell>
                                        <TableCell className="py-8 pr-10">
                                            <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${p.status === 'paid' ? 'bg-green-100 text-green-600' : 'bg-amber-100 text-amber-600'
                                                }`}>
                                                {p.status}
                                            </span>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {payrolls.length === 0 && (
                                    <TableRow>
                                        <TableCell colSpan={6} className="py-20 text-center">
                                            <div className="flex flex-col items-center gap-4 opacity-20">
                                                <Wallet className="h-20 w-20" />
                                                <p className="text-xl font-black font-outfit">No Payroll Intel Found</p>
                                                <p className="text-sm font-medium">Initiate 'Recalculate' to synchronize records.</p>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
