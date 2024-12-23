import { Product } from "@/data/products";

// In-memory store since we don't have a backend
let products: Product[] = [
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

export const getProducts = async (): Promise<Product[]> => {
  return products;
};

export const deleteProduct = async (id: number): Promise<void> => {
  products = products.filter(product => product.id !== id);
};

export const addProduct = async (product: Omit<Product, "id">): Promise<Product> => {
  const newId = Math.max(...products.map(p => p.id)) + 1;
  const newProduct = { ...product, id: newId };
  products = [...products, newProduct];
  return newProduct;
};