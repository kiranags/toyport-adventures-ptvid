import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { initialProducts } from "@/data/products";

const Products = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Contoh Produk Impor</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {initialProducts.map((product) => (
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