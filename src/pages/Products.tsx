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
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow flex flex-col h-full">
            <div className="aspect-square">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-contain"
              />
            </div>
            <CardHeader className="flex-grow">
              <CardTitle className="text-xl mb-2">{product.name}</CardTitle>
              <CardDescription className="text-base leading-relaxed whitespace-pre-line">
                {product.description}
              </CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Products;