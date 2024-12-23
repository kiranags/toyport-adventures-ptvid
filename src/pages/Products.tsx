import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Products = () => {
  const products = [
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
    {
      id: 3,
      name: "Board Games",
      description: "Permainan papan untuk keluarga",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    }
  ];

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Contoh Produk Impor</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
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
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Products;