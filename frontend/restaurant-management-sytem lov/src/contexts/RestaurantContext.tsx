// import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
// import { MenuItem, OrderItem, Order, StaffMember, CurrentUser, CGST_RATE, SGST_RATE } from '@/types/restaurant';

// interface RestaurantContextType {
//   currentUser: CurrentUser | null;
//   menuItems: MenuItem[];
//   orders: Order[];
//   staffMembers: StaffMember[];
//   login: (email: string, password: string) => Promise<boolean>;
//   logout: () => void;
//   addMenuItem: (item: Omit<MenuItem, 'id'>) => void;
//   updateMenuItem: (id: string, updates: Partial<MenuItem>) => void;
//   deleteMenuItem: (id: string) => void;
//   addStaffMember: (staff: Omit<StaffMember, 'id'>) => Promise<void>;
//   updateStaffMember: (id: string, updates: Partial<StaffMember>) => void;
//   deleteStaffMember: (id: string) => void;
//   addOrder: (tableNumber: number, items: OrderItem[], paymentMethod: 'cash' | 'online') => Order;
// }

// const RestaurantContext = createContext<RestaurantContextType | null>(null);

// const initialMenuItems: MenuItem[] = [
//   { id: '1', name: 'Spring Rolls', price: 180, category: 'Starters', available: true },
//   { id: '2', name: 'Tomato Soup', price: 150, category: 'Starters', available: true },
//   { id: '3', name: 'Garlic Bread', price: 120, category: 'Starters', available: true },
//   { id: '4', name: 'Paneer Tikka', price: 220, category: 'Starters', available: true },
//   { id: '5', name: 'Butter Chicken', price: 350, category: 'Main Course', available: true },
//   { id: '6', name: 'Paneer Butter Masala', price: 280, category: 'Main Course', available: true },
//   { id: '7', name: 'Grilled Fish', price: 420, category: 'Main Course', available: true },
//   { id: '8', name: 'Veg Biryani', price: 250, category: 'Main Course', available: true },
//   { id: '9', name: 'Dal Makhani', price: 220, category: 'Main Course', available: true },
//   { id: '10', name: 'Chicken Biryani', price: 320, category: 'Main Course', available: true },
//   { id: '11', name: 'Fresh Lime Soda', price: 80, category: 'Beverages', available: true },
//   { id: '12', name: 'Mango Lassi', price: 120, category: 'Beverages', available: true },
//   { id: '13', name: 'Masala Chai', price: 60, category: 'Beverages', available: true },
//   { id: '14', name: 'Cold Coffee', price: 140, category: 'Beverages', available: true },
//   { id: '15', name: 'Gulab Jamun', price: 150, category: 'Desserts', available: true },
//   { id: '16', name: 'Ice Cream', price: 130, category: 'Desserts', available: true },
//   { id: '17', name: 'Rasmalai', price: 160, category: 'Desserts', available: true },
//   { id: '18', name: 'Paneer Tikka', price: 320, category: 'Starters', available: true },
//   { id: '19', name: 'Hara Bhara Kabab', price: 280, category: 'Starters', available: true },
//   { id: '20', name: 'Veg Spring Roll', price: 240, category: 'Starters', available: true },
//   { id: '21', name: 'Chicken Tikka', price: 380, category: 'Starters', available: true },
//   { id: '22', name: 'Tandoori Chicken (Half)', price: 420, category: 'Starters', available: true },

//   { id: '23', name: 'Butter Roti', price: 40, category: 'Breads', available: true },
//   { id: '24', name: 'Plain Roti', price: 25, category: 'Breads', available: true },
//   { id: '25', name: 'Butter Naan', price: 60, category: 'Breads', available: true },
//   { id: '26', name: 'Garlic Naan', price: 80, category: 'Breads', available: true },
//   { id: '27', name: 'Lachha Paratha', price: 70, category: 'Breads', available: true },

//   { id: '28', name: 'Shahi Paneer', price: 300, category: 'Main Course', available: true },
//   { id: '29', name: 'Kadai Paneer', price: 290, category: 'Main Course', available: true },
//   { id: '30', name: 'Mix Veg', price: 240, category: 'Main Course', available: true },
//   { id: '31', name: 'Chole Masala', price: 230, category: 'Main Course', available: true },
//   { id: '32', name: 'Chicken Curry', price: 340, category: 'Main Course', available: true },
//   { id: '33', name: 'Butter Chicken', price: 380, category: 'Main Course', available: true },

