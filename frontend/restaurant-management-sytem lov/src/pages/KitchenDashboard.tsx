import { useEffect, useState } from 'react';
import { useRestaurant } from '@/contexts/RestaurantContext';
import { formatCurrency, Order } from '@/types/restaurant';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChefHat, Clock, CheckCircle2, XCircle, PlayCircle, Loader2, ArrowLeft, User } from 'lucide-react';
import { format } from 'date-fns';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const KitchenDashboard = () => {
    const { orders, fetchOrders, updateOrderStatus, currentUser } = useRestaurant();
    const [prepTimes, setPrepTimes] = useState<Record<string, string>>({});
    const navigate = useNavigate();

    useEffect(() => {
        fetchOrders();
        const interval = setInterval(fetchOrders, 10000); // Refresh every 10 seconds
        return () => clearInterval(interval);
    }, []);

    const activeOrders = orders.filter(o => o.status === 'pending' || o.status === 'preparing');

    const handleAccept = async (orderId: string) => {
        const time = prepTimes[orderId] || "30";
        await updateOrderStatus(orderId, 'preparing', parseInt(time));
        toast.success(`Order ${orderId} is now being prepared!`);
    };

    const handleComplete = async (orderId: string) => {
        await updateOrderStatus(orderId, 'completed');
        toast.success(`Order ${orderId} marked as completed!`);
    };

    const handleCancel = async (orderId: string) => {
        if (confirm("Are you sure you want to cancel this order?")) {
            await updateOrderStatus(orderId, 'cancelled');
            toast.error(`Order ${orderId} cancelled.`);
        }
    };

    return (
        <div className="min-h-screen bg-muted/30 p-4 lg:p-8">
            <div className="max-w-7xl mx-auto space-y-8">
                <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
                            <ArrowLeft className="h-6 w-6" />
                        </Button>
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg">
                            <ChefHat className="h-6 w-6" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">Kitchen Dashboard</h1>
                            <p className="text-muted-foreground">Manage live orders and preparation times</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 bg-card p-2 rounded-xl border shadow-sm px-4">
                        <div className="h-3 w-3 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-sm font-medium">Live System Active</span>
                    </div>
                </header>

                {activeOrders.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 bg-card rounded-3xl border border-dashed text-muted-foreground shadow-sm">
                        <Loader2 className="h-12 w-12 mb-4 opacity-20 animate-spin" />
                        <p className="text-xl font-medium">No incoming orders at the moment</p>
                        <p className="text-sm">New customer orders will appear here automatically.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {activeOrders.map(order => (
                            <Card key={order.id} className={`border-none shadow-xl overflow-hidden transition-all hover:scale-[1.02] ${order.status === 'preparing' ? 'ring-2 ring-orange-500' : 'ring-1 ring-border'}`}>
                                <CardHeader className={`pb-3 ${order.status === 'preparing' ? 'bg-orange-50' : 'bg-muted/50'}`}>
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-1">
                                            <Badge variant={order.status === 'preparing' ? 'secondary' : 'default'} className="uppercase px-3 py-1 text-[10px] font-bold tracking-widest text-orange-600 border-orange-200 bg-orange-50">
                                                {order.status}
                                            </Badge>
                                            <CardTitle className="text-xl font-mono">#{order.id}</CardTitle>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-2xl font-black text-primary">Table {order.tableNumber}</p>
                                            <div className="flex items-center justify-end gap-1 text-muted-foreground mt-1">
                                                <User className="h-3 w-3" />
                                                <span className="text-[10px] font-bold uppercase">{order.staffName}</span>
                                            </div>
                                            <p className="text-[10px] text-muted-foreground font-medium uppercase mt-1">{format(new Date(order.createdAt), 'hh:mm a')}</p>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="pt-6 space-y-4">
                                    <div className="space-y-3">
                                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Order Items</p>
                                        <div className="space-y-2">
                                            {(order.items ?? []).map((item, idx) => (
                                                <div key={idx} className="flex justify-between items-center p-3 rounded-xl bg-muted/30 border border-muted-foreground/10">
                                                    <span className="font-bold text-sm">{item.menuItem.name}</span>
                                                    <Badge variant="secondary" className="h-7 w-7 rounded-full flex items-center justify-center p-0 text-xs font-bold">
                                                        x{item.quantity}
                                                    </Badge>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {order.status === 'preparing' && order.startTime && (
                                        <div className="bg-orange-100 p-4 rounded-2xl flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 bg-white rounded-full text-orange-600 shadow-sm">
                                                    <Clock className="h-5 w-5 animate-pulse" />
                                                </div>
                                                <div>
                                                    <p className="text-[10px] font-bold text-orange-800 uppercase">Est. Prep Time</p>
                                                    <p className="text-sm font-black text-orange-950">{order.estimatedTime} mins</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-[10px] font-bold text-orange-800 uppercase">Started</p>
                                                <p className="text-sm font-black text-orange-950">{format(new Date(order.startTime), 'HH:mm')}</p>
                                            </div>
                                        </div>
                                    )}
                                </CardContent>
                                <CardFooter className="bg-muted/10 p-4 pt-0 gap-3 border-t border-muted/20">
                                    {order.status === 'pending' ? (
                                        <div className="w-full space-y-4 pt-4">
                                            <div className="flex items-center gap-3">
                                                <Input
                                                    type="number"
                                                    placeholder="Mins"
                                                    className="w-24 h-12 font-bold text-center rounded-xl"
                                                    value={prepTimes[order.id] || ""}
                                                    onChange={(e) => setPrepTimes(prev => ({ ...prev, [order.id]: e.target.value }))}
                                                />
                                                <Button
                                                    className="flex-1 h-12 gap-2 rounded-xl text-base font-bold shadow-lg shadow-primary/20"
                                                    onClick={() => handleAccept(order.id)}
                                                >
                                                    <PlayCircle className="h-5 w-5" /> Accept Order
                                                </Button>
                                            </div>
                                            <Button variant="ghost" className="w-full text-destructive hover:text-destructive hover:bg-destructive/10 gap-2 h-10 font-bold" onClick={() => handleCancel(order.id)}>
                                                <XCircle className="h-4 w-4" /> Decline
                                            </Button>
                                        </div>
                                    ) : (
                                        <Button
                                            className="w-full h-14 bg-green-600 hover:bg-green-700 text-white gap-2 rounded-xl text-lg font-black shadow-lg shadow-green-200 mt-4"
                                            onClick={() => handleComplete(order.id)}
                                        >
                                            <CheckCircle2 className="h-6 w-6" /> Mark as Ready
                                        </Button>
                                    )}
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default KitchenDashboard;
