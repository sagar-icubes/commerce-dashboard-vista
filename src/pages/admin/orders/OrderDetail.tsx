
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from 'lucide-react';
import DetailCard from '@/components/admin/DetailCard';
import StatusBadge from '@/components/admin/StatusBadge';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Mock order data
const mockOrder = {
  id: "ORD-001",
  date: "May 12, 2025",
  status: "completed",
  customer: {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567"
  },
  shippingInfo: {
    address: "123 Main St",
    city: "New York",
    state: "NY",
    zip: "10001",
    country: "USA",
    method: "Standard Shipping"
  },
  payment: {
    method: "Credit Card",
    cardLast4: "4242",
    transactionId: "txn_1KjTzKLkdIwHf",
  },
  items: [
    {
      id: "PROD-101",
      name: "Wireless Headphones",
      price: "$89.99",
      quantity: 1,
      total: "$89.99"
    },
    {
      id: "PROD-203",
      name: "Smartphone Case",
      price: "$24.99",
      quantity: 1,
      total: "$24.99"
    },
    {
      id: "PROD-345",
      name: "USB-C Cable",
      price: "$14.99",
      quantity: 2,
      total: "$29.98"
    }
  ],
  subtotal: "$144.96",
  shippingCost: "$12.99",
  tax: "$11.60",
  discount: "-$12.50",
  total: "$156.99"
};

const OrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // In a real app, you would fetch order data based on the ID
  const order = mockOrder;
  
  const handleBack = () => {
    navigate('/admin/orders');
  };

  const handleEdit = () => {
    console.log("Edit order:", id);
    // In a real app, navigate to edit form or open a modal
  };

  const handleDelete = () => {
    console.log("Delete order:", id);
    // In a real app, confirm delete and handle the deletion
    navigate('/admin/orders');
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "completed":
        return "success";
      case "processing":
      case "shipped":
        return "pending";
      case "cancelled":
      case "refunded":
        return "error";
      default:
        return "info";
    }
  };
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Button variant="ghost" onClick={handleBack} className="mr-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Orders
          </Button>
          <h1 className="text-2xl font-bold">Order {id}</h1>
          <div className="ml-4">
            <StatusBadge status={getStatusStyle(order.status)} label={order.status} />
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleEdit}>
            Edit Order
          </Button>
          <Button variant="destructive" onClick={handleDelete}>
            Delete Order
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Customer Information */}
        <DetailCard
          title="Customer Information"
          items={[
            { label: "Name", value: order.customer.name },
            { label: "Email", value: order.customer.email },
            { label: "Phone", value: order.customer.phone },
          ]}
        />
        
        {/* Shipping Information */}
        <DetailCard
          title="Shipping Information"
          items={[
            { label: "Address", value: order.shippingInfo.address },
            { label: "City", value: order.shippingInfo.city },
            { label: "State/Province", value: order.shippingInfo.state },
            { label: "ZIP/Postal", value: order.shippingInfo.zip },
            { label: "Country", value: order.shippingInfo.country },
            { label: "Method", value: order.shippingInfo.method },
          ]}
        />
        
        {/* Payment Information */}
        <DetailCard
          title="Payment Information"
          items={[
            { label: "Method", value: order.payment.method },
            { label: "Card", value: `**** **** **** ${order.payment.cardLast4}` },
            { label: "Transaction ID", value: order.payment.transactionId },
          ]}
        />
      </div>
      
      {/* Order Items */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Order Items</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead className="text-right">Quantity</TableHead>
                <TableHead className="text-right">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {order.items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{item.name}</div>
                      <div className="text-sm text-gray-500">SKU: {item.id}</div>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">{item.price}</TableCell>
                  <TableCell className="text-right">{item.quantity}</TableCell>
                  <TableCell className="text-right">{item.total}</TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell colSpan={3} className="text-right font-medium">Subtotal</TableCell>
                <TableCell className="text-right">{order.subtotal}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={3} className="text-right font-medium">Shipping</TableCell>
                <TableCell className="text-right">{order.shippingCost}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={3} className="text-right font-medium">Tax</TableCell>
                <TableCell className="text-right">{order.tax}</TableCell>
              </TableRow>
              {order.discount && (
                <TableRow>
                  <TableCell colSpan={3} className="text-right font-medium">Discount</TableCell>
                  <TableCell className="text-right text-green-600">{order.discount}</TableCell>
                </TableRow>
              )}
              <TableRow>
                <TableCell colSpan={3} className="text-right font-bold">Total</TableCell>
                <TableCell className="text-right font-bold">{order.total}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderDetail;
