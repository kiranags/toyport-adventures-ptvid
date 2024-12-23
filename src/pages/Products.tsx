import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Products = () => {
  const products = [
    {
      id: 1,
      name: "Mainan Edukasi",
      description: "Mainan yang membantu perkembangan anak",
      image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9",
      category: "Edukasi"
    },
    {
      id: 2,
      name: "Action Figures",
      description: "Koleksi action figure populer",
      image: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1",
      category: "Hiburan"
    },
    {
      id: 3,
      name: "Board Games",
      description: "Permainan papan untuk keluarga",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
      category: "Permainan"
    }
  ];

  const categories = ["Semua", "Edukasi", "Hiburan", "Permainan"];

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Produk Impor</h1>
      
      <Tabs defaultValue="Semua" className="w-full">
        <TabsList className="mb-8">
          {categories.map((category) => (
            <TabsTrigger key={category} value={category}>
              {category}
            </TabsTrigger>
          ))}
        </TabsList>

        {categories.map((category) => (
          <TabsContent key={category} value={category}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products
                .filter((product) => category === "Semua" || product.category === category)
                .map((product) => (
                  <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-cover"
                    />
                    <CardHeader>
                      <CardTitle>{product.name}</CardTitle>
                      <CardDescription>{product.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">Kategori: {product.category}</p>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default Products;