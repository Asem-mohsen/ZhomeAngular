import { Product } from "./product";

export interface CartItem {
  id: number;
  user_id: number;
  product_id: number;
  price: number;
  quantity: number;
  status: string;
  with_installation: number;
  is_on_sale: string;
  total_amount:number;
  session_id : string;
  created_at: string;
  updated_at: string;
  product: Product;
}

export interface ApiResponse {
  items: CartItem[]
  count: number;
  total_amount: number;
  total_saved: number
}
