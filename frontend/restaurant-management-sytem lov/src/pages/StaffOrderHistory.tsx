import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRestaurant } from '@/contexts/RestaurantContext';
import { formatCurrency } from '@/types/restaurant';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, ChefHat, Receipt } from 'lucide-react';
import { format } from 'date-fns';

const StaffOrderHistory = () => {
    const { currentUser, myOrders, fetchMyOrders } = useRestaurant();
    const navigate = useNavigate();

    useEffect(() => {
        fetchMyOrders();
    }, []);

    const safeOrders = Array.isArray(myOrders) ? myOrders : [];

    const totalRevenue = safeOrders.reduce(
        (sum, o) => sum + Number(o?.total ?? 0),
        0
    );

    return (
        <div className="flex flex-col h-screen">
            <header className="flex items-center justify-between px-4 py-3 border-b bg-card shadow-sm">
                <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                        <ChefHat className="h-4 w-4" />
                    </div>
                    <div>
                        <h1 className="text-lg font-bold font-serif leading-none">RestroManager</h1>
                        <p className="text-[10px] font-semibold text-primary/80 mt-0.5">Tanisha Restaurant</p>
                        <p className="text-xs text-muted-foreground mt-1">My Orders · {currentUser?.name}</p>
                    </div>
                </div>
                <Button variant="ghost" size="sm" onClick={() => navigate('/staff')} className="gap-2">
                    <ArrowLeft className="h-4 w-4" />
                    <span className="hidden sm:inline">Back to Dashboard</span>
                </Button>
            </header>

            <div className="flex-1 overflow-auto p-4 lg:p-6">
                <div className="max-w-5xl mx-auto space-y-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-bold flex items-center gap-2">
                                <Receipt className="h-6 w-6 text-primary" />
                                My Order History
                            </h2>
                            <p className="text-muted-foreground mt-1">
                                {safeOrders.length} orders · {formatCurrency(totalRevenue)} total revenue
                            </p>
                        </div>
                    </div>

                    {safeOrders.length === 0 ? (
                        <div className="text-center py-16 text-muted-foreground bg-card rounded-xl border">
                            <Receipt className="h-12 w-12 mx-auto mb-3 opacity-40" />
                            <p className="text-lg font-medium">No orders yet</p>
                            <p className="text-sm mt-1">Orders you create will appear here.</p>
                            <Button variant="outline" className="mt-4" onClick={() => navigate('/staff')}>
                                Go to Dashboard
                            </Button>
                        </div>
                    ) : (
                        <div className="bg-card rounded-xl border overflow-hidden">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Order ID</TableHead>
                                        <TableHead>Table</TableHead>
                                        <TableHead>Items</TableHead>
                                        <TableHead>Subtotal</TableHead>
                                        <TableHead>Tax</TableHead>
                                        <TableHead>Total</TableHead>
                                        <TableHead>Payment</TableHead>
                                        <TableHead>Date/Time</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {safeOrders.map(order => (
                                        <TableRow key={order.id}>
                                            <TableCell className="font-mono text-sm">{order.id}</TableCell>
                                            <TableCell>{order.tableNumber}</TableCell>
                                            <TableCell className="max-w-48 truncate">
                                                {(order.items ?? [])
                                                    .map(i => `${i.menuItem?.name ?? ''} x${i.quantity ?? 0}`)
                                                    .join(', ')}
                                            </TableCell>
                                            <TableCell>{formatCurrency(order.subtotal)}</TableCell>
                                            <TableCell className="text-muted-foreground">{formatCurrency(Number(order.cgst) + Number(order.sgst))}</TableCell>
                                            <TableCell className="font-semibold">{formatCurrency(order.total)}</TableCell>
                                            <TableCell>
                                                <Badge variant={order.paymentMethod === 'cash' ? 'secondary' : 'default'}>
                                                    {order.paymentMethod === 'cash' ? 'Cash' : 'Online'}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-muted-foreground whitespace-nowrap">
                                                {format(new Date(order.createdAt), 'dd/MM HH:mm')}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default StaffOrderHistory;
