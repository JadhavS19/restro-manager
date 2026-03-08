import { useState, useEffect, useCallback, useRef } from 'react';

export interface OrderNotification {
    id: string;
    orderId: string;
    message: string;
    status: string;
    createdAt: number; // timestamp
    read: boolean;
}

const STORAGE_KEY = 'order_notifications';
const POLL_INTERVAL = 15000; // poll every 15 seconds
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const getStoredNotifications = (): OrderNotification[] => {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    } catch {
        return [];
    }
};

const saveNotifications = (notifications: OrderNotification[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notifications));
};

export const useNotifications = (isLoggedIn: boolean) => {
    const [notifications, setNotifications] = useState<OrderNotification[]>(getStoredNotifications);
    const prevOrderStatusesRef = useRef<Record<string, string>>({});
    const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const requestBrowserPermission = async () => {
        if ('Notification' in window && Notification.permission === 'default') {
            await Notification.requestPermission();
        }
    };

    const sendBrowserNotification = (title: string, body: string) => {
        if ('Notification' in window && Notification.permission === 'granted') {
            new Notification(title, {
                body,
                icon: '/favicon.ico',
                badge: '/favicon.ico',
            });
        }
    };

    const addNotification = useCallback((notification: Omit<OrderNotification, 'id' | 'createdAt' | 'read'>) => {
        const newNotif: OrderNotification = {
            ...notification,
            id: `notif_${Date.now()}_${Math.random().toString(36).slice(2)}`,
            createdAt: Date.now(),
            read: false,
        };

        setNotifications(prev => {
            const updated = [newNotif, ...prev].slice(0, 20); // keep last 20
            saveNotifications(updated);
            return updated;
        });

        sendBrowserNotification('🍽️ Order Update', notification.message);
    }, []);

    const markAllRead = useCallback(() => {
        setNotifications(prev => {
            const updated = prev.map(n => ({ ...n, read: true }));
            saveNotifications(updated);
            return updated;
        });
    }, []);

    const markRead = useCallback((id: string) => {
        setNotifications(prev => {
            const updated = prev.map(n => n.id === id ? { ...n, read: true } : n);
            saveNotifications(updated);
            return updated;
        });
    }, []);

    const clearAll = useCallback(() => {
        setNotifications([]);
        localStorage.removeItem(STORAGE_KEY);
    }, []);

    const pollOrders = useCallback(async () => {
        const token = localStorage.getItem('token');
        if (!token) return;

        try {
            const res = await fetch(`${API_URL}/orders/my-orders`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (!res.ok) return;
            const data = await res.json();
            const orders: Array<{ id: string; status: string; tableNumber: number }> = data.data || data.orders || [];

            orders.forEach(order => {
                const prevStatus = prevOrderStatusesRef.current[order.id];

                // Only notify if status changed
                if (prevStatus && prevStatus !== order.status) {
                    let message = '';
                    if (order.status === 'completed') {
                        message = `🎉 Your order #${order.id.slice(-6).toUpperCase()} (Table ${order.tableNumber}) is ready! Please collect it.`;
                    } else if (order.status === 'preparing') {
                        message = `👨‍🍳 Your order #${order.id.slice(-6).toUpperCase()} is now being prepared!`;
                    } else if (order.status === 'cancelled') {
                        message = `❌ Your order #${order.id.slice(-6).toUpperCase()} has been cancelled.`;
                    }

                    if (message) {
                        addNotification({ orderId: order.id, message, status: order.status });
                    }
                }

                // Store current status for next poll
                prevOrderStatusesRef.current[order.id] = order.status;
            });
        } catch (err) {
            // Silently fail — polling errors shouldn't break the UI
        }
    }, [addNotification]);

    useEffect(() => {
        if (!isLoggedIn) {
            if (pollRef.current) clearInterval(pollRef.current);
            return;
        }

        requestBrowserPermission();

        // Initial poll immediately
        pollOrders();

        // Then poll every 15s
        pollRef.current = setInterval(pollOrders, POLL_INTERVAL);

        return () => {
            if (pollRef.current) clearInterval(pollRef.current);
        };
    }, [isLoggedIn, pollOrders]);

    const unreadCount = notifications.filter(n => !n.read).length;

    return { notifications, unreadCount, markRead, markAllRead, clearAll };
};
