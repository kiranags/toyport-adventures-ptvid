import { Product } from "@/data/products";

// Initialize products from localStorage or use default data
const getInitialProducts = (): Product[] => {
  const storedProducts = localStorage.getItem('products');
  if (storedProducts) {
    return JSON.parse(storedProducts);
  }
  
  // Default products if nothing in localStorage
  const defaultProducts = [
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

  // Store default products in localStorage
  localStorage.setItem('products', JSON.stringify(defaultProducts));
  return defaultProducts;
};

let products: Product[] = getInitialProducts();

export const getProducts = async (): Promise<Product[]> => {
  // Always get fresh data from localStorage
  const storedProducts = localStorage.getItem('products');
  if (storedProducts) {
    products = JSON.parse(storedProducts);
  }
  return products;
};

export const deleteProduct = async (id: number): Promise<void> => {
  products = products.filter(product => product.id !== id);
  // Persist to localStorage
  localStorage.setItem('products', JSON.stringify(products));
};

export const addProduct = async (product: Omit<Product, "id">): Promise<Product> => {
  const newId = Math.max(...products.map(p => p.id)) + 1;
  const newProduct = { ...product, id: newId };
  products = [...products, newProduct];
  // Persist to localStorage
  localStorage.setItem('products', JSON.stringify(products));
  return newProduct;
};

export const updateProduct = async (updatedProduct: Product): Promise<Product> => {
  products = products.map(product => 
    product.id === updatedProduct.id ? updatedProduct : product
  );
  // Persist to localStorage
  localStorage.setItem('products', JSON.stringify(products));
  return updatedProduct;
};