
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowLeft, Edit, Trash } from 'lucide-react';
import DetailCard from '@/components/admin/DetailCard';
import StatusBadge from '@/components/admin/StatusBadge';
import { useToast } from "@/components/ui/use-toast";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DataTable from '@/components/admin/DataTable';
import FormModal from '@/components/admin/FormModal';
import DeleteConfirmDialog from '@/components/admin/DeleteConfirmDialog';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Mock user data
const mockUser = {
  id: "USER-101",
  name: "John Doe",
  email: "john.doe@example.com",
  phone: "+1 (555) 123-4567",
  joinDate: "January 15, 2025",
  lastLogin: "May 12, 2025, 10:24 AM",
  status: "active",
  address: {
    street: "123 Main Street",
    city: "New York",
    state: "NY",
    zip: "10001",
    country: "USA"
  },
  orders: [
    {
      id: "ORD-001",
      date: "May 12, 2025",
      total: "$156.99",
      status: "completed"
    },
    {
      id: "ORD-012",
      date: "April 28, 2025",
      total: "$89.95",
      status: "completed"
    },
    {
      id: "ORD-023",
      date: "April 10, 2025", 
      total: "$45.50",
      status: "completed"
    },
    {
      id: "ORD-034",
      date: "March 25, 2025",
      total: "$124.75",
      status: "completed"
    }
  ]
};

// Define columns for the orders table
const orderColumns = [
  {
    header: "Order ID",
    accessor: "id",
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
    header: "Status",
    accessor: "status",
    cell: (order: any) => (
      <StatusBadge 
        status={
          order.status === "completed" ? "success" : 
          order.status === "processing" ? "warning" : 
          order.status === "cancelled" ? "error" : 
          "info"
        } 
        label={order.status}
      />
    ),
  },
];

const UserDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // In a real app, you would fetch user data based on the ID
  const [user, setUser] = useState(mockUser);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
    status: user.status,
    street: user.address.street,
    city: user.address.city,
    state: user.address.state,
    zip: user.address.zip,
    country: user.address.country
  });
  
  const handleBack = () => {
    navigate('/admin/users');
  };
  
  const handleEdit = () => {
    setIsEditing(true);
  };
  
  const handleDelete = () => {
    setIsDeleteDialogOpen(true);
  };
  
  const confirmDelete = () => {
    // In a real app, you would delete the user via API
    toast({
      title: "User Deleted",
      description: `User ${user.name} has been deleted successfully.`,
      variant: "destructive",
    });
    navigate('/admin/users');
  };
  
  const handleSubmitEdit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, you would update the user via API
    setUser({
      ...user,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      status: formData.status,
      address: {
        street: formData.street,
        city: formData.city,
        state: formData.state,
        zip: formData.zip,
        country: formData.country
      }
    });
    
    setIsEditing(false);
    toast({
      title: "User Updated",
      description: `User ${formData.name} has been updated successfully.`,
    });
  };
  
  const handleRowClick = (order: any) => {
    navigate(`/admin/orders/${order.id}`);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const getStatusStyle = (status: string) => {
    switch (status) {
      case "active":
        return "success";
      case "pending":
        return "warning";
      case "inactive":
        return "error";
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
            Back to Users
          </Button>
          <h1 className="text-2xl font-bold">User: {user.name}</h1>
          <div className="ml-4">
            <StatusBadge status={getStatusStyle(user.status)} label={user.status} />
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleEdit}>
            <Edit className="h-4 w-4 mr-2" />
            Edit User
          </Button>
          <Button variant="destructive" onClick={handleDelete}>
            <Trash className="h-4 w-4 mr-2" />
            Delete
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="profile">
        <TabsList className="mb-4">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <DetailCard
              title="User Information"
              items={[
                { label: "Full Name", value: user.name },
                { label: "Email", value: user.email },
                { label: "Phone", value: user.phone },
                { label: "Join Date", value: user.joinDate },
                { label: "Last Login", value: user.lastLogin },
                { label: "Status", value: <StatusBadge status={getStatusStyle(user.status)} label={user.status} /> },
              ]}
            />
            
            <DetailCard
              title="Address Information"
              items={[
                { label: "Street", value: user.address.street },
                { label: "City", value: user.address.city },
                { label: "State/Province", value: user.address.state },
                { label: "ZIP/Postal", value: user.address.zip },
                { label: "Country", value: user.address.country },
              ]}
            />
          </div>
        </TabsContent>
        
        <TabsContent value="orders">
          <Card>
            <CardHeader>
              <CardTitle>Order History</CardTitle>
            </CardHeader>
            <CardContent>
              <DataTable 
                columns={orderColumns} 
                data={user.orders} 
                onRowClick={handleRowClick}
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="activity">
          <Card>
            <CardHeader>
              <CardTitle>User Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">User activity logs will be displayed here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Edit User Modal */}
      <FormModal
        title="Edit User"
        isOpen={isEditing}
        onClose={() => setIsEditing(false)}
        onSubmit={handleSubmitEdit}
      >
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="John Doe"
              required
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="john@example.com"
              required
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="+1 (555) 123-4567"
            />
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
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          
          <div className="border-t pt-4 mt-2">
            <h3 className="text-sm font-medium mb-3">Address Information</h3>
            
            <div className="grid gap-2">
              <Label htmlFor="street">Street Address</Label>
              <Input
                id="street"
                name="street"
                value={formData.street}
                onChange={handleInputChange}
                placeholder="123 Main Street"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-2">
              <div className="grid gap-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="New York"
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="state">State/Province</Label>
                <Input
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  placeholder="NY"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-2">
              <div className="grid gap-2">
                <Label htmlFor="zip">ZIP/Postal Code</Label>
                <Input
                  id="zip"
                  name="zip"
                  value={formData.zip}
                  onChange={handleInputChange}
                  placeholder="10001"
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="country">Country</Label>
                <Input
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  placeholder="USA"
                />
              </div>
            </div>
          </div>
        </div>
      </FormModal>
      
      {/* Delete Confirmation Dialog */}
      <DeleteConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={confirmDelete}
        title="Delete User"
        description={`Are you sure you want to delete user "${user.name}"? This action cannot be undone.`}
      />
    </div>
  );
};

export default UserDetail;
