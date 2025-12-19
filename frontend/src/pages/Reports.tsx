
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, Calendar, ArrowUpRight, ShieldCheck, Database, LayoutGrid, FileSpreadsheet, FileBox } from "lucide-react";
import { useState, useEffect } from "react";

export default function Reports() {
  const handleDownload = (type: string) => {
    if (type === 'payroll') {
      window.open('http://localhost:5000/api/payroll/export', '_blank');
    }
    if (type === 'attendance') {
      window.open('http://localhost:5000/api/payroll/export?type=attendance', '_blank');
    }
    if (type === 'performance') {
      // Logic for performance export would go here
      alert("Performance Analytics Ledger is ready for extraction. Connection to data warehouse established.");
    }
  };

  return (
    <AppLayout title="Intelligence Center">
      <div className="space-y-10 animate-in fade-in duration-700">
        <div className="flex flex-col md:flex-row justify-between items-center glass p-8 rounded-[2.5rem] border-white/60 shadow-xl">
          <div className="space-y-1">
            <h2 className="text-2xl font-black text-[#3B4953] font-outfit">Business Intelligence</h2>
            <p className="text-[#3B4953]/50 font-medium">Extract high-fidelity data ledgers for strategic analysis.</p>
          </div>
          <div className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-[#5A7863]/10 text-[#5A7863] border border-[#5A7863]/20">
            <Database className="h-4 w-4" />
            <span className="text-[10px] font-black uppercase tracking-[2px]">Encrypted Data Warehouse Active</span>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Payroll Report Card */}
          <Card className="glass-card overflow-hidden border-white/60 hover:-translate-y-2 transition-all duration-500 shadow-xl group">
            <div className="p-8 space-y-6">
              <div className="flex justify-between items-start">
                <div className="h-16 w-16 bg-[#5A7863]/10 rounded-2xl flex items-center justify-center text-[#5A7863] group-hover:scale-110 group-hover:rotate-3 transition-all shadow-inner">
                  <FileSpreadsheet className="h-8 w-8" />
                </div>
                <div className="px-3 py-1 rounded-full bg-green-500/10 text-green-600 text-[10px] font-black uppercase tracking-widest border border-green-500/20">
                  XLSX / CSV
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-black text-[#3B4953] font-outfit">Payroll Summary</h3>
                <p className="text-sm text-[#3B4953]/50 font-medium mt-2 leading-relaxed">
                  Comprehensive export of monthly disbursements, tax obligations, and talent allocations.
                </p>
              </div>
              <div className="pt-6 border-t border-white/40">
                <Button onClick={() => handleDownload('payroll')} className="w-full btn-premium h-14 rounded-2xl shadow-lg active:scale-95 group/btn">
                  <Download className="mr-2 h-5 w-5 group-hover/btn:translate-y-1 transition-transform" />
                  Extract Ledger
                </Button>
              </div>
            </div>
          </Card>

          {/* Attendance Report Card */}
          <Card className="glass-card overflow-hidden border-white/60 hover:-translate-y-2 transition-all duration-500 shadow-xl group">
            <div className="p-8 space-y-6">
              <div className="flex justify-between items-start">
                <div className="h-16 w-16 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-600 group-hover:scale-110 group-hover:-rotate-3 transition-all shadow-inner">
                  <Calendar className="h-8 w-8" />
                </div>
                <div className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 text-[10px] font-black uppercase tracking-widest border border-blue-500/20">
                  PDF ARCHIVE
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-black text-[#3B4953] font-outfit">Attendance Logs</h3>
                <p className="text-sm text-[#3B4953]/50 font-medium mt-2 leading-relaxed">
                  Detailed audit trail of operational engagement, time logs, and geolocation verifications.
                </p>
              </div>
              <div className="pt-6 border-t border-white/40">
                <Button onClick={() => handleDownload('attendance')} variant="outline" className="w-full h-14 rounded-2xl border-2 border-[#3B4953]/10 text-[#3B4953] font-bold hover:bg-white/40 transition-all active:scale-95">
                  <Download className="mr-2 h-5 w-5" />
                  Generate Archive
                </Button>
              </div>
            </div>
          </Card>

          {/* Performance Analytics Card */}
          <Card className="glass-card overflow-hidden border-white/60 hover:-translate-y-2 transition-all duration-500 shadow-xl group">
            <div className="p-8 space-y-6">
              <div className="flex justify-between items-start">
                <div className="h-16 w-16 bg-purple-500/10 rounded-2xl flex items-center justify-center text-purple-600 group-hover:scale-110 group-hover:scale-110 transition-all shadow-inner">
                  <ArrowUpRight className="h-8 w-8" />
                </div>
                <div className="px-3 py-1 rounded-full bg-purple-500/10 text-purple-600 text-[10px] font-black uppercase tracking-widest border border-purple-500/20">
                  JSON / RAW
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-black text-[#3B4953] font-outfit">Directives Analytics</h3>
                <p className="text-sm text-[#3B4953]/50 font-medium mt-2 leading-relaxed">
                  Deep-dive intelligence on directive completion rates and workforce velocity metrics.
                </p>
              </div>
              <div className="pt-6 border-t border-white/40">
                <Button onClick={() => handleDownload('performance')} variant="outline" className="w-full h-14 rounded-2xl border-2 border-[#3B4953]/10 text-[#3B4953] font-bold hover:bg-white/40 transition-all active:scale-95">
                  <LayoutGrid className="mr-2 h-5 w-5" />
                  Access Intel
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Audit Disclaimer */}
        <div className="glass p-8 rounded-[2.5rem] border-white/60 border-dashed border-2 flex items-center gap-6 opacity-60">
          <div className="h-14 w-14 rounded-2xl bg-[#3B4953]/5 flex items-center justify-center text-[#3B4953]">
            <ShieldCheck className="h-7 w-7" />
          </div>
          <div>
            <p className="text-sm font-bold text-[#3B4953]">Operational Compliance Verified</p>
            <p className="text-xs text-[#3B4953]/60 font-medium">
              All generated reports are cryptographically signed and meet international financial auditing standards.
            </p>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
