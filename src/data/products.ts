export interface Product {
  id: number;
  name: string;
  description: string;
  image: string;
}

export const initialProducts: Product[] = [
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