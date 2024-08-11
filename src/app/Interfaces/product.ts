import { Brand } from "./brand";
import { Platform } from "./platform";
import { Sale } from "./sale";
import { Subcategory } from "./subcategory";

export interface Product {
    ID: number;
    Name: string;
    ArabicName: string;
    Description: string;
    ArabicDescription: string;
    Price: number;
    Quantity: number;
    MainImage: string;
    InstallationCost: string;
    SubCategoryID: number;
    BrandID: number;
    IsBundle: number;
    created_at: string;
    updated_at: string;
    AddedBy: number;
    UpdatedBy: number | null;
    ArchivedOn: string | null;
    DeletedOn: string | null;
    brand: Brand;
    platforms: Platform[];
    subcategory: Subcategory;
    sale: Sale;
}


