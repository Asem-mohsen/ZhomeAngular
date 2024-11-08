import { Category } from "./category";

export interface Subcategory {
    id: number;
    name: string;
    ar_name: string;
    image_url: string;
    description: string;
    ar_description: string;
    status: string;
    category_id: number;
    created_at: string;
    updated_at: string;
    category: Category;
}
