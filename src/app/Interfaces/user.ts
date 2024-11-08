import { Product } from "./product";

export interface User {
  id: number;
  google_id: string | null;
  FacebookID: string | null;
  session_id: string;
  name: string;
  email: string;
  role_id:number;
  status: string;
  zip_code:string;
  phones: string[]; 
  address?: Address | null; 
  email_verified_at: string;
  created_at: string;
  updated_at: string;
  remember_token: string | null;
  products: Product[] | null;
}

export interface Address {
  user_id : number;
  country : string;
  city : string;
  street_address : string;
  apartment : string;
  floor : string;
  building : string;
}

export interface ApiResponse {
  user: User;
  orderCount: any[]; 
  userProducts: any[];
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    token: string;
    user: User;
  };
  error: any;
}
