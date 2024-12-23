import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Trash } from "lucide-react";

interface Product {
  id: number;
  name: string;
  description: string;
  image: string;
}

const AdminDashboard = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: "Mainan Edukasi",
      description: "Mainan yang membantu perkembangan anak",
      image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9",
    },
    {
      id: 2,
      name: "Action Figures",
      description: "Koleksi action figure populer",
      image: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1",
    },
  ]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
  });
  const { toast } = useToast();

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

  const handleAddProduct = () => {
    if (selectedFile && newProduct.name && newProduct.description) {
      const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
      const imageUrl = URL.createObjectURL(selectedFile);
      
      setProducts(prev => [...prev, {
        id: newId,
        name: newProduct.name,
        description: newProduct.description,
        image: imageUrl,
      }]);

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

  const handleDeleteProduct = (id: number) => {
    setProducts(prev => prev.filter(product => product.id !== id));
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
          <Button onClick={handleAddProduct} disabled={!selectedFile || !newProduct.name || !newProduct.description}>
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
                  <Button
                    variant="destructive"
                    onClick={() => handleDeleteProduct(product.id)}
                    className="w-full"
                  >
                    <Trash className="mr-2 h-4 w-4" />
                    Hapus Produk
                  </Button>
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