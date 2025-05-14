
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/components/ui/use-toast";
import PageHeader from '@/components/admin/PageHeader';
import DataTable from '@/components/admin/DataTable';
import StatusBadge from '@/components/admin/StatusBadge';
import FormModal from '@/components/admin/FormModal';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import DeleteConfirmDialog from '@/components/admin/DeleteConfirmDialog';

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
  const { toast } = useToast();
  const [orderList, setOrderList] = useState(mockOrders);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    customer: "",
    total: "",
    items: "1",
    status: "pending"
  });
  
  const handleCreateOrder = () => {
    setFormData({
      customer: "",
      total: "",
      items: "1",
      status: "pending"
    });
    setIsCreateModalOpen(true);
  };
  
  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create a new order with form data
    const newOrder = {
      id: `ORD-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
      customer: formData.customer,
      date: new Date().toISOString().split('T')[0],
      total: formData.total.startsWith('$') ? formData.total : `$${formData.total}`,
      status: formData.status,
      items: parseInt(formData.items),
    };
    
    setOrderList([newOrder, ...orderList]);
    setIsCreateModalOpen(false);
    toast({
      title: "Order Created",
      description: `Order ${newOrder.id} has been created successfully.`,
    });
  };
  
  const handleDeleteSelected = () => {
    if (selectedOrders.length > 0) {
      setIsDeleteDialogOpen(true);
    }
  };
  
  const confirmDelete = () => {
    setOrderList(orderList.filter(order => !selectedOrders.includes(order.id)));
    setSelectedOrders([]);
    setIsDeleteDialogOpen(false);
    toast({
      title: "Orders Deleted",
      description: `${selectedOrders.length} orders have been deleted.`,
      variant: "destructive",
    });
  };
  
  const handleRowClick = (order: any) => {
    navigate(`/admin/orders/${order.id}`);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectionChange = (id: string, isSelected: boolean) => {
    if (isSelected) {
      setSelectedOrders(prev => [...prev, id]);
    } else {
      setSelectedOrders(prev => prev.filter(orderId => orderId !== id));
    }
  };
  
  return (
    <div>
      <PageHeader 
        title="Orders" 
        description="Manage your customer orders"
        actionLabel="New Order"
        onAction={handleCreateOrder}
      />
      
      {selectedOrders.length > 0 && (
        <div className="mb-4 p-2 bg-gray-50 rounded-md flex items-center justify-between">
          <span className="text-sm">{selectedOrders.length} orders selected</span>
          <Button variant="destructive" size="sm" onClick={handleDeleteSelected}>
            Delete Selected
          </Button>
        </div>
      )}
      
      <DataTable 
        columns={columns} 
        data={orderList} 
        onRowClick={handleRowClick}
        selectable
        onSelectionChange={handleSelectionChange}
        selectedItems={selectedOrders}
      />
      
      {/* Create Order Modal */}
      <FormModal
        title="Create New Order"
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleSubmitOrder}
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
            <Label htmlFor="total">Total Amount</Label>
            <Input
              id="total"
              name="total"
              value={formData.total}
              onChange={handleInputChange}
              placeholder="$99.99"
              required
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="items">Number of Items</Label>
            <Input
              id="items"
              name="items"
              value={formData.items}
              onChange={handleInputChange}
              type="number"
              min="1"
              required
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="status">Order Status</Label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
            >
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
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
        title="Delete Selected Orders"
        description={`Are you sure you want to delete ${selectedOrders.length} selected orders? This action cannot be undone.`}
      />
    </div>
  );
};

export default OrderList;
