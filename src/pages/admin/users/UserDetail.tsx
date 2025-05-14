
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowLeft, Edit } from 'lucide-react';
import DetailCard from '@/components/admin/DetailCard';
import StatusBadge from '@/components/admin/StatusBadge';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DataTable from '@/components/admin/DataTable';

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
  
  // In a real app, you would fetch user data based on the ID
  const user = mockUser;
  
  const handleBack = () => {
    navigate('/admin/users');
  };
  
  const handleEdit = () => {
    console.log("Edit user:", id);
  };
  
  const handleRowClick = (order: any) => {
    navigate(`/admin/orders/${order.id}`);
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
        <Button onClick={handleEdit}>
          <Edit className="h-4 w-4 mr-2" />
          Edit User
        </Button>
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
    </div>
  );
};

export default UserDetail;
