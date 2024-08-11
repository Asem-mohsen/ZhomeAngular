import { Category } from "./category";

export interface Subcategory {
    ID: number;
    SubName: string;
    SubArabicName: string;
    image: string;
    SubDescription: string;
    ArabicDescription: string;
    Status: number;
    MainCategoryID: number;
    created_at: string | null;
    updated_at: string;
    category: Category;
}
