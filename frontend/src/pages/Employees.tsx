
import { useState, useEffect } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Edit, UserX, UserCheck, DollarSign, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Employee {
  _id: string;
  name: string;
  phone: string;
  role: string;
  baseSalary: number;
  status: string;
}

export default function Employees() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    role: "",
    baseSalary: "",
  });

  const fetchEmployees = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/employees', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      const data = await res.json();
      setEmployees(data);
    } catch (err) {
      console.error("Failed to fetch employees", err);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const filteredEmployees = employees.filter(emp =>
    emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      name: formData.name,
      phone: formData.phone,
      role: formData.role,
      baseSalary: parseFloat(formData.baseSalary),
      hireDate: new Date(),
      status: 'active'
    };

    try {
      let url = 'http://localhost:5000/api/employees';
      let method = 'POST';

      if (editingEmployee) {
        url = `http://localhost:5000/api/employees/${editingEmployee._id}`;
        method = 'PATCH';
      }

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        toast({ title: editingEmployee ? "Employee updated" : "Employee added" });
        fetchEmployees();
        setDialogOpen(false);
        setEditingEmployee(null);
        setFormData({ name: "", phone: "", role: "", baseSalary: "" });
      } else {
        toast({ title: "Operation failed", variant: "destructive" });
      }
    } catch (err) {
      toast({ title: "Error", description: "Something went wrong", variant: "destructive" });
    }
  };

  const toggleStatus = async (emp: Employee) => {
    try {
      const newStatus = emp.status === 'active' ? 'inactive' : 'active';
      await fetch(`http://localhost:5000/api/employees/${emp._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ status: newStatus })
      });
      fetchEmployees();
    } catch (err) {
      console.error(err);
    }
  };

  const openEditDialog = (employee: Employee) => {
    setEditingEmployee(employee);
    setFormData({
      name: employee.name,
      phone: employee.phone,
      role: employee.role,
      baseSalary: employee.baseSalary.toString(),
    });
    setDialogOpen(true);
  };

  return (
    <AppLayout title="Employees">
      <div className="space-y-8 animate-in fade-in duration-700">
        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center glass p-6 rounded-3xl border-white/50">
          <div className="relative flex-1 max-w-md group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#5A7863]/40 group-focus-within:text-[#5A7863] transition-colors" />
            <Input
              placeholder="Search employees by name or role..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 bg-white/50 border-[#5A7863]/10 focus:border-[#5A7863]/30 h-12 rounded-2xl transition-all shadow-sm"
            />
          </div>

          <Dialog open={dialogOpen} onOpenChange={(open) => {
            setDialogOpen(open);
            if (!open) {
              setEditingEmployee(null);
              setFormData({ name: "", phone: "", role: "", baseSalary: "" });
            }
          }}>
            <DialogTrigger asChild>
              <Button className="btn-premium h-12 px-8 flex items-center gap-2 group">
                <Plus className="h-5 w-5 group-hover:rotate-90 transition-transform duration-300" />
                <span className="font-outfit tracking-wide">Register Employee</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] glass rounded-[2rem] border-white/40">
              <DialogHeader>
                <DialogTitle className="text-2xl font-extrabold text-[#3B4953] font-outfit">
                  {editingEmployee ? "Refine Employee Profile" : "New Talent Onboarding"}
                </DialogTitle>
                <p className="text-sm text-[#3B4953]/60">Fill in the details below to manage your workforce.</p>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-6 mt-4">
                <div className="grid grid-cols-1 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-[#3B4953]/80 font-bold ml-1">Full Identity Name</Label>
                    <Input
                      id="name"
                      placeholder="e.g. John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="h-12 rounded-2xl bg-white/50 border-[#5A7863]/20"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="role" className="text-[#3B4953]/80 font-bold ml-1">Professional Role</Label>
                      <Input
                        id="role"
                        value={formData.role}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                        placeholder="e.g. Senior Manager"
                        className="h-12 rounded-2xl bg-white/50 border-[#5A7863]/20"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-[#3B4953]/80 font-bold ml-1">Contact Link</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+250 788..."
                        className="h-12 rounded-2xl bg-white/50 border-[#5A7863]/20"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="salary" className="text-[#3B4953]/80 font-bold ml-1">Base Monthly Remuneration (RWF)</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#5A7863]/40" />
                      <Input
                        id="baseSalary"
                        type="number"
                        value={formData.baseSalary}
                        onChange={(e) => setFormData({ ...formData, baseSalary: e.target.value })}
                        className="h-12 pl-10 rounded-2xl bg-white/50 border-[#5A7863]/20"
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="pt-4">
                  <Button type="submit" className="w-full btn-premium h-14 text-lg">
                    {editingEmployee ? "Update Employee Data" : "Finalize Onboarding"}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <Card className="glass shadow-xl hover:shadow-2xl transition-all duration-500 rounded-[2rem] border-white/50 group">
            <CardContent className="p-8 flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-[#5A7863] uppercase tracking-widest mb-1 opacity-60">Workforce</p>
                <p className="text-4xl font-extrabold text-[#3B4953] font-outfit">{employees.length}</p>
              </div>
              <div className="h-14 w-14 rounded-2xl bg-[#5A7863]/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                <Users className="h-7 w-7 text-[#5A7863]" />
              </div>
            </CardContent>
          </Card>
          <Card className="glass shadow-xl hover:shadow-2xl transition-all duration-500 rounded-[2rem] border-white/50 group">
            <CardContent className="p-8 flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-green-600 uppercase tracking-widest mb-1 opacity-60">Active Pulse</p>
                <p className="text-4xl font-extrabold text-[#3B4953] font-outfit">{employees.filter(e => e.status === 'active').length}</p>
              </div>
              <div className="h-14 w-14 rounded-2xl bg-green-500/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                <UserCheck className="h-7 w-7 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card className="glass shadow-xl hover:shadow-2xl transition-all duration-500 rounded-[2rem] border-white/50 group">
            <CardContent className="p-8 flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-[#3B4953] uppercase tracking-widest mb-1 opacity-60">Offbeat</p>
                <p className="text-4xl font-extrabold text-[#3B4953] font-outfit">{employees.filter(e => e.status === 'inactive').length}</p>
              </div>
              <div className="h-14 w-14 rounded-2xl bg-gray-500/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                <UserX className="h-7 w-7 text-gray-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Employees Table */}
        <Card className="glass-card overflow-hidden rounded-[2.5rem] border-white/60 shadow-2xl">
          <div className="px-8 py-6 border-b border-[#5A7863]/10 flex items-center justify-between bg-white/40">
            <h2 className="text-2xl font-extrabold text-[#3B4953] font-outfit">Workforce Directory</h2>
            <Badge className="bg-[#5A7863]/20 text-[#5A7863] hover:bg-[#5A7863]/30 px-4 py-1.5 rounded-full border-none font-bold">
              {filteredEmployees.length} result{filteredEmployees.length !== 1 ? 's' : ''}
            </Badge>
          </div>
          <CardContent className="p-0">
            {filteredEmployees.length === 0 ? (
              <div className="text-center py-24 px-6">
                <div className="h-20 w-20 bg-[#5A7863]/5 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="h-10 w-10 text-[#5A7863]/20" />
                </div>
                <h3 className="text-xl font-bold text-[#3B4953] mb-2">No Matches Found</h3>
                <p className="text-[#3B4953]/50 max-w-xs mx-auto">
                  {employees.length === 0
                    ? "Start building your dream team by adding your first employee."
                    : "Adjust your search parameters and try again."
                  }
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader className="bg-[#5A7863]/5">
                    <TableRow className="hover:bg-transparent border-none">
                      <TableHead className="py-5 pl-10 font-bold uppercase tracking-widest text-[10px] text-[#5A7863]">Employee Profile</TableHead>
                      <TableHead className="py-5 font-bold uppercase tracking-widest text-[10px] text-[#5A7863]">Engagement Role</TableHead>
                      <TableHead className="py-5 font-bold uppercase tracking-widest text-[10px] text-[#5A7863]">Contact Details</TableHead>
                      <TableHead className="py-5 font-bold uppercase tracking-widest text-[10px] text-[#5A7863]">Remuneration</TableHead>
                      <TableHead className="py-5 font-bold uppercase tracking-widest text-[10px] text-[#5A7863]">Current State</TableHead>
                      <TableHead className="py-5 pr-10 text-right font-bold uppercase tracking-widest text-[10px] text-[#5A7863]">Management</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredEmployees.map((employee) => (
                      <TableRow key={employee._id} className="group hover:bg-[#5A7863]/5 transition-colors duration-300 border-b border-[#5A7863]/5">
                        <TableCell className="py-6 pl-10 font-bold text-[#3B4953] text-lg">{employee.name}</TableCell>
                        <TableCell className="py-6">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="rounded-lg bg-white/50 border-[#5A7863]/10 text-[#5A7863] font-medium">
                              {employee.role}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell className="py-6 text-[#3B4953]/60 italic font-medium">{employee.phone}</TableCell>
                        <TableCell className="py-6 font-bold text-[#5A7863]">{employee.baseSalary?.toLocaleString()} RWF</TableCell>
                        <TableCell className="py-6">
                          <Badge className={`rounded-full px-4 py-1 font-bold tracking-wide border-none ${employee.status === 'active'
                            ? 'bg-green-500/10 text-green-600'
                            : 'bg-gray-500/10 text-gray-500'
                            }`}>
                            {employee.status === 'active' ? '● ONLINE' : '○ OFFLINE'}
                          </Badge>
                        </TableCell>
                        <TableCell className="py-6 pr-10 text-right">
                          <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-10 w-10 text-primary hover:bg-primary/10 rounded-xl"
                              onClick={() => openEditDialog(employee)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-10 w-10 rounded-xl hover:bg-red-500/10"
                              onClick={() => toggleStatus(employee)}
                            >
                              {employee.status === 'active'
                                ? <UserX className="h-4 w-4 text-destructive" />
                                : <UserCheck className="h-4 w-4 text-green-600" />
                              }
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
