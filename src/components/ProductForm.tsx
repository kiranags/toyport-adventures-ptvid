import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { convertFileToBase64 } from "@/utils/imageUtils";
import type { Product } from "@/data/products";

interface ProductFormProps {
  initialProduct?: Product;
  onSubmit: (product: Omit<Product, "id">) => void;
  buttonText: string;
}

const ProductForm = ({ initialProduct, onSubmit, buttonText }: ProductFormProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    name: initialProduct?.name || "",
    description: initialProduct?.description || "",
    image: initialProduct?.image || "",
  });
  const { toast } = useToast();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      try {
        const base64Image = await convertFileToBase64(file);
        setSelectedFile(file);
        setFormData(prev => ({ ...prev, image: base64Image }));
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to process image",
          variant: "destructive",
        });
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.description || (!initialProduct && !selectedFile)) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    onSubmit(formData);
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">Product Image</label>
        <Input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="mb-4"
        />
        {(formData.image || initialProduct?.image) && (
          <img
            src={formData.image || initialProduct?.image}
            alt="Preview"
            className="w-32 h-32 object-contain mb-4"
          />
        )}
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Product Name</label>
        <Input
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Enter product name"
          className="mb-4"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Description</label>
        <Textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          placeholder="Enter product description"
          className="mb-4"
        />
      </div>
      <Button onClick={handleSubmit}>{buttonText}</Button>
    </div>
  );
};

export default ProductForm;