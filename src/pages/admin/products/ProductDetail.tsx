
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
import FormModal from '@/components/admin/FormModal';
import DeleteConfirmDialog from '@/components/admin/DeleteConfirmDialog';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

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
  const { toast } = useToast();
  
  // In a real app, you would fetch product data based on the ID
  const [product, setProduct] = useState(mockProduct);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: product.name,
    description: product.description,
    sku: product.sku,
    category: product.category,
    price: product.price.replace('$', ''),
    cost: product.cost.replace('$', ''),
    stock: product.stock.toString(),
    status: product.status
  });
  
  const handleBack = () => {
    navigate('/admin/products');
  };
  
  const handleEdit = () => {
    setIsEditing(true);
  };
  
  const handleDelete = () => {
    setIsDeleteDialogOpen(true);
  };
  
  const confirmDelete = () => {
    // In a real app, you would delete the product via API
    toast({
      title: "Product Deleted",
      description: `Product ${product.name} has been deleted successfully.`,
      variant: "destructive",
    });
    navigate('/admin/products');
  };
  
  const handleSubmitEdit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, you would update the product via API
    setProduct({
      ...product,
      name: formData.name,
      description: formData.description,
      sku: formData.sku,
      category: formData.category,
      price: formData.price.startsWith('$') ? formData.price : `$${formData.price}`,
      cost: formData.cost.startsWith('$') ? formData.cost : `$${formData.cost}`,
      stock: parseInt(formData.stock),
      status: formData.status,
      updated: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    });
    
    setIsEditing(false);
    toast({
      title: "Product Updated",
      description: `Product ${formData.name} has been updated successfully.`,
    });
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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
        
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleEdit}>
            <Edit className="h-4 w-4 mr-2" />
            Edit Product
          </Button>
          <Button variant="destructive" onClick={handleDelete}>
            <Trash className="h-4 w-4 mr-2" />
            Delete
          </Button>
        </div>
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
      
      {/* Edit Product Modal */}
      <FormModal
        title="Edit Product"
        isOpen={isEditing}
        onClose={() => setIsEditing(false)}
        onSubmit={handleSubmitEdit}
      >
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Product Name</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Wireless Headphones"
              required
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="sku">SKU</Label>
            <Input
              id="sku"
              name="sku"
              value={formData.sku}
              onChange={handleInputChange}
              placeholder="WH-101-BLK"
              required
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="category">Category</Label>
            <Input
              id="category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              placeholder="Electronics"
              required
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                placeholder="99.99"
                required
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="cost">Cost</Label>
              <Input
                id="cost"
                name="cost"
                value={formData.cost}
                onChange={handleInputChange}
                placeholder="45.00"
                required
              />
            </div>
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="stock">Stock</Label>
            <Input
              id="stock"
              name="stock"
              value={formData.stock}
              onChange={handleInputChange}
              type="number"
              min="0"
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
              <option value="low_stock">Low Stock</option>
              <option value="out_of_stock">Out of Stock</option>
              <option value="discontinued">Discontinued</option>
            </select>
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={3}
              required
            />
          </div>
        </div>
      </FormModal>
      
      {/* Delete Confirmation Dialog */}
      <DeleteConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Product"
        description={`Are you sure you want to delete the product "${product.name}"? This action cannot be undone.`}
      />
    </div>
  );
};

export default ProductDetail;
