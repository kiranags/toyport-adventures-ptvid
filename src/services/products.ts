import { supabase } from "@/integrations/supabase/client";
import type { Product } from "@/data/products";
import type { Database } from "@/integrations/supabase/types";

export const getProducts = async (): Promise<Product[]> => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  
  return (data || []).map(product => ({
    id: product.id,
    name: product.name,
    description: product.description || "",
    image: product.image_url || "",
  }));
};

export const deleteProduct = async (id: number): Promise<void> => {
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', id);

  if (error) throw error;
};

export const addProduct = async (product: Omit<Product, "id">): Promise<Product> => {
  let imageUrl = product.image;
  
  // If the image is a base64 string, upload it to storage
  if (product.image.startsWith('data:')) {
    const file = await fetch(product.image).then(res => res.blob());
    const fileExt = file.type.split('/')[1];
    const fileName = `${crypto.randomUUID()}.${fileExt}`;
    
    const { error: uploadError } = await supabase.storage
      .from('products')
      .upload(fileName, file);

    if (uploadError) throw uploadError;

    const { data: { publicUrl } } = supabase.storage
      .from('products')
      .getPublicUrl(fileName);

    imageUrl = publicUrl;
  }

  const { data, error } = await supabase
    .from('products')
    .insert([{
      name: product.name,
      description: product.description,
      image_url: imageUrl
    }])
    .select()
    .single();

  if (error) throw error;
  if (!data) throw new Error('No data returned from insert');

  return {
    id: data.id,
    name: data.name,
    description: data.description || "",
    image: data.image_url || "",
  };
};

export const updateProduct = async (product: Product): Promise<Product> => {
  let imageUrl = product.image;
  
  // If the image is a base64 string, upload it to storage
  if (product.image.startsWith('data:')) {
    const file = await fetch(product.image).then(res => res.blob());
    const fileExt = file.type.split('/')[1];
    const fileName = `${crypto.randomUUID()}.${fileExt}`;
    
    const { error: uploadError } = await supabase.storage
      .from('products')
      .upload(fileName, file);

    if (uploadError) throw uploadError;

    const { data: { publicUrl } } = supabase.storage
      .from('products')
      .getPublicUrl(fileName);

    imageUrl = publicUrl;
  }

  const { data, error } = await supabase
    .from('products')
    .update({
      name: product.name,
      description: product.description,
      image_url: imageUrl
    })
    .eq('id', product.id)
    .select()
    .single();

  if (error) throw error;
  if (!data) throw new Error('No data returned from update');

  return {
    id: data.id,
    name: data.name,
    description: data.description || "",
    image: data.image_url || "",
  };
};