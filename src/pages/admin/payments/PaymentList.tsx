
import React from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '@/components/admin/PageHeader';
import DataTable from '@/components/admin/DataTable';
import StatusBadge from '@/components/admin/StatusBadge';

// Mock data for payments
const mockPayments = [
  {
    id: "PAY-1234",
    date: "2025-05-12",
    amount: "$156.99",
    method: "Credit Card",
    status: "completed",
    customer: "John Doe",
    orderId: "ORD-001",
  },
  {
    id: "PAY-1235",
    date: "2025-05-11",
    amount: "$89.95",
    method: "PayPal",
    status: "completed",
    customer: "Jane Smith",
    orderId: "ORD-002",
  },
  {
    id: "PAY-1236",
    date: "2025-05-10",
    amount: "$245.50",
    method: "Credit Card",
    status: "pending",
    customer: "Bob Johnson",
    orderId: "ORD-003",
  },
  {
    id: "PAY-1237",
    date: "2025-05-09",
    amount: "$32.99",
    method: "Apple Pay",
    status: "completed",
    customer: "Alice Brown",
    orderId: "ORD-004",
  },
  {
    id: "PAY-1238",
    date: "2025-05-08",
    amount: "$178.50",
    method: "Credit Card",
    status: "failed",
    customer: "Charlie Wilson",
    orderId: "ORD-005",
  },
  {
    id: "PAY-1239",
    date: "2025-05-07",
    amount: "$112.75",
    method: "Bank Transfer",
    status: "refunded",
    customer: "Diana Miller",
    orderId: "ORD-006",
  },
];

// Define columns for the payment table
const columns = [
  {
    header: "Payment ID",
    accessor: "id",
  },
  {
    header: "Date",
    accessor: "date",
  },
  {
    header: "Amount",
    accessor: "amount",
  },
  {
    header: "Method",
    accessor: "method",
  },
  {
    header: "Customer",
    accessor: "customer",
  },
  {
    header: "Order ID",
    accessor: "orderId",
  },
  {
    header: "Status",
    accessor: "status",
    cell: (payment: any) => (
      <StatusBadge 
        status={
          payment.status === "completed" ? "success" : 
          payment.status === "pending" ? "warning" : 
          payment.status === "failed" ? "error" : 
          payment.status === "refunded" ? "info" : 
          "info"
        } 
        label={payment.status}
      />
    ),
  },
];

const PaymentList = () => {
  const navigate = useNavigate();
  
  const handleRowClick = (payment: any) => {
    navigate(`/admin/payments/${payment.id}`);
  };
  
  return (
    <div>
      <PageHeader 
        title="Payments" 
        description="View and manage payment transactions"
      />
      
      <DataTable 
        columns={columns} 
        data={mockPayments} 
        onRowClick={handleRowClick}
      />
    </div>
  );
};

export default PaymentList;
