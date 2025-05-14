
import React from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '@/components/admin/PageHeader';
import DataTable from '@/components/admin/DataTable';
import StatusBadge from '@/components/admin/StatusBadge';

// Mock data for products
const mockProducts = [
  {
    id: "PROD-101",
    name: "Wireless Headphones",
    category: "Electronics",
    price: "$89.99",
    stock: 145,
    status: "active",
  },
  {
    id: "PROD-102",
    name: "Smartphone Case",
    category: "Accessories",
    price: "$24.99",
    stock: 320,
    status: "active",
  },
  {
    id: "PROD-103",
    name: "Laptop Backpack",
    category: "Bags",
    price: "$59.99",
    stock: 78,
    status: "active",
  },
  {
    id: "PROD-104",
    name: "Smart Watch",
    category: "Electronics",
    price: "$199.99",
    stock: 42,
    status: "low_stock",
  },
  {
    id: "PROD-105",
    name: "Bluetooth Speaker",
    category: "Electronics",
    price: "$79.95",
    stock: 0,
    status: "out_of_stock",
  },
  {
    id: "PROD-106",
    name: "Gaming Mouse",
    category: "Electronics",
    price: "$45.99",
    stock: 89,
    status: "active",
  },
  {
    id: "PROD-107",
    name: "Winter Jacket",
    category: "Clothing",
    price: "$129.99",
    stock: 0,
    status: "discontinued",
  },
  {
    id: "PROD-108",
    name: "Desk Lamp",
    category: "Home",
    price: "$34.95",
    stock: 56,
    status: "active",
  },
];

// Define columns for the product table
const columns = [
  {
    header: "Product ID",
    accessor: "id",
  },
  {
    header: "Name",
    accessor: "name",
  },
  {
    header: "Category",
    accessor: "category",
  },
  {
    header: "Price",
    accessor: "price",
  },
  {
    header: "Stock",
    accessor: "stock",
    cell: (product: any) => (
      <span className={
        product.stock === 0 ? 'text-red-500 font-medium' :
        product.stock < 50 ? 'text-orange-500 font-medium' :
        'text-gray-900'
      }>
        {product.stock}
      </span>
    ),
  },
  {
    header: "Status",
    accessor: "status",
    cell: (product: any) => (
      <StatusBadge 
        status={
          product.status === "active" ? "success" : 
          product.status === "low_stock" ? "warning" : 
          product.status === "out_of_stock" || product.status === "discontinued" ? "error" : 
          "info"
        } 
        label={product.status.replace('_', ' ')}
      />
    ),
  },
];

const ProductList = () => {
  const navigate = useNavigate();
  
  const handleCreateProduct = () => {
    // Logic to create a new product
    console.log("Create new product");
  };
  
  const handleRowClick = (product: any) => {
    navigate(`/admin/products/${product.id}`);
  };
  
  return (
    <div>
      <PageHeader 
        title="Products" 
        description="Manage your product catalog"
        actionLabel="Add Product"
        onAction={handleCreateProduct}
      />
      
      <DataTable 
        columns={columns} 
        data={mockProducts} 
        onRowClick={handleRowClick}
      />
    </div>
  );
};

export default ProductList;
