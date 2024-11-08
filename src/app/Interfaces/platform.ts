import { Product } from "./product";

export interface Platform {
  id:     number;
  name:  string;
  image_url: string;
  video_url: string;
  cover_image: string | null;
  description:    string;
  ar_description: string;
  updated_at: string;
  created_at: string | null;
  products: Product[];
  faqs: any[];
}
