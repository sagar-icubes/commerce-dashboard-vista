
import React from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '@/components/admin/PageHeader';
import DataTable from '@/components/admin/DataTable';
import StatusBadge from '@/components/admin/StatusBadge';

// Mock data for users
const mockUsers = [
  {
    id: "USER-101",
    name: "John Doe",
    email: "john.doe@example.com",
    joinDate: "2025-01-15",
    orders: 12,
    status: "active",
  },
  {
    id: "USER-102",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    joinDate: "2025-02-20",
    orders: 5,
    status: "active",
  },
  {
    id: "USER-103",
    name: "Robert Johnson",
    email: "robert.j@example.com",
    joinDate: "2025-03-10",
    orders: 8,
    status: "active",
  },
  {
    id: "USER-104",
    name: "Sarah Williams",
    email: "sarah.w@example.com",
    joinDate: "2025-03-22",
    orders: 2,
    status: "inactive",
  },
  {
    id: "USER-105",
    name: "Michael Brown",
    email: "m.brown@example.com",
    joinDate: "2025-04-05",
    orders: 0,
    status: "pending",
  },
  {
    id: "USER-106",
    name: "Emily Davis",
    email: "emily.d@example.com", 
    joinDate: "2025-04-15",
    orders: 1,
    status: "active",
  },
];

// Define columns for the user table
const columns = [
  {
    header: "User ID",
    accessor: "id",
  },
  {
    header: "Name",
    accessor: "name",
  },
  {
    header: "Email",
    accessor: "email",
  },
  {
    header: "Join Date",
    accessor: "joinDate",
  },
  {
    header: "Orders",
    accessor: "orders",
  },
  {
    header: "Status",
    accessor: "status",
    cell: (user: any) => (
      <StatusBadge 
        status={
          user.status === "active" ? "success" : 
          user.status === "pending" ? "warning" : 
          user.status === "inactive" ? "error" : 
          "info"
        } 
        label={user.status}
      />
    ),
  },
];

const UserList = () => {
  const navigate = useNavigate();
  
  const handleCreateUser = () => {
    // Logic to create a new user
    console.log("Create new user");
  };
  
  const handleRowClick = (user: any) => {
    navigate(`/admin/users/${user.id}`);
  };
  
  return (
    <div>
      <PageHeader 
        title="Users" 
        description="Manage your user accounts"
        actionLabel="Add User"
        onAction={handleCreateUser}
      />
      
      <DataTable 
        columns={columns} 
        data={mockUsers} 
        onRowClick={handleRowClick}
      />
    </div>
  );
};

export default UserList;
