import { useState } from 'react';
import { useRestaurant } from '@/contexts/RestaurantContext';
import { formatCurrency } from '@/types/restaurant';
import AdminLayout from '@/components/restaurant/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const categories = ['Starters', 'Main Course', 'Beverages', 'Desserts'];

const MenuManagement = () => {
  const { menuItems, addMenuItem, updateMenuItem, deleteMenuItem } = useRestaurant();
  const { toast } = useToast();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState(categories[0]);
  const [available, setAvailable] = useState(true);

  const resetForm = () => {
    setName('');
    setPrice('');
    setCategory(categories[0]);
    setAvailable(true);
    setEditingId(null);
  };

  const openAdd = () => {
    resetForm();
    setDialogOpen(true);
  };

  const openEdit = (id: string) => {
    const item = menuItems.find(i => i.id === id);
    if (!item) return;
    setEditingId(id);
    setName(item.name);
    setPrice(String(item.price));
    setCategory(item.category);
    setAvailable(item.available);
    setDialogOpen(true);
  };

  const handleSave = () => {
    if (!name || !price || isNaN(Number(price))) {
      toast({ title: 'Error', description: 'Please fill all fields correctly.', variant: 'destructive' });
      return;
    }
    if (editingId) {
      updateMenuItem(editingId, { name, price: Number(price), category, available });
      toast({ title: 'Updated', description: `${name} has been updated.` });
    } else {
      addMenuItem({ name, price: Number(price), category, available });
      toast({ title: 'Added', description: `${name} has been added to the menu.` });
    }
    setDialogOpen(false);
    resetForm();
  };

  const handleDelete = (id: string) => {
    const item = menuItems.find(i => i.id === id);
    deleteMenuItem(id);
    toast({ title: 'Deleted', description: `${item?.name} has been removed.` });
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Menu Management</h1>
            <p className="text-muted-foreground mt-1">{menuItems.length} items in menu</p>
          </div>
          <Button onClick={openAdd} className="gap-2">
            <Plus className="h-4 w-4" />
            Add Item
          </Button>
        </div>

        <div className="bg-card rounded-xl border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {menuItems.map(item => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{item.category}</Badge>
                  </TableCell>
                  <TableCell className="font-semibold">{formatCurrency(item.price)}</TableCell>
                  <TableCell>
                    <Badge variant={item.available ? 'default' : 'secondary'}>
                      {item.available ? 'Available' : 'Unavailable'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="icon" onClick={() => openEdit(item.id)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={() => handleDelete(item.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingId ? 'Edit Menu Item' : 'Add Menu Item'}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-2">
              <div className="space-y-2">
                <Label>Item Name</Label>
                <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g., Butter Chicken" />
              </div>
              <div className="space-y-2">
                <Label>Price (₹)</Label>
                <Input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="e.g., 350" />
              </div>
              <div className="space-y-2">
                <Label>Category</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {categories.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between">
                <Label>Available</Label>
                <Switch checked={available} onCheckedChange={setAvailable} />
              </div>
              <Button onClick={handleSave} className="w-full">
                {editingId ? 'Update Item' : 'Add Item'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
};

export default MenuManagement;
