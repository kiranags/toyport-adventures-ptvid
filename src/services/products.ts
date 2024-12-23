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

const optimizeImage = async (base64Image: string): Promise<string> => {
  // If it's already a URL (starts with /), return as is
  if (base64Image.startsWith('/')) {
    return base64Image;
  }

  // If it's a new base64 image, we'll store it with a max width
  const img = new Image();
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  return new Promise((resolve) => {
    img.onload = () => {
      const maxWidth = 800;
      let width = img.width;
      let height = img.height;

      if (width > maxWidth) {
        height = (maxWidth * height) / width;
        width = maxWidth;
      }

      canvas.width = width;
      canvas.height = height;
      ctx?.drawImage(img, 0, 0, width, height);
      
      // Convert to WebP format for better compression
      const optimizedImage = canvas.toDataURL('image/webp', 0.8);
      resolve(optimizedImage);
    };
    img.src = base64Image;
  });
};

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
  const optimizedImage = await optimizeImage(product.image);
  const newId = Math.max(...products.map(p => p.id), 0) + 1;
  const newProduct = { ...product, id: newId, image: optimizedImage };
  products = [...products, newProduct];
  localStorage.setItem('products', JSON.stringify(products));
  return newProduct;
};

export const updateProduct = async (updatedProduct: Product): Promise<Product> => {
  const optimizedImage = await optimizeImage(updatedProduct.image);
  const productWithOptimizedImage = { ...updatedProduct, image: optimizedImage };
  products = products.map(product => 
    product.id === updatedProduct.id ? productWithOptimizedImage : product
  );
  localStorage.setItem('products', JSON.stringify(products));
  return productWithOptimizedImage;
};