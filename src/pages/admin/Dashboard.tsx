
import React from 'react';
import PageHeader from '@/components/admin/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ShoppingCart, 
  CreditCard, 
  Package, 
  Users,
  TrendingUp
} from "lucide-react";

const statsData = [
  {
    title: "Total Orders",
    value: "1,283",
    icon: ShoppingCart,
    change: "+12.5%",
    changeType: "positive"
  },
  {
    title: "Total Revenue",
    value: "$45,231.89",
    icon: TrendingUp,
    change: "+8.2%",
    changeType: "positive"
  },
  {
    title: "Products",
    value: "342",
    icon: Package,
    change: "+6.1%",
    changeType: "positive"
  },
  {
    title: "Active Users",
    value: "2,871",
    icon: Users,
    change: "+3.1%",
    changeType: "positive"
  },
];

const Dashboard = () => {
  return (
    <div>
      <PageHeader 
        title="Dashboard" 
        description="Overview of your store performance and statistics."
      />
      
      <div className="grid gap-6 mt-8 md:grid-cols-2 lg:grid-cols-4">
        {statsData.map((stat, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className={`text-xs mt-1 ${
                stat.changeType === 'positive' ? 'text-green-500' : 'text-red-500'
              }`}>
                {stat.change} from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="grid gap-6 mt-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-500">Placeholder for order chart</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-500">Placeholder for revenue chart</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
