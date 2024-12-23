import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Trash, Pencil } from "lucide-react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getProducts, deleteProduct, addProduct, updateProduct } from "@/services/products";
import type { Product } from "@/data/products";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const AdminDashboard = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
  });
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: products = [] } = useQuery({
    queryKey: ['products'],
    queryFn: getProducts
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewProduct(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (editingProduct) {
      setEditingProduct({
        ...editingProduct,
        [name]: value,
      });
    }
  };

  const handleAddProduct = async () => {
    if (selectedFile && newProduct.name && newProduct.description) {
      const imageUrl = URL.createObjectURL(selectedFile);
      
      await addProduct({
        name: newProduct.name,
        description: newProduct.description,
        image: imageUrl,
      });

      await queryClient.invalidateQueries({ queryKey: ['products'] });
      
      setSelectedFile(null);
      setNewProduct({ name: "", description: "" });
      
      toast({
        title: "Produk berhasil ditambahkan",
        description: "Produk baru telah ditambahkan ke daftar",
      });
    } else {
      toast({
        title: "Error",
        description: "Mohon lengkapi semua field",
        variant: "destructive",
      });
    }
  };

  const handleEditProduct = async () => {
    if (editingProduct) {
      await updateProduct(editingProduct);
      await queryClient.invalidateQueries({ queryKey: ['products'] });
      
      setEditingProduct(null);
      setIsEditDialogOpen(false);
      
      toast({
        title: "Produk berhasil diperbarui",
        description: "Perubahan telah disimpan",
      });
    }
  };

  const handleDeleteProduct = async (id: number) => {
    await deleteProduct(id);
    await queryClient.invalidateQueries({ queryKey: ['products'] });
    
    toast({
      title: "Produk berhasil dihapus",
      description: "Produk telah dihapus dari daftar",
    });
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Tambah Produk Baru</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Gambar Produk</label>
            <Input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="mb-4"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Nama Produk</label>
            <Input
              name="name"
              value={newProduct.name}
              onChange={handleInputChange}
              placeholder="Masukkan nama produk"
              className="mb-4"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Deskripsi</label>
            <Textarea
              name="description"
              value={newProduct.description}
              onChange={handleInputChange}
              placeholder="Masukkan deskripsi produk"
              className="mb-4"
            />
          </div>
          <Button 
            onClick={handleAddProduct} 
            disabled={!selectedFile || !newProduct.name || !newProduct.description}
          >
            Tambah Produk
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Daftar Produk</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <Card key={product.id} className="overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <CardContent className="p-4">
                  <h3 className="font-bold mb-2">{product.name}</h3>
                  <p className="text-sm text-gray-600 mb-4">{product.description}</p>
                  <div className="flex gap-2">
                    <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          onClick={() => setEditingProduct(product)}
                          className="flex-1"
                        >
                          <Pencil className="mr-2 h-4 w-4" />
                          Edit
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Edit Produk</DialogTitle>
                        </DialogHeader>
                        {editingProduct && (
                          <div className="space-y-4 pt-4">
                            <div>
                              <label className="block text-sm font-medium mb-2">Nama Produk</label>
                              <Input
                                name="name"
                                value={editingProduct.name}
                                onChange={handleEditInputChange}
                                placeholder="Masukkan nama produk"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-2">Deskripsi</label>
                              <Textarea
                                name="description"
                                value={editingProduct.description}
                                onChange={handleEditInputChange}
                                placeholder="Masukkan deskripsi produk"
                              />
                            </div>
                            <Button onClick={handleEditProduct} className="w-full">
                              Simpan Perubahan
                            </Button>
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>
                    <Button
                      variant="destructive"
                      onClick={() => handleDeleteProduct(product.id)}
                      className="flex-1"
                    >
                      <Trash className="mr-2 h-4 w-4" />
                      Hapus
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;