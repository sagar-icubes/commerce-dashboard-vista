
import React from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '@/components/admin/PageHeader';
import DataTable from '@/components/admin/DataTable';
import StatusBadge from '@/components/admin/StatusBadge';

// Mock data for orders
const mockOrders = [
  {
    id: "ORD-001",
    customer: "John Doe",
    date: "2025-05-12",
    total: "$156.99",
    status: "completed",
    items: 3,
  },
  {
    id: "ORD-002",
    customer: "Jane Smith",
    date: "2025-05-11",
    total: "$89.95",
    status: "processing",
    items: 2,
  },
  {
    id: "ORD-003",
    customer: "Bob Johnson",
    date: "2025-05-10",
    total: "$245.50",
    status: "shipped",
    items: 4,
  },
  {
    id: "ORD-004",
    customer: "Alice Brown",
    date: "2025-05-09",
    total: "$32.99",
    status: "pending",
    items: 1,
  },
  {
    id: "ORD-005",
    customer: "Charlie Wilson",
    date: "2025-05-08",
    total: "$178.50",
    status: "cancelled",
    items: 3,
  },
  {
    id: "ORD-006",
    customer: "Diana Miller",
    date: "2025-05-07",
    total: "$112.75",
    status: "refunded",
    items: 2,
  },
  {
    id: "ORD-007",
    customer: "Edward Davis",
    date: "2025-05-06",
    total: "$67.25",
    status: "completed",
    items: 1,
  },
  {
    id: "ORD-008",
    customer: "Fiona Garcia",
    date: "2025-05-05",
    total: "$199.99",
    status: "processing",
    items: 3,
  },
];

// Define columns for the order table
const columns = [
  {
    header: "Order ID",
    accessor: "id",
  },
  {
    header: "Customer",
    accessor: "customer",
  },
  {
    header: "Date",
    accessor: "date",
  },
  {
    header: "Total",
    accessor: "total",
  },
  {
    header: "Items",
    accessor: "items",
  },
  {
    header: "Status",
    accessor: "status",
    cell: (order: any) => (
      <StatusBadge 
        status={
          order.status === "completed" ? "success" : 
          order.status === "processing" || order.status === "shipped" ? "pending" : 
          order.status === "cancelled" || order.status === "refunded" ? "error" : 
          "info"
        } 
        label={order.status}
      />
    ),
  },
];

const OrderList = () => {
  const navigate = useNavigate();
  
  const handleCreateOrder = () => {
    // Logic to create a new order
    console.log("Create new order");
  };
  
  const handleRowClick = (order: any) => {
    navigate(`/admin/orders/${order.id}`);
  };
  
  return (
    <div>
      <PageHeader 
        title="Orders" 
        description="Manage your customer orders"
        actionLabel="New Order"
        onAction={handleCreateOrder}
      />
      
      <DataTable 
        columns={columns} 
        data={mockOrders} 
        onRowClick={handleRowClick}
      />
    </div>
  );
};

export default OrderList;
