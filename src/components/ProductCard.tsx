import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash, Pencil } from "lucide-react";
import type { Product } from "@/data/products";

interface ProductCardProps {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (id: number) => void;
}

const ProductCard = ({ product, onEdit, onDelete }: ProductCardProps) => {
  return (
    <Card className="overflow-hidden">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-contain"
      />
      <CardContent className="p-4">
        <h3 className="font-bold mb-2">{product.name}</h3>
        <p className="text-sm text-gray-600 mb-4 whitespace-pre-line">
          {product.description}
        </p>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => onEdit(product)}
            className="flex-1"
          >
            <Pencil className="mr-2 h-4 w-4" />
            Edit
          </Button>
          <Button
            variant="destructive"
            onClick={() => onDelete(product.id)}
            className="flex-1"
          >
            <Trash className="mr-2 h-4 w-4" />
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;