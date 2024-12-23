import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getProducts, deleteProduct, addProduct, updateProduct } from "@/services/products";
import type { Product } from "@/data/products";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import ProductForm from "@/components/ProductForm";
import ProductCard from "@/components/ProductCard";
import { supabase } from "@/integrations/supabase/client";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";

const AdminDashboard = () => {
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [session, setSession] = useState<any>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  useEffect(() => {
    // Check current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const { data: products = [] } = useQuery({
    queryKey: ['products'],
    queryFn: getProducts
  });

  const handleAddProduct = async (productData: Omit<Product, "id">) => {
    try {
      await addProduct(productData);
      await queryClient.invalidateQueries({ queryKey: ['products'] });
      
      toast({
        title: "Product added successfully",
        description: "New product has been added to the list",
      });
    } catch (error: any) {
      toast({
        title: "Error adding product",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleEditProduct = async (productData: Omit<Product, "id">) => {
    if (editingProduct) {
      try {
        await updateProduct({ ...productData, id: editingProduct.id });
        await queryClient.invalidateQueries({ queryKey: ['products'] });
        
        setEditingProduct(null);
        setIsEditDialogOpen(false);
        
        toast({
          title: "Product updated successfully",
          description: "Changes have been saved",
        });
      } catch (error: any) {
        toast({
          title: "Error updating product",
          description: error.message,
          variant: "destructive",
        });
      }
    }
  };

  const handleDeleteProduct = async (id: number) => {
    try {
      await deleteProduct(id);
      await queryClient.invalidateQueries({ queryKey: ['products'] });
      
      toast({
        title: "Product deleted successfully",
        description: "Product has been removed from the list",
      });
    } catch (error: any) {
      toast({
        title: "Error deleting product",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  if (!session) {
    return (
      <div className="container mx-auto py-8 px-4 max-w-md">
        <Card>
          <CardHeader>
            <CardTitle>Admin Login</CardTitle>
          </CardHeader>
          <CardContent>
            <Auth
              supabaseClient={supabase}
              appearance={{ theme: ThemeSupa }}
              theme="light"
              providers={[]}
            />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Add New Product</CardTitle>
        </CardHeader>
        <CardContent>
          <ProductForm
            onSubmit={handleAddProduct}
            buttonText="Add Product"
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Product List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onEdit={(product) => {
                  setEditingProduct(product);
                  setIsEditDialogOpen(true);
                }}
                onDelete={handleDeleteProduct}
              />
            ))}
          </div>
        </CardContent>
      </Card>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
          </DialogHeader>
          {editingProduct && (
            <ProductForm
              initialProduct={editingProduct}
              onSubmit={handleEditProduct}
              buttonText="Save Changes"
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminDashboard;