
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
  const { toast } = useToast();
  const [userList, setUserList] = useState(mockUsers);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    status: "active"
  });
  
  const handleCreateUser = () => {
    setFormData({
      name: "",
      email: "",
      status: "active"
    });
    setIsCreateModalOpen(true);
  };
  
  const handleSubmitUser = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create a new user with form data
    const newUser = {
      id: `USER-${Math.floor(Math.random() * 1000)}`,
      name: formData.name,
      email: formData.email,
      joinDate: new Date().toISOString().split('T')[0],
      orders: 0,
      status: formData.status,
    };
    
    setUserList([newUser, ...userList]);
    setIsCreateModalOpen(false);
    toast({
      title: "User Created",
      description: `User ${newUser.name} has been created successfully.`,
    });
  };
  
  const handleDeleteSelected = () => {
    if (selectedUsers.length > 0) {
      setIsDeleteDialogOpen(true);
    }
  };
  
  const confirmDelete = () => {
    setUserList(userList.filter(user => !selectedUsers.includes(user.id)));
    setSelectedUsers([]);
    setIsDeleteDialogOpen(false);
    toast({
      title: "Users Deleted",
      description: `${selectedUsers.length} users have been deleted.`,
      variant: "destructive",
    });
  };
  
  const handleRowClick = (user: any) => {
    navigate(`/admin/users/${user.id}`);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectionChange = (id: string, isSelected: boolean) => {
    if (isSelected) {
      setSelectedUsers(prev => [...prev, id]);
    } else {
      setSelectedUsers(prev => prev.filter(userId => userId !== id));
    }
  };
  
  return (
    <div>
      <PageHeader 
        title="Users" 
        description="Manage your user accounts"
        actionLabel="Add User"
        onAction={handleCreateUser}
      />
      
      {selectedUsers.length > 0 && (
        <div className="mb-4 p-2 bg-gray-50 rounded-md flex items-center justify-between">
          <span className="text-sm">{selectedUsers.length} users selected</span>
          <Button variant="destructive" size="sm" onClick={handleDeleteSelected}>
            Delete Selected
          </Button>
        </div>
      )}
      
      <DataTable 
        columns={columns} 
        data={userList} 
        onRowClick={handleRowClick}
        selectable
        onSelectionChange={handleSelectionChange}
        selectedItems={selectedUsers}
      />
      
      {/* Create User Modal */}
      <FormModal
        title="Create New User"
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleSubmitUser}
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
        </div>
      </FormModal>
      
      {/* Delete Confirmation Dialog */}
      <DeleteConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Selected Users"
        description={`Are you sure you want to delete ${selectedUsers.length} selected users? This action cannot be undone.`}
      />
    </div>
  );
};

export default UserList;
