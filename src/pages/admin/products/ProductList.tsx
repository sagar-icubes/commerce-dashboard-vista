
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '@/components/admin/PageHeader';
import DataTable from '@/components/admin/DataTable';
import StatusBadge from '@/components/admin/StatusBadge';
import FormModal from '@/components/admin/FormModal';
import DeleteConfirmDialog from '@/components/admin/DeleteConfirmDialog';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";

// Mock data for products
const mockProducts = [
  {
    id: "PROD-101",
    name: "Wireless Headphones",
    category: "Electronics",
    price: "$89.99",
    stock: 145,
    status: "active",
  },
  {
    id: "PROD-102",
    name: "Smartphone Case",
    category: "Accessories",
    price: "$24.99",
    stock: 320,
    status: "active",
  },
  {
    id: "PROD-103",
    name: "Laptop Backpack",
    category: "Bags",
    price: "$59.99",
    stock: 78,
    status: "active",
  },
  {
    id: "PROD-104",
    name: "Smart Watch",
    category: "Electronics",
    price: "$199.99",
    stock: 42,
    status: "low_stock",
  },
  {
    id: "PROD-105",
    name: "Bluetooth Speaker",
    category: "Electronics",
    price: "$79.95",
    stock: 0,
    status: "out_of_stock",
  },
  {
    id: "PROD-106",
    name: "Gaming Mouse",
    category: "Electronics",
    price: "$45.99",
    stock: 89,
    status: "active",
  },
  {
    id: "PROD-107",
    name: "Winter Jacket",
    category: "Clothing",
    price: "$129.99",
    stock: 0,
    status: "discontinued",
  },
  {
    id: "PROD-108",
    name: "Desk Lamp",
    category: "Home",
    price: "$34.95",
    stock: 56,
    status: "active",
  },
];

// Define columns for the product table
const columns = [
  {
    header: "Product ID",
    accessor: "id",
  },
  {
    header: "Name",
    accessor: "name",
  },
  {
    header: "Category",
    accessor: "category",
  },
  {
    header: "Price",
    accessor: "price",
  },
  {
    header: "Stock",
    accessor: "stock",
    cell: (product: any) => (
      <span className={
        product.stock === 0 ? 'text-red-500 font-medium' :
        product.stock < 50 ? 'text-orange-500 font-medium' :
        'text-gray-900'
      }>
        {product.stock}
      </span>
    ),
  },
  {
    header: "Status",
    accessor: "status",
    cell: (product: any) => (
      <StatusBadge 
        status={
          product.status === "active" ? "success" : 
          product.status === "low_stock" ? "warning" : 
          product.status === "out_of_stock" || product.status === "discontinued" ? "error" : 
          "info"
        } 
        label={product.status.replace('_', ' ')}
      />
    ),
  },
];

const ProductList = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [productList, setProductList] = useState(mockProducts);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    stock: "0",
    status: "active"
  });
  
  const handleCreateProduct = () => {
    setFormData({
      name: "",
      category: "",
      price: "",
      stock: "0",
      status: "active"
    });
    setIsCreateModalOpen(true);
  };
  
  const handleSubmitProduct = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create a new product with form data
    const newProduct = {
      id: `PROD-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
      name: formData.name,
      category: formData.category,
      price: formData.price.startsWith('$') ? formData.price : `$${formData.price}`,
      stock: parseInt(formData.stock),
      status: formData.status,
    };
    
    setProductList([newProduct, ...productList]);
    setIsCreateModalOpen(false);
    toast({
      title: "Product Created",
      description: `Product ${newProduct.name} has been added to the catalog.`,
    });
  };
  
  const handleDeleteSelected = () => {
    if (selectedProducts.length > 0) {
      setIsDeleteDialogOpen(true);
    }
  };
  
  const confirmDelete = () => {
    setProductList(productList.filter(product => !selectedProducts.includes(product.id)));
    setSelectedProducts([]);
    setIsDeleteDialogOpen(false);
    toast({
      title: "Products Deleted",
      description: `${selectedProducts.length} products have been deleted.`,
      variant: "destructive",
    });
  };
  
  const handleRowClick = (product: any) => {
    navigate(`/admin/products/${product.id}`);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectionChange = (id: string, isSelected: boolean) => {
    if (isSelected) {
      setSelectedProducts(prev => [...prev, id]);
    } else {
      setSelectedProducts(prev => prev.filter(prodId => prodId !== id));
    }
  };
  
  return (
    <div>
      <PageHeader 
        title="Products" 
        description="Manage your product catalog"
        actionLabel="Add Product"
        onAction={handleCreateProduct}
      />
      
      {selectedProducts.length > 0 && (
        <div className="mb-4 p-2 bg-gray-50 rounded-md flex items-center justify-between">
          <span className="text-sm">{selectedProducts.length} products selected</span>
          <Button variant="destructive" size="sm" onClick={handleDeleteSelected}>
            Delete Selected
          </Button>
        </div>
      )}
      
      <DataTable 
        columns={columns} 
        data={productList} 
        onRowClick={handleRowClick}
        selectable
        onSelectionChange={handleSelectionChange}
        selectedItems={selectedProducts}
      />
      
      {/* Create Product Modal */}
      <FormModal
        title="Add New Product"
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleSubmitProduct}
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
          
          <div className="grid gap-2">
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              placeholder="$99.99"
              required
            />
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
        </div>
      </FormModal>
      
      {/* Delete Confirmation Dialog */}
      <DeleteConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Selected Products"
        description={`Are you sure you want to delete ${selectedProducts.length} selected products? This action cannot be undone.`}
      />
    </div>
  );
};

export default ProductList;
