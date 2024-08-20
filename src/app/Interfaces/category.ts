import { Subcategory } from "./subcategory";

export interface Category {
    ID: number;
    Category: string;
    ArabicName: string;
    MainImage: string;
    Description: string;
    ArabicDescription: string;
    OtherDescription: string;
    OtherArabicDescription: string;
    HasSub: number;
    created_at: string | null;
    updated_at: string;
    ArchivedOn: string | null;
    DeletedOn: string | null;
    Subcategory: Subcategory[]
}
