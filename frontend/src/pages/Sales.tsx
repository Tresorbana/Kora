import { useState } from "react";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Search, ShoppingCart, TrendingUp } from "lucide-react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Product, Sale } from "@/types";
import { useToast } from "@/hooks/use-toast";

export default function Sales() {
  const [products, setProducts] = useLocalStorage<Product[]>('bms-products', []);
  const [sales, setSales] = useLocalStorage<Sale[]>('bms-sales', []);
  const [searchTerm, setSearchTerm] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    productId: "",
    quantity: "",
  });

  const filteredSales = sales.filter(sale =>
    sale.productName.toLowerCase().includes(searchTerm.toLowerCase())
  ).reverse();

  const selectedProduct = products.find(p => p.id === formData.productId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedProduct) {
      toast({ title: "Please select a product", variant: "destructive" });
      return;
    }

    const quantity = parseInt(formData.quantity);
    
    if (quantity > selectedProduct.stock) {
      toast({ title: "Insufficient stock", variant: "destructive" });
      return;
    }

    const newSale: Sale = {
      id: crypto.randomUUID(),
      productId: selectedProduct.id,
      productName: selectedProduct.name,
      quantity,
      totalPrice: quantity * selectedProduct.price,
      date: new Date().toISOString(),
    };

    setSales([...sales, newSale]);
    
    // Update product stock
    setProducts(products.map(p =>
      p.id === selectedProduct.id
        ? { ...p, stock: p.stock - quantity }
        : p
    ));

    toast({ title: "Sale recorded successfully" });
    setFormData({ productId: "", quantity: "" });
    setDialogOpen(false);
  };

  const totalRevenue = sales.reduce((acc, sale) => acc + sale.totalPrice, 0);
  const todaySales = sales.filter(s => 
    new Date(s.date).toDateString() === new Date().toDateString()
  );
  const todayRevenue = todaySales.reduce((acc, sale) => acc + sale.totalPrice, 0);

  return (
    <AppLayout title="Sales">
      <div className="space-y-6 animate-fade-in">
        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search sales..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
          
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gradient-primary text-primary-foreground">
                <Plus className="h-4 w-4 mr-2" />
                New Sale
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="font-display">Record New Sale</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label>Select Product</Label>
                  <Select
                    value={formData.productId}
                    onValueChange={(value) => setFormData({ ...formData, productId: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a product" />
                    </SelectTrigger>
                    <SelectContent>
                      {products.filter(p => p.stock > 0).map((product) => (
                        <SelectItem key={product.id} value={product.id}>
                          {product.name} - {product.price.toLocaleString()} RWF (Stock: {product.stock})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input
                    id="quantity"
                    type="number"
                    min="1"
                    max={selectedProduct?.stock || 1}
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    required
                  />
                </div>
                {selectedProduct && formData.quantity && (
                  <div className="p-4 rounded-lg bg-muted">
                    <p className="text-sm text-muted-foreground">Total Amount</p>
                    <p className="text-2xl font-bold text-primary">
                      {(parseInt(formData.quantity) * selectedProduct.price).toLocaleString()} RWF
                    </p>
                  </div>
                )}
                <Button 
                  type="submit" 
                  className="w-full gradient-primary text-primary-foreground"
                  disabled={products.length === 0}
                >
                  Record Sale
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="glass-card">
            <CardContent className="p-4 text-center">
              <ShoppingCart className="h-8 w-8 mx-auto mb-2 text-primary" />
              <p className="text-3xl font-bold">{sales.length}</p>
              <p className="text-sm text-muted-foreground">Total Sales</p>
            </CardContent>
          </Card>
          <Card className="glass-card">
            <CardContent className="p-4 text-center">
              <TrendingUp className="h-8 w-8 mx-auto mb-2 text-success" />
              <p className="text-3xl font-bold text-success">{todaySales.length}</p>
              <p className="text-sm text-muted-foreground">Today's Sales</p>
            </CardContent>
          </Card>
          <Card className="glass-card gradient-primary text-primary-foreground">
            <CardContent className="p-4 text-center">
              <p className="text-3xl font-bold">{totalRevenue.toLocaleString()}</p>
              <p className="text-sm opacity-80">Total Revenue (RWF)</p>
              <p className="text-xs mt-1 opacity-60">Today: {todayRevenue.toLocaleString()} RWF</p>
            </CardContent>
          </Card>
        </div>

        {/* Sales Table */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="font-display">Sales History</CardTitle>
          </CardHeader>
          <CardContent>
            {filteredSales.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                {sales.length === 0 
                  ? "No sales recorded yet. Click 'New Sale' to get started."
                  : "No sales match your search."
                }
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Product</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredSales.map((sale) => (
                      <TableRow key={sale.id}>
                        <TableCell>{new Date(sale.date).toLocaleDateString()}</TableCell>
                        <TableCell className="font-medium">{sale.productName}</TableCell>
                        <TableCell>{sale.quantity}</TableCell>
                        <TableCell className="font-semibold text-primary">
                          {sale.totalPrice.toLocaleString()} RWF
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
