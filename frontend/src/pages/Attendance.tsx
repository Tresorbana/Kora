
import { useState, useEffect } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { Check, X, Clock } from "lucide-react";

interface Employee {
    _id: string;
    name: string;
}

interface AttendanceRecord {
    employeeId: string;
    date: Date;
    status: 'present' | 'absent' | 'late' | 'leave' | 'holiday';
}

export default function Attendance() {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [attendanceDate, setAttendanceDate] = useState<Date>(new Date());
    const [records, setRecords] = useState<Record<string, string>>({});
    const { toast } = useToast();

    useEffect(() => {
        fetchEmployees();
        // In a real app, fetch existing attendance for this date
    }, [attendanceDate]);

    const fetchEmployees = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/employees', {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            const data = await res.json();
            setEmployees(data);
        } catch (e) {
            console.error(e);
        }
    };

    const handleStatusChange = (employeeId: string, status: string) => {
        setRecords(prev => ({ ...prev, [employeeId]: status }));
    };

    const submitAttendance = async () => {
        const payload = {
            records: Object.entries(records).map(([employeeId, status]) => ({
                employeeId,
                date: attendanceDate,
                status
            }))
        };

        try {
            const res = await fetch('http://localhost:5000/api/attendance', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(payload)
            });

            if (res.ok) {
                toast({ title: "Attendance saved" });
            } else {
                toast({ title: "Failed to save attendance", variant: "destructive" });
            }
        } catch (e) {
            toast({ title: "Error", description: "Network error", variant: "destructive" });
        }
    };

    return (
        <AppLayout title="Daily Attendance">
            <div className="space-y-8 animate-in fade-in duration-700">
                <div className="flex flex-col sm:flex-row justify-between items-center glass p-8 rounded-[2.5rem] border-white/60">
                    <div className="space-y-1">
                        <h2 className="text-2xl font-black text-[#3B4953] font-outfit">Audit for {format(attendanceDate, 'MMMM do, yyyy')}</h2>
                        <p className="text-[#3B4953]/50 font-medium">Verify employee presence and engagement pulse.</p>
                    </div>
                    <Button onClick={submitAttendance} className="btn-premium h-14 px-10 text-lg shadow-2xl active:scale-95 group">
                        <Check className="mr-2 h-5 w-5 group-hover:scale-125 transition-transform" />
                        Commit Audit
                    </Button>
                </div>

                <Card className="glass-card overflow-hidden rounded-[2.5rem] border-white/60 shadow-2xl">
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader className="bg-[#5A7863]/5">
                                <TableRow className="hover:bg-transparent border-none">
                                    <TableHead className="py-6 pl-10 font-bold uppercase tracking-widest text-[10px] text-[#5A7863]">Employee Identity</TableHead>
                                    <TableHead className="py-6 pr-10 font-bold uppercase tracking-widest text-[10px] text-[#5A7863]">Operational Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {employees.map(emp => (
                                    <TableRow key={emp._id} className="group hover:bg-[#5A7863]/5 transition-colors duration-300 border-b border-[#5A7863]/5">
                                        <TableCell className="py-8 pl-10 font-bold text-[#3B4953] text-lg">{emp.name}</TableCell>
                                        <TableCell className="py-8 pr-10">
                                            <div className="flex flex-wrap gap-3">
                                                {[
                                                    { id: 'present', color: 'bg-green-500', label: 'Present' },
                                                    { id: 'late', color: 'bg-amber-500', label: 'Late' },
                                                    { id: 'absent', color: 'bg-red-500', label: 'Absent' },
                                                    { id: 'leave', color: 'bg-blue-500', label: 'Leave' }
                                                ].map((s) => (
                                                    <Button
                                                        key={s.id}
                                                        size="sm"
                                                        variant="ghost"
                                                        onClick={() => handleStatusChange(emp._id, s.id)}
                                                        className={`h-11 px-6 rounded-2xl font-bold tracking-wide transition-all duration-300 flex items-center gap-2 border-2 ${records[emp._id] === s.id
                                                                ? `${s.color}/10 border-${s.id === 'late' ? 'amber-500' : s.id === 'present' ? 'green-500' : s.id === 'absent' ? 'red-500' : 'blue-500'} text-${s.id === 'late' ? 'amber-600' : s.id === 'present' ? 'green-600' : s.id === 'absent' ? 'red-600' : 'blue-600'} scale-105 shadow-md`
                                                                : 'bg-white/50 border-transparent text-[#3B4953]/40 hover:bg-white hover:text-[#3B4953]'
                                                            }`}
                                                    >
                                                        <div className={`h-2 w-2 rounded-full ${records[emp._id] === s.id ? s.color : 'bg-gray-300'}`} />
                                                        {s.label}
                                                    </Button>
                                                ))}
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
