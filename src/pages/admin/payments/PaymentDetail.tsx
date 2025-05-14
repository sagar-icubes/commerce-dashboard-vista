
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from 'lucide-react';
import DetailCard from '@/components/admin/DetailCard';
import StatusBadge from '@/components/admin/StatusBadge';
import { Badge } from "@/components/ui/badge";

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
  
  // In a real app, you would fetch payment data based on the ID
  const payment = mockPayment;
  
  const handleBack = () => {
    navigate('/admin/payments');
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
      <div className="flex items-center mb-6">
        <Button variant="ghost" onClick={handleBack} className="mr-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Payments
        </Button>
        <h1 className="text-2xl font-bold">Payment {id}</h1>
        <div className="ml-4">
          <StatusBadge status={getStatusStyle(payment.status)} label={payment.status} />
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
    </div>
  );
};

export default PaymentDetail;
