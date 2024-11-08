import { Product } from "./product";

export interface Brand {
  id:    number;
  name:  string;
  image_url:string;
  description:string;
  additional_description:  string;
  ar_description: string;
  ar_additional_description: string | null;
  updated_at: string;
  created_at: string | null;
  products: Product[];
}

