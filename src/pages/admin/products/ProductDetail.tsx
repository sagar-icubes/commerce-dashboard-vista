
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

// Mock product data
const mockProduct = {
  id: "PROD-101",
  name: "Wireless Headphones",
  description: "Premium wireless headphones with noise cancellation and 30-hour battery life.",
  sku: "WH-101-BLK",
  category: "Electronics",
  price: "$89.99",
  cost: "$45.00",
  stock: 145,
  status: "active",
  images: [
    "/placeholder.svg",
    "/placeholder.svg",
    "/placeholder.svg"
  ],
  attributes: [
    { name: "Color", value: "Black" },
    { name: "Connectivity", value: "Bluetooth 5.0" },
    { name: "Battery Life", value: "30 hours" },
    { name: "Weight", value: "250g" }
  ],
  variants: [
    { id: "VAR-101", name: "Black", sku: "WH-101-BLK", price: "$89.99", stock: 145 },
    { id: "VAR-102", name: "White", sku: "WH-101-WHT", price: "$89.99", stock: 78 },
    { id: "VAR-103", name: "Blue", sku: "WH-101-BLU", price: "$94.99", stock: 52 }
  ],
  created: "May 5, 2025",
  updated: "May 10, 2025"
};

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // In a real app, you would fetch product data based on the ID
  const product = mockProduct;
  
  const handleBack = () => {
    navigate('/admin/products');
  };
  
  const handleEdit = () => {
    console.log("Edit product:", id);
  };
  
  const getStatusStyle = (status: string) => {
    switch (status) {
      case "active":
        return "success";
      case "low_stock":
        return "warning";
      case "out_of_stock":
      case "discontinued":
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
            Back to Products
          </Button>
          <h1 className="text-2xl font-bold">Product: {product.name}</h1>
          <div className="ml-4">
            <StatusBadge 
              status={getStatusStyle(product.status)} 
              label={product.status.replace('_', ' ')} 
            />
          </div>
        </div>
        <Button onClick={handleEdit}>
          <Edit className="h-4 w-4 mr-2" />
          Edit Product
        </Button>
      </div>
      
      <Tabs defaultValue="details">
        <TabsList className="mb-4">
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="variants">Variants</TabsTrigger>
          <TabsTrigger value="images">Images</TabsTrigger>
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
        </TabsList>
        
        <TabsContent value="details" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Product Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                  <p className="text-gray-600 mb-4">{product.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <DetailCard
                      title="Basic Details"
                      items={[
                        { label: "SKU", value: product.sku },
                        { label: "Category", value: product.category },
                        { label: "Created", value: product.created },
                        { label: "Last Updated", value: product.updated },
                      ]}
                    />
                    
                    <DetailCard
                      title="Pricing & Inventory"
                      items={[
                        { label: "Price", value: product.price },
                        { label: "Cost", value: product.cost },
                        { label: "Profit", value: `$${(parseFloat(product.price.substring(1)) - parseFloat(product.cost.substring(1))).toFixed(2)}` },
                        { label: "In Stock", value: product.stock },
                      ]}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Product Attributes</CardTitle>
              </CardHeader>
              <CardContent>
                <dl className="divide-y divide-gray-100">
                  {product.attributes.map((attr, i) => (
                    <div key={i} className="py-2 flex justify-between">
                      <dt className="font-medium text-gray-500">{attr.name}</dt>
                      <dd className="text-gray-900">{attr.value}</dd>
                    </div>
                  ))}
                </dl>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="variants">
          <Card>
            <CardHeader>
              <CardTitle>Product Variants</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">Variant</th>
                      <th className="text-left py-2">SKU</th>
                      <th className="text-left py-2">Price</th>
                      <th className="text-left py-2">Stock</th>
                    </tr>
                  </thead>
                  <tbody>
                    {product.variants.map((variant) => (
                      <tr key={variant.id} className="border-b">
                        <td className="py-2">{variant.name}</td>
                        <td className="py-2">{variant.sku}</td>
                        <td className="py-2">{variant.price}</td>
                        <td className="py-2">{variant.stock}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="images">
          <Card>
            <CardHeader>
              <CardTitle>Product Images</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {product.images.map((image, i) => (
                  <div key={i} className="border rounded-md overflow-hidden">
                    <img src={image} alt={`Product ${i+1}`} className="w-full h-48 object-contain" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="inventory">
          <Card>
            <CardHeader>
              <CardTitle>Inventory Management</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500 mb-4">Inventory management features will be available here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProductDetail;
