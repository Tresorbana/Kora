export interface Employee {
  id: string;
  name: string;
  phone: string;
  role: string;
  hireDate: string;
  status: 'active' | 'inactive';
  salary: number;
}

export interface Attendance {
  id: string;
  employeeId: string;
  date: string;
  status: 'present' | 'absent' | 'late';
  checkIn?: string;
  checkOut?: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  stock: number;
  price: number;
  lowStockThreshold: number;
}

export interface Sale {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  totalPrice: number;
  date: string;
  customerId?: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  assignedEmployeeIds: string[];
  deadline: string;
  status: 'pending' | 'in-progress' | 'completed';
  createdAt: string;
}

export interface Customer {
  id: string;
  name: string;
  contact: string;
  totalTransactions: number;
}

export interface Supplier {
  id: string;
  name: string;
  contact: string;
  totalTransactions: number;
}
