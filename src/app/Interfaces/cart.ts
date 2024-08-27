import { Product } from "./product";

export interface CartItem {
  ID: number;
  UserID: number;
  CartID: string;
  ProductID: number;
  Price: number;
  Quantity: number;
  Status: number;
  Total:number;
  created_at: string;
  updated_at: string;
  product: Product;
}

// export interface CartData {
//   count: number;
//   cartItems: CartItem[];
//   products?: Product[];
// }

export interface ApiResponse {
  message: string;
  data: {
    count: number;
    total: number;
    cartItems: CartItem[];
    products: Product[];
  };
}