//   { id: '34', name: 'Jeera Rice', price: 180, category: 'Rice', available: true },
//   { id: '35', name: 'Steam Rice', price: 140, category: 'Rice', available: true },
//   { id: '36', name: 'Veg Pulao', price: 220, category: 'Rice', available: true },
//   { id: '37', name: 'Chicken Fried Rice', price: 260, category: 'Rice', available: true }
// ];

// const initialStaff: StaffMember[] = [
//   { id: '1', name: 'Admin User', email: 'admin@restaurant.com', role: 'admin', active: true },
//   { id: '2', name: 'sakshi jadhav', email: 'sakshi@restaurant.com', role: 'staff', active: true },
//   { id: '3', name: 'Shreya jadhav', email: 'shreya@restaurant.com', role: 'staff', active: true },
// ];

// const mockCredentials: Record<string, { password: string; staffId: string }> = {
//   'admin@restaurant.com': { password: 'admin123', staffId: '1' },
//   'sakshi@restaurant.com': { password: 'staff123', staffId: '2' },
//   'shreya@restaurant.com': { password: 'staff123', staffId: '3' },
// };

// let orderCounter = 1;

// // export const RestaurantProvider = ({ children }: { children: ReactNode }) => {
// //   const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
// //   const [menuItems, setMenuItems] = useState<MenuItem[]>(initialMenuItems);
// //   const [orders, setOrders] = useState<Order[]>([]);
// //   const [staffMembers, setStaffMembers] = useState<StaffMember[]>(initialStaff);

// //   const login = useCallback((email: string, password: string): boolean => {
// //     const cred = mockCredentials[email];
// //     if (!cred || cred.password !== password) return false;
// //     const staff = staffMembers.find(s => s.id === cred.staffId);
// //     if (!staff || !staff.active) return false;
// //     setCurrentUser({ id: staff.id, name: staff.name, email: staff.email, role: staff.role });
// //     return true;
// //   }, [staffMembers]);

// //   const logout = useCallback(() => setCurrentUser(null), []);

// //   const addMenuItem = useCallback((item: Omit<MenuItem, 'id'>) => {
// //     setMenuItems(prev => [...prev, { ...item, id: Date.now().toString() }]);
// //   }, []);

// //   const updateMenuItem = useCallback((id: string, updates: Partial<MenuItem>) => {
// //     setMenuItems(prev => prev.map(item => item.id === id ? { ...item, ...updates } : item));
// //   }, []);

// //   const deleteMenuItem = useCallback((id: string) => {
// //     setMenuItems(prev => prev.filter(item => item.id !== id));
// //   }, []);

// //   const addStaffMember = useCallback((staff: Omit<StaffMember, 'id'>) => {
// //     setStaffMembers(prev => [...prev, { ...staff, id: Date.now().toString() }]);
// //   }, []);

// //   const updateStaffMember = useCallback((id: string, updates: Partial<StaffMember>) => {
// //     setStaffMembers(prev => prev.map(s => s.id === id ? { ...s, ...updates } : s));
// //   }, []);

// //   const deleteStaffMember = useCallback((id: string) => {
// //     setStaffMembers(prev => prev.filter(s => s.id !== id));
// //   }, []);

// //   const addOrder = useCallback((tableNumber: number, items: OrderItem[], paymentMethod: 'cash' | 'online'): Order => {
// //     const subtotal = items.reduce((sum, item) => sum + item.menuItem.price * item.quantity, 0);
// //     const cgst = subtotal * CGST_RATE;
// //     const sgst = subtotal * SGST_RATE;
// //     const total = subtotal + cgst + sgst;
// //     const order: Order = {
// //       id: `ORD-${String(orderCounter++).padStart(4, '0')}`,
// //       tableNumber,
// //       items,
// //       subtotal,
// //       cgst,
// //       sgst,
// //       total,
// //       paymentMethod,
// //       createdAt: new Date(),
// //       staffName: currentUser?.name || 'Unknown',
// //     };
// //     setOrders(prev => [order, ...prev]);
// //     return order;
// //   }, [currentUser]);

// //   return (
// //     <RestaurantContext.Provider value={{
// //       currentUser, menuItems, orders, staffMembers,
// //       login, logout,
// //       addMenuItem, updateMenuItem, deleteMenuItem,
// //       addStaffMember, updateStaffMember, deleteStaffMember,
// //       addOrder,
// //     }}>
// //       {children}
// //     </RestaurantContext.Provider>
// //   );
// // };

// export const useRestaurant = () => {
//   const context = useContext(RestaurantContext);
//   if (!context) throw new Error('useRestaurant must be used within RestaurantProvider');
//   return context;
// };



