import { Brand } from "./brand";
import { Platform } from "./platform";
import { Sale } from "./sale";
import { Subcategory } from "./subcategory";
import { Admin } from "./user";

export interface Product {
    ID: number;
    Name: string;
    ArabicName: string;
    Description: string;
    ArabicDescription: string;
    Price: number;
    Quantity: number;
    MainImage: string;
    InstallationCost: number;
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
    technologies: Technology[];
    images: ProductImages[];
    features: Features[];
    product_details:ProductDetails;
    evaluations: Evaluations;
    faqs: Faqs[];
}

export interface ProductImages{
    ID: number;
    ProductID : number;
    Image: string;
    created_at: string;
    updated_at: string;
}
export interface Technology {
    Technology: string;
}

export interface ProductDetails{
    ID: number;
    ProductID: number;
    Title: string;
    Title2: string;
    ArabicTitle:string;
    ArabicTitle2:string;
    CoverImage: string;
    Video: string;
    Width: string;
    Height: string;
    Length: string;
    Color: string;
    Color2: string | null;
    Color3: string | null;
    Capacity:  string | null;
    NoiseLevel:  string | null;
    Weight:  string | null;
    PowerConsumption: string | null;
    AirPurification:  string | null;
    PreFilter:  string | null;
    DeodorizingFilter:  string | null;
    DustCollecting:  string | null;
    created_at: string;
    updated_at: string;
}
export interface Features{
    ID: 3;
    Feature: string;
    Description: string;
    Description_ar: string | null;
    Image: string;
    created_at: string;
    updated_at: string;
    pivot: {
        ProductID: number;
        FeatureID: number;
    }
}

export interface Evaluations{
    ID: number;
    ExpertID: number;
    Evaluation: string;
    ArabicEvaluation: string;
    ProductID: number;
    created_at: string;
    updated_at: string;
    admin: Admin;
}

export interface Faqs{
    ID: number;
    ExpertID: number;
    Question: string;
    Answer: string;
    ArabicQuestion: string | null;
    ArabicAnswer: string | null;
    created_at: string | null;
    updated_at: string | null;
}
