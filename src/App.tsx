
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Admin Layout & Dashboard
import AdminLayout from "./components/admin/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";

// Order pages
import OrderList from "./pages/admin/orders/OrderList";
import OrderDetail from "./pages/admin/orders/OrderDetail";

// Payment pages
import PaymentList from "./pages/admin/payments/PaymentList";
import PaymentDetail from "./pages/admin/payments/PaymentDetail";

// Product pages
import ProductList from "./pages/admin/products/ProductList";
import ProductDetail from "./pages/admin/products/ProductDetail";

// User pages
import UserList from "./pages/admin/users/UserList";
import UserDetail from "./pages/admin/users/UserDetail";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            
            {/* Order Routes */}
            <Route path="orders" element={<OrderList />} />
            <Route path="orders/:id" element={<OrderDetail />} />
            
            {/* Payment Routes */}
            <Route path="payments" element={<PaymentList />} />
            <Route path="payments/:id" element={<PaymentDetail />} />
            
            {/* Product Routes */}
            <Route path="products" element={<ProductList />} />
            <Route path="products/:id" element={<ProductDetail />} />
            
            {/* User Routes */}
            <Route path="users" element={<UserList />} />
            <Route path="users/:id" element={<UserDetail />} />
          </Route>
          
          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