// // Add these at the top of your file
// const API_URL = 'http://localhost:5000/api';

// export const RestaurantProvider = ({ children }: { children: ReactNode }) => {
//   const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
//   const [staffMembers, setStaffMembers] = useState<StaffMember[]>([]);
//   const [loading, setLoading] = useState(false);

//   // 1. UPDATED LOGIN: Calls Node.js API
//   const login = useCallback(async (email: string, password: string): Promise<boolean> => {
//     try {
//       const response = await fetch(`${API_URL}/auth/login`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await response.json();

//       if (data.success) {
//         // Store token for future API calls
//         localStorage.setItem('token', data.token);
//         setCurrentUser(data.user);
//         return true;
//       }
//       return false;
//     } catch (error) {
//       console.error("Login Error:", error);
//       return false;
//     }
//   }, []);

//   // 2. UPDATED ADD STAFF: Sends data to MySQL
//   const addStaffMember = useCallback(async (staff: Omit<StaffMember, 'id'>) => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch(`${API_URL}/auth/add-staff`, {
//         method: 'POST',
//         headers: { 
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}` 
//         },
//         body: JSON.stringify(staff),
//       });

//       const data = await response.json();
//       if (data.success) {
//         // Refresh local state with the new staff member from DB
//         setStaffMembers(prev => [...prev, data.data]);
//       }
//     } catch (error) {
//       console.error("Failed to add staff:", error);
//     }
//   }, []);

//   // ... (Keep other functions for now, we will update them next)

//   return (
//     <RestaurantContext.Provider value={{
//       currentUser,
//       staffMembers,
//       login,
//       addStaffMember,
//       menuItems: [], // Placeholder for menuItems
//       orders: [], // Placeholder for orders
//       logout: () => {}, // Placeholder for logout
//       addMenuItem: () => {}, // Placeholder for addMenuItem
//       updateMenuItem: () => {}, // Placeholder for updateMenuItem
//       deleteMenuItem: () => {}, // Placeholder for deleteMenuItem
//       updateStaffMember: () => {}, // Placeholder for updateStaffMember
//       deleteStaffMember: () => {}, // Placeholder for deleteStaffMember
//       addOrder: () => ({ id: '', tableNumber: 0, items: [], subtotal: 0, cgst: 0, sgst: 0, total: 0, paymentMethod: 'cash', createdAt: new Date(), staffName: '' }), // Placeholder for addOrder
//     }}>
//       {children}
//     </RestaurantContext.Provider>
//   );
// };




import React, { createContext, useContext, useState, useCallback, ReactNode, useEffect } from 'react';
import { MenuItem, OrderItem, Order, StaffMember, CurrentUser, CGST_RATE, SGST_RATE } from '@/types/restaurant';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

interface RestaurantContextType {
  currentUser: CurrentUser | null;
  menuItems: MenuItem[];
  orders: Order[];
  myOrders: Order[];
  staffMembers: StaffMember[];
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  // Menu Actions
  addMenuItem: (item: Omit<MenuItem, 'id'>) => Promise<void>;
  updateMenuItem: (id: string, updates: Partial<MenuItem>) => Promise<void>;
  deleteMenuItem: (id: string) => Promise<void>;
  // Staff Actions
  addStaffMember: (staff: Omit<StaffMember, 'id'>) => Promise<void>;
  updateStaffMember: (id: string, updates: Partial<StaffMember>) => Promise<void>;
  deleteStaffMember: (id: string) => Promise<void>;
  addOrder: (tableNumber: number, items: OrderItem[], paymentMethod: 'cash' | 'online') => Promise<Order | null>;
  fetchMyOrders: () => Promise<void>;
}

const RestaurantContext = createContext<RestaurantContextType | null>(null);

export const RestaurantProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [staffMembers, setStaffMembers] = useState<StaffMember[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [myOrders, setMyOrders] = useState<Order[]>([]);

  // Helper for Headers
  const getHeaders = () => ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  });

  // --- AUTH & STAFF LOGIC ---

  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (data.success) {
        localStorage.setItem('token', data.token);
        setCurrentUser(data.user);
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    setCurrentUser(null);
  }, []);

  const fetchStaff = async () => {
    try {
      const res = await fetch(`${API_URL}/auth/staff`, { headers: getHeaders() });

      // Check if the server actually sent a successful response
      if (!res.ok) {
        const errorText = await res.text();
        console.error("Server Error Response:", errorText);
        return;
      }

      const data = await res.json();
      if (data.success) setStaffMembers(data.data);
    } catch (err) {
      console.error("Fetch Error:", err);
    }
  };

  const addStaffMember = async (staff: Omit<StaffMember, 'id'>) => {
    const res = await fetch(`${API_URL}/auth/add-staff`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(staff),
    });
    const data = await res.json();
    console.log("stored data", data);
    if (data.success) setStaffMembers(prev => [...prev, data.data]);
  };

  const updateStaffMember = async (id: string, updates: Partial<StaffMember>) => {
    const res = await fetch(`${API_URL}/auth/staff/${id}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(updates),
    });
    const data = await res.json();
    if (data.success) setStaffMembers(prev => prev.map(s => s.id === id ? data.data : s));
  };

  const deleteStaffMember = async (id: string) => {
    const res = await fetch(`${API_URL}/auth/staff/${id}`, { method: 'DELETE', headers: getHeaders() });
    if (res.ok) setStaffMembers(prev => prev.filter(s => s.id !== id));
  };

  // --- MENU LOGIC ---

  const fetchMenu = async () => {
    try {
      const res = await fetch(`${API_URL}/menu`); // Usually public
      const data = await res.json();
      if (data.success) setMenuItems(data.data);
    } catch (err) { console.error(err); }
  };

  const addMenuItem = async (item: Omit<MenuItem, 'id'>) => {
    const res = await fetch(`${API_URL}/menu`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(item),
    });
    const data = await res.json();
    if (data.success) setMenuItems(prev => [...prev, data.data]);
  };

  const updateMenuItem = async (id: string, updates: Partial<MenuItem>) => {
    const res = await fetch(`${API_URL}/menu/${id}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(updates),
    });
    const data = await res.json();
    if (data.success) {
      setMenuItems(prev => prev.map(item => item.id === id ? data.data : item));
    }
  };

  const deleteMenuItem = async (id: string) => {
    const res = await fetch(`${API_URL}/menu/${id}`, {
      method: 'DELETE',
      headers: getHeaders(),
    });
    if (res.ok) {
      setMenuItems(prev => prev.filter(item => item.id !== id));
    }
  };

  // 1. Fetch Orders from MySQL on load
  const fetchOrders = async () => {
    try {
      const res = await fetch(`${API_URL}/orders`, { headers: getHeaders() });
      const data = await res.json();
      if (data.success) setOrders(data.data);
    } catch (err) {
      console.error("Failed to fetch orders", err);
    }
  };

  // Fetch only the current staff member's orders
  const fetchMyOrders = async () => {
    try {
      const res = await fetch(`${API_URL}/orders/my-orders`, { headers: getHeaders() });
      const data = await res.json();
      if (data.success) setMyOrders(data.data);
    } catch (err) {
      console.error("Failed to fetch my orders", err);
    }
  };

  // Initial Data Fetch
  useEffect(() => {
    fetchMenu(); // Everyone can see the menu

    if (currentUser) {
      // 🛡️ SECURITY CHECK: Only fetch staff list if the user is an Admin
      if (currentUser.role === 'admin') {
        fetchStaff();
      }

      // Everyone (Admin & Staff) can see order history
      fetchOrders();
      fetchMyOrders();
    }
  }, [currentUser]);

  // 2. The Final Add Order Function
  const addOrder = useCallback(async (
    tableNumber: number,
    items: OrderItem[],
    paymentMethod: 'cash' | 'online'
  ): Promise<Order | null> => {
    try {
      const orderPayload = {
        tableNumber,
        paymentMethod,
        // Map frontend items to what the backend expects (just ID and quantity)
        items: items.map(item => ({
          menuItemId: item.menuItem.id,
          quantity: item.quantity
        }))
      };

      const res = await fetch(`${API_URL}/orders`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(orderPayload),
      });

      const data = await res.json();

      if (data.success) {
        const newOrder = data.data;
        setOrders(prev => [newOrder, ...prev]);
        return newOrder;
      }
      return null;
    } catch (error) {
      console.error("Order Creation Error:", error);
      return null;
    }
  }, [currentUser]);


  return (
    <RestaurantContext.Provider value={{
      currentUser, staffMembers, menuItems, orders, myOrders,
      login, logout,
      addStaffMember, updateStaffMember, deleteStaffMember,
      addMenuItem,
      updateMenuItem,
      deleteMenuItem,
      addOrder,
      fetchMyOrders,
    }}>
      {children}
    </RestaurantContext.Provider>
  );
};

// Add this at the bottom, outside the RestaurantProvider component
export const useRestaurant = () => {
  const context = useContext(RestaurantContext);
  if (!context) {
    throw new Error('useRestaurant must be used within a RestaurantProvider');
  }
  return context;
};

