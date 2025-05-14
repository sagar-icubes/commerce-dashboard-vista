
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowRight } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-gray-100">
      <div className="text-center px-4 max-w-3xl">
        <h1 className="text-4xl font-bold mb-4 text-admin-primary">E-Commerce Admin Dashboard</h1>
        <p className="text-xl text-gray-600 mb-8">A comprehensive admin panel for managing your e-commerce store. Access orders, payments, products, and users.</p>
        
        <div className="flex flex-col md:flex-row justify-center gap-4">
          <Button asChild size="lg" className="bg-admin-primary hover:bg-admin-secondary">
            <Link to="/admin" className="flex items-center">
              Go to Admin Dashboard
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          <Link to="/admin/orders" className="group bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold mb-2 text-admin-primary group-hover:text-admin-secondary transition-colors">Orders</h2>
            <p className="text-gray-600">Manage and track customer orders</p>
          </Link>
          
          <Link to="/admin/payments" className="group bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold mb-2 text-admin-primary group-hover:text-admin-secondary transition-colors">Payments</h2>
            <p className="text-gray-600">View transaction history and refunds</p>
          </Link>
          
          <Link to="/admin/products" className="group bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold mb-2 text-admin-primary group-hover:text-admin-secondary transition-colors">Products</h2>
            <p className="text-gray-600">Manage your product catalog</p>
          </Link>
          
          <Link to="/admin/users" className="group bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold mb-2 text-admin-primary group-hover:text-admin-secondary transition-colors">Users</h2>
            <p className="text-gray-600">View and manage customer accounts</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index;
