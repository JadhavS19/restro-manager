import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { RestaurantProvider, useRestaurant } from "@/contexts/RestaurantContext";
import Login from "./pages/Login";
import StaffDashboard from "./pages/StaffDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import MenuManagement from "./pages/MenuManagement";
import StaffManagement from "./pages/StaffManagement";
import OrderHistory from "./pages/OrderHistory";
import StaffOrderHistory from "./pages/StaffOrderHistory";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children, requiredRole }: { children: React.ReactNode; requiredRole?: 'admin' | 'staff' }) => {
  const { currentUser } = useRestaurant();
  if (!currentUser) return <Navigate to="/login" replace />;
  if (requiredRole && currentUser.role !== requiredRole) return <Navigate to="/" replace />;
  return <>{children}</>;
};

const RootRedirect = () => {
  const { currentUser } = useRestaurant();
  if (!currentUser) return <Navigate to="/login" replace />;
  if (currentUser.role === 'admin') return <Navigate to="/admin" replace />;
  return <Navigate to="/staff" replace />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <RestaurantProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<RootRedirect />} />
            <Route path="/staff" element={<ProtectedRoute><StaffDashboard /></ProtectedRoute>} />
            <Route path="/staff/orders" element={<ProtectedRoute><StaffOrderHistory /></ProtectedRoute>} />
            <Route path="/admin" element={<ProtectedRoute requiredRole="admin"><AdminDashboard /></ProtectedRoute>} />
            <Route path="/admin/menu" element={<ProtectedRoute requiredRole="admin"><MenuManagement /></ProtectedRoute>} />
            <Route path="/admin/staff" element={<ProtectedRoute requiredRole="admin"><StaffManagement /></ProtectedRoute>} />
            <Route path="/admin/orders" element={<ProtectedRoute requiredRole="admin"><OrderHistory /></ProtectedRoute>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </RestaurantProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
