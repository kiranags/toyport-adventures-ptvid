import { Product } from "@/data/products";

const getInitialProducts = (): Product[] => {
  const storedProducts = localStorage.getItem('products');
  if (storedProducts) {
    return JSON.parse(storedProducts);
  }
  
  const defaultProducts = [
    {
      id: 1,
      name: "Thomas Robot",
      description: "- Qty/ctn = 120 pcs\n- Kode = SMA403\n- Baterai AA\n- Ukuran Produk = 20cm x 10cm x 10cm",
      image: "/lovable-uploads/e6f63658-1278-4afc-811d-85de00634b59.png",
    },
    {
      id: 2,
      name: "Avengers Cars (5 pcs)",
      description: "- Qty/ctn = 336 pcs\n- Kode = SMA409\n- Non Baterai",
      image: "/lovable-uploads/e6f63658-1278-4afc-811d-85de00634b59.png",
    },
    {
      id: 3,
      name: "Rubik 3x3x3 List Putih",
      description: "- Qty/ctn = 540 pcs\n- Kode = SMA830\n- Non Baterai",
      image: "/lovable-uploads/e6f63658-1278-4afc-811d-85de00634b59.png",
    }
  ];

  localStorage.setItem('products', JSON.stringify(defaultProducts));
  return defaultProducts;
};

let products: Product[] = getInitialProducts();

export const getProducts = async (): Promise<Product[]> => {
  const storedProducts = localStorage.getItem('products');
  if (storedProducts) {
    products = JSON.parse(storedProducts);
  }
  return products;
};

export const deleteProduct = async (id: number): Promise<void> => {
  products = products.filter(product => product.id !== id);
  localStorage.setItem('products', JSON.stringify(products));
};

export const addProduct = async (product: Omit<Product, "id">): Promise<Product> => {
  const newId = Math.max(...products.map(p => p.id), 0) + 1;
  const newProduct = { ...product, id: newId };
  products = [...products, newProduct];
  localStorage.setItem('products', JSON.stringify(products));
  return newProduct;
};

export const updateProduct = async (updatedProduct: Product): Promise<Product> => {
  products = products.map(product => 
    product.id === updatedProduct.id ? updatedProduct : product
  );
  localStorage.setItem('products', JSON.stringify(products));
  return updatedProduct;
};