export interface MenuItem {
  id: string;
  name: string;
  price: number;
  category: string;
  available: boolean;
}

export interface OrderItem {
  menuItem: MenuItem;
  quantity: number;
}

export interface Order {
  id: string;
  tableNumber: number;
  items: OrderItem[];
  subtotal: number;
  cgst: number;
  sgst: number;
  total: number;
  paymentMethod: 'cash' | 'online';
  createdAt: Date;
  staffName: string;
}

export interface StaffMember {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'staff';
  active: boolean;
}

export type UserRole = 'admin' | 'staff';

export interface CurrentUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export const CGST_RATE = 0.025;
export const SGST_RATE = 0.025;

export const formatCurrency = (amount: number | string): string => {
  return `₹${Number(amount).toFixed(2)}`;
};