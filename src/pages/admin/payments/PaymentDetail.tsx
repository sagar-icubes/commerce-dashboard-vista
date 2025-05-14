
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowLeft, Edit, Trash } from 'lucide-react';
import DetailCard from '@/components/admin/DetailCard';
import StatusBadge from '@/components/admin/StatusBadge';
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import FormModal from '@/components/admin/FormModal';
import DeleteConfirmDialog from '@/components/admin/DeleteConfirmDialog';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Mock payment data
const mockPayment = {
  id: "PAY-1234",
  date: "May 12, 2025 14:32:15",
  amount: "$156.99",
  method: "Credit Card",
  status: "completed",
  customer: {
    name: "John Doe",
    email: "john.doe@example.com",
    id: "CUST-1001"
  },
  order: {
    id: "ORD-001",
    items: 3,
  },
  cardDetails: {
    type: "Visa",
    last4: "4242",
    expiryDate: "05/28"
  },
  billingAddress: {
    address: "123 Main St",
    city: "New York",
    state: "NY",
    zip: "10001",
    country: "USA"
  },
  transactionDetails: {
    id: "txn_1KjTzKLkdIwHf",
    processorFee: "$4.85",
    netAmount: "$152.14",
    capturedAt: "May 12, 2025 14:32:18"
  }
};

const PaymentDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // In a real app, you would fetch payment data based on the ID
  const [payment, setPayment] = useState(mockPayment);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    amount: payment.amount.replace('$', ''),
    method: payment.method,
    status: payment.status,
    customerName: payment.customer.name,
    customerEmail: payment.customer.email
  });
  
  const handleBack = () => {
    navigate('/admin/payments');
  };
  
  const handleEdit = () => {
    setIsEditing(true);
  };
  
  const handleDelete = () => {
    setIsDeleteDialogOpen(true);
  };
  
  const confirmDelete = () => {
    // In a real app, you would delete the payment via API
    toast({
      title: "Payment Deleted",
      description: `Payment ${id} has been deleted successfully.`,
      variant: "destructive",
    });
    navigate('/admin/payments');
  };
  
  const handleSubmitEdit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, you would update the payment via API
    setPayment({
      ...payment,
      amount: formData.amount.startsWith('$') ? formData.amount : `$${formData.amount}`,
      method: formData.method,
      status: formData.status,
      customer: {
        ...payment.customer,
        name: formData.customerName,
        email: formData.customerEmail
      }
    });
    
    setIsEditing(false);
    toast({
      title: "Payment Updated",
      description: `Payment ${id} has been updated successfully.`,
    });
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const getStatusStyle = (status: string) => {
    switch (status) {
      case "completed":
        return "success";
      case "pending":
        return "warning";
      case "failed":
        return "error";
      case "refunded":
        return "info";
      default:
        return "info";
    }
  };
  
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Button variant="ghost" onClick={handleBack} className="mr-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Payments
          </Button>
          <h1 className="text-2xl font-bold">Payment {id}</h1>
          <div className="ml-4">
            <StatusBadge status={getStatusStyle(payment.status)} label={payment.status} />
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleEdit}>
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
          <Button variant="destructive" onClick={handleDelete}>
            <Trash className="h-4 w-4 mr-2" />
            Delete
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <DetailCard
          title="Payment Information"
          items={[
            { label: "Amount", value: payment.amount },
            { label: "Payment Method", value: payment.method },
            { label: "Date", value: payment.date },
            { label: "Transaction ID", value: payment.transactionDetails.id },
          ]}
        />
        
        <DetailCard
          title="Customer Information"
          items={[
            { label: "Name", value: payment.customer.name },
            { label: "Email", value: payment.customer.email },
            { label: "Customer ID", value: payment.customer.id },
            { 
              label: "Order", 
              value: (
                <Button 
                  variant="link" 
                  className="p-0 h-auto" 
                  onClick={() => navigate(`/admin/orders/${payment.order.id}`)}
                >
                  {payment.order.id}
                </Button>
              )
            },
          ]}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <DetailCard
          title="Card Information"
          items={[
            { label: "Card Type", value: payment.cardDetails.type },
            { label: "Card Number", value: `**** **** **** ${payment.cardDetails.last4}` },
            { label: "Expiry Date", value: payment.cardDetails.expiryDate },
          ]}
        />
        
        <DetailCard
          title="Billing Address"
          items={[
            { label: "Address", value: payment.billingAddress.address },
            { label: "City", value: payment.billingAddress.city },
            { label: "State", value: payment.billingAddress.state },
            { label: "ZIP/Postal", value: payment.billingAddress.zip },
            { label: "Country", value: payment.billingAddress.country },
          ]}
        />
      </div>
      
      <DetailCard
        title="Transaction Details"
        items={[
          { label: "Transaction ID", value: payment.transactionDetails.id },
          { label: "Gross Amount", value: payment.amount },
          { label: "Processing Fee", value: payment.transactionDetails.processorFee },
          { label: "Net Amount", value: payment.transactionDetails.netAmount },
          { label: "Captured At", value: payment.transactionDetails.capturedAt },
        ]}
      />
      
      {/* Edit Payment Modal */}
      <FormModal
        title="Edit Payment"
        isOpen={isEditing}
        onClose={() => setIsEditing(false)}
        onSubmit={handleSubmitEdit}
      >
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              name="amount"
              value={formData.amount}
              onChange={handleInputChange}
              placeholder="99.99"
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
          
          <div className="grid gap-2">
            <Label htmlFor="customerName">Customer Name</Label>
            <Input
              id="customerName"
              name="customerName"
              value={formData.customerName}
              onChange={handleInputChange}
              placeholder="John Doe"
              required
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="customerEmail">Customer Email</Label>
            <Input
              id="customerEmail"
              name="customerEmail"
              type="email"
              value={formData.customerEmail}
              onChange={handleInputChange}
              placeholder="john@example.com"
              required
            />
          </div>
        </div>
      </FormModal>
      
      {/* Delete Confirmation Dialog */}
      <DeleteConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Payment"
        description={`Are you sure you want to delete payment ${id}? This action cannot be undone.`}
      />
    </div>
  );
};

export default PaymentDetail;
