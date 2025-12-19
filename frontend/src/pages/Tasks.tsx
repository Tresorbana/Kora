
import { useState, useEffect } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { ClipboardList, Calendar, Users, CheckCircle2, CircleDashed, Timer, Plus, MoreVertical, LayoutGrid, List } from "lucide-react";

interface Task {
  _id: string;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed';
  deadline: string;
  assignedEmployeeIds: { _id: string, name: string }[];
}

export default function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [employees, setEmployees] = useState<any[]>([]);
  const [newTask, setNewTask] = useState({ title: "", description: "", assignedTo: "", deadline: "" });
  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchTasks();
    fetchEmployees();
  }, []);

  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/api/tasks', { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
    setTasks(await res.json());
  };

  const fetchEmployees = async () => {
    const res = await fetch('http://localhost:5000/api/employees', { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
    setEmployees(await res.json());
  };

  const createTask = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` },
        body: JSON.stringify({
          title: newTask.title,
          description: newTask.description,
          assignedEmployeeIds: [newTask.assignedTo],
          deadline: newTask.deadline
        })
      });
      if (res.ok) {
        toast({ title: "Task deployed", description: "Operation has been successfully assigned to talent." });
        setDialogOpen(false);
        fetchTasks();
        setNewTask({ title: "", description: "", assignedTo: "", deadline: "" });
      }
    } catch (e) {
      toast({ title: "Deployment failed", variant: "destructive" });
    }
  };

  const updateStatus = async (id: string, status: string) => {
    await fetch(`http://localhost:5000/api/tasks/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` },
      body: JSON.stringify({ status })
    });
    fetchTasks();
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-600 border-green-200';
      case 'in-progress': return 'bg-blue-100 text-blue-600 border-blue-200';
      default: return 'bg-amber-100 text-amber-600 border-amber-200';
    }
  };

  return (
    <AppLayout title="Tactical Directives">
      <div className="space-y-8 animate-in fade-in duration-700">
        <div className="flex flex-col sm:flex-row justify-between items-center glass p-8 rounded-[2.5rem] border-white/60 shadow-xl">
          <div className="space-y-1">
            <h2 className="text-2xl font-black text-[#3B4953] font-outfit">Directive Management</h2>
            <p className="text-[#3B4953]/50 font-medium">Orchestrate tasks and track operational velocity.</p>
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button className="btn-premium h-14 px-10 text-lg shadow-2xl active:scale-95 group">
                <Plus className="mr-2 h-5 w-5 group-hover:rotate-90 transition-transform duration-300" />
                Issue Directive
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] glass rounded-[2.5rem] border-white/60 shadow-2xl overflow-hidden p-0">
              <div className="bg-gradient-to-r from-[#5A7863] to-[#3B4953] p-8 text-white">
                <DialogTitle className="text-3xl font-black font-outfit">Issue Directive</DialogTitle>
                <p className="text-white/60 text-sm font-medium mt-1">Assign critical operations to your workforce.</p>
              </div>
              <form onSubmit={createTask} className="p-8 space-y-6">
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-[#5A7863] ml-1">Directive Title</Label>
                  <Input
                    value={newTask.title}
                    onChange={e => setNewTask({ ...newTask, title: e.target.value })}
                    className="h-12 rounded-2xl bg-[#EBF4DD]/20 border-white/40 shadow-sm focus:ring-[#5A7863]/20"
                    placeholder="e.g., Performance Review Optimization"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-[#5A7863] ml-1">Strategic Description</Label>
                  <Textarea
                    value={newTask.description}
                    onChange={e => setNewTask({ ...newTask, description: e.target.value })}
                    className="rounded-2xl bg-[#EBF4DD]/20 border-white/40 shadow-sm focus:ring-[#5A7863]/20 min-h-[100px]"
                    placeholder="Provide deep context for this operation..."
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-[#5A7863] ml-1">Assign Talent</Label>
                    <Select onValueChange={val => setNewTask({ ...newTask, assignedTo: val })}>
                      <SelectTrigger className="h-12 rounded-2xl bg-[#EBF4DD]/20 border-white/40 shadow-sm">
                        <SelectValue placeholder="Select Talent" />
                      </SelectTrigger>
                      <SelectContent className="glass rounded-2xl border-white/60">
                        {employees.map(e => <SelectItem key={e._id} value={e._id} className="rounded-xl focus:bg-[#5A7863]/10">{e.name}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-[#5A7863] ml-1">Deadline Cap</Label>
                    <Input
                      type="date"
                      value={newTask.deadline}
                      onChange={e => setNewTask({ ...newTask, deadline: e.target.value })}
                      className="h-12 rounded-2xl bg-[#EBF4DD]/20 border-white/40 shadow-sm"
                    />
                  </div>
                </div>
                <Button type="submit" className="w-full btn-premium h-14 text-lg mt-4">Execute Assignment</Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {tasks.map(task => (
            <Card key={task._id} className="glass-card overflow-hidden flex flex-col border-white/60 hover:-translate-y-2 transition-all duration-500 shadow-xl group">
              <div className="px-8 py-6 border-b border-white/40 flex justify-between items-start bg-white/20">
                <div className="flex flex-col gap-2">
                  <Badge className={`w-fit px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-[2px] border ${getStatusStyle(task.status)}`}>
                    {task.status.replace('-', ' ')}
                  </Badge>
                  <h3 className="text-xl font-black text-[#3B4953] font-outfit leading-tight group-hover:text-[#5A7863] transition-colors">{task.title}</h3>
                </div>
                <Button variant="ghost" size="icon" className="rounded-xl h-10 w-10 text-[#3B4953]/20 hover:text-[#3B4953] hover:bg-white/50">
                  <MoreVertical className="h-5 w-5" />
                </Button>
              </div>
              <CardContent className="p-8 space-y-6 flex-1 flex flex-col">
                <p className="text-sm text-[#3B4953]/60 font-medium leading-relaxed flex-1">{task.description}</p>

                <div className="space-y-3 pt-6 border-t border-white/40">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[#5A7863] to-[#3B4953] flex items-center justify-center text-white text-[10px] font-black">
                      {task.assignedEmployeeIds[0]?.name[0] || "T"}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] font-black uppercase tracking-widest text-[#5A7863] opacity-60 leading-none">Primary Talent</span>
                      <span className="text-sm font-bold text-[#3B4953]">{task.assignedEmployeeIds.map(e => e.name).join(', ')}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-600">
                      <Clock className="h-4 w-4" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] font-black uppercase tracking-widest text-[#5A7863] opacity-60 leading-none">Deadline</span>
                      <span className="text-sm font-bold text-[#3B4953]">{task.deadline ? new Date(task.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'None Established'}</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 mt-4 pt-4 border-t border-white/20">
                  {task.status !== 'completed' ? (
                    <Button size="lg" className="btn-premium flex-1 h-12 rounded-2xl shadow-lg shadow-[#5A7863]/20" onClick={() => updateStatus(task._id, 'completed')}>
                      Complete
                    </Button>
                  ) : (
                    <Button size="lg" variant="outline" className="flex-1 h-12 rounded-2xl border-2 border-green-500/20 text-green-600 font-bold bg-green-50" disabled>
                      <CheckCircle2 className="h-4 w-4 mr-2" />
                      Operation Success
                    </Button>
                  )}
                  {task.status === 'pending' && (
                    <Button size="lg" variant="outline" className="flex-1 h-12 rounded-2xl border-2 border-[#3B4953]/10 text-[#3B4953] font-bold hover:bg-white/40" onClick={() => updateStatus(task._id, 'in-progress')}>
                      Initiate
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}

          {tasks.length === 0 && (
            <div className="col-span-full py-20 flex flex-col items-center justify-center opacity-10 space-y-6">
              <ClipboardList className="h-32 w-32" />
              <p className="text-4xl font-black font-outfit uppercase tracking-tighter">No Active Directives</p>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
