import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/services/products";

const Products = () => {
  const { data: products = [] } = useQuery({
    queryKey: ['products'],
    queryFn: getProducts
  });

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Contoh Produk Impor</h1>
      
      <div className="max-w-4xl mx-auto space-y-6">
        {products.map((product) => (
          <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow flex flex-col md:flex-row">
            <div className="md:w-1/3">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-contain aspect-square"
              />
            </div>
            <div className="md:w-2/3">
              <CardHeader>
                <CardTitle className="text-2xl mb-2">{product.name}</CardTitle>
                <CardDescription className="text-lg">{product.description}</CardDescription>
              </CardHeader>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Products;