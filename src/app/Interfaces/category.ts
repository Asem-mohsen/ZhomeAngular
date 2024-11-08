import { Product } from "./product";
import { Subcategory } from "./subcategory";

export interface Category {
    id: number;
    name: string;
    ar_name: string;
    image_url: string;
    description: string;
    ar_description: string;
    additional_description: string;
    ar_additional_description: string;
    has_sub: number;
    subcategories_count :number;
    products_count : number
    created_at: string;
    updated_at: string;
    subcategories: Subcategory[];
    products : Product[] | null;
}
