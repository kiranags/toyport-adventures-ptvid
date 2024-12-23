export interface Product {
  id: number;
  name: string;
  description: string;
  image: string;
}

// We no longer need initialProducts as data comes from Supabase
export const initialProducts: Product[] = [];