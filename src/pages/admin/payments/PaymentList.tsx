
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '@/components/admin/PageHeader';
import DataTable from '@/components/admin/DataTable';
import StatusBadge from '@/components/admin/StatusBadge';
import { useToast } from "@/components/ui/use-toast";
import FormModal from '@/components/admin/FormModal';
import DeleteConfirmDialog from '@/components/admin/DeleteConfirmDialog';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

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
  const { toast } = useToast();
  const [paymentList, setPaymentList] = useState(mockPayments);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedPayments, setSelectedPayments] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    amount: "",
    method: "Credit Card",
    customer: "",
    orderId: "",
    status: "completed"
  });
  
  const handleCreatePayment = () => {
    setFormData({
      amount: "",
      method: "Credit Card",
      customer: "",
      orderId: "",
      status: "completed"
    });
    setIsCreateModalOpen(true);
  };
  
  const handleSubmitPayment = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create a new payment with form data
    const newPayment = {
      id: `PAY-${Math.floor(Math.random() * 10000)}`,
      date: new Date().toISOString().split('T')[0],
      amount: formData.amount.startsWith('$') ? formData.amount : `$${formData.amount}`,
      method: formData.method,
      status: formData.status,
      customer: formData.customer,
      orderId: formData.orderId,
    };
    
    setPaymentList([newPayment, ...paymentList]);
    setIsCreateModalOpen(false);
    toast({
      title: "Payment Created",
      description: `Payment ${newPayment.id} has been recorded successfully.`,
    });
  };
  
  const handleDeleteSelected = () => {
    if (selectedPayments.length > 0) {
      setIsDeleteDialogOpen(true);
    }
  };
  
  const confirmDelete = () => {
    setPaymentList(paymentList.filter(payment => !selectedPayments.includes(payment.id)));
    setSelectedPayments([]);
    setIsDeleteDialogOpen(false);
    toast({
      title: "Payments Deleted",
      description: `${selectedPayments.length} payments have been deleted.`,
      variant: "destructive",
    });
  };
  
  const handleRowClick = (payment: any) => {
    navigate(`/admin/payments/${payment.id}`);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectionChange = (id: string, isSelected: boolean) => {
    if (isSelected) {
      setSelectedPayments(prev => [...prev, id]);
    } else {
      setSelectedPayments(prev => prev.filter(payId => payId !== id));
    }
  };
  
  return (
    <div>
      <PageHeader 
        title="Payments" 
        description="View and manage payment transactions"
        actionLabel="Record Payment"
        onAction={handleCreatePayment}
      />
      
      {selectedPayments.length > 0 && (
        <div className="mb-4 p-2 bg-gray-50 rounded-md flex items-center justify-between">
          <span className="text-sm">{selectedPayments.length} payments selected</span>
          <Button variant="destructive" size="sm" onClick={handleDeleteSelected}>
            Delete Selected
          </Button>
        </div>
      )}
      
      <DataTable 
        columns={columns} 
        data={paymentList} 
        onRowClick={handleRowClick}
        selectable
        onSelectionChange={handleSelectionChange}
        selectedItems={selectedPayments}
      />
      
      {/* Create Payment Modal */}
      <FormModal
        title="Record New Payment"
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleSubmitPayment}
      >
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="customer">Customer Name</Label>
            <Input
              id="customer"
              name="customer"
              value={formData.customer}
              onChange={handleInputChange}
              placeholder="John Doe"
              required
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="orderId">Order ID</Label>
            <Input
              id="orderId"
              name="orderId"
              value={formData.orderId}
              onChange={handleInputChange}
              placeholder="ORD-001"
              required
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              name="amount"
              value={formData.amount}
              onChange={handleInputChange}
              placeholder="$99.99"
              required
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="method">Payment Method</Label>
            <select
              id="method"
              name="method"
              value={formData.method}
              onChange={handleInputChange}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
            >
              <option value="Credit Card">Credit Card</option>
              <option value="PayPal">PayPal</option>
              <option value="Bank Transfer">Bank Transfer</option>
              <option value="Apple Pay">Apple Pay</option>
              <option value="Google Pay">Google Pay</option>
            </select>
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="status">Status</Label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
            >
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
              <option value="refunded">Refunded</option>
            </select>
          </div>
        </div>
      </FormModal>
      
      {/* Delete Confirmation Dialog */}
      <DeleteConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Selected Payments"
        description={`Are you sure you want to delete ${selectedPayments.length} selected payments? This action cannot be undone.`}
      />
    </div>
  );
};

export default PaymentList;
