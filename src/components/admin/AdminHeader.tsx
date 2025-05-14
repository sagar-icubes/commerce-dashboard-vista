
import React from 'react';
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Bell, Settings } from 'lucide-react';

const AdminHeader = () => {
  return (
    <header className="border-b border-gray-200 bg-white py-4 px-6 flex items-center justify-between">
      <div className="flex items-center">
        <SidebarTrigger />
        <h2 className="ml-4 text-lg font-medium">E-Commerce Admin</h2>
      </div>
      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <Settings className="h-5 w-5" />
        </Button>
        <div className="h-8 w-8 rounded-full bg-admin-secondary text-white flex items-center justify-center">
          <span className="text-sm font-medium">AD</span>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
