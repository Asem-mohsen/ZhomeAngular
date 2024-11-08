import { Brand } from "./brand";
import { Platform } from "./platform";
import { Sale } from "./sale";
import { Subcategory } from "./subcategory";

export interface Product {
    id: number;
    name: string;
    price: number;
    quantity: number;
    image_url: string;
    installation_cost: number;
    subcategory_id: number;
    brand_id: number;
    is_bundle: number;
    video_url: string;
    created_at: string;
    updated_at: string;
    added_by: number;
    updated_by: number | null;

    brand: Brand;
    platforms: Platform[];
    translations : Translation;
    reviews: Review[];
    colors: Color[];
    dimensions: Dimensions;
    subcategory: Subcategory;
    sale: Sale;
    technologies: Technology[];
    other_images: Media[];
    features: Features[];
    faqs: Faqs[];
}

export interface Media {
  id: number;
  url: string;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface Technology {
    id: number;
    name : string;
    description: string;
    ar_description: string;
    image_url : string;
    created_at: string;
    updated_at: string;
}



export interface Review {
  id: number;
  product_id: number;
  user_id: number;
  comment: string;
  ar_comment: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface Translation {
  id: number;
  product_id: number;
  locale: string;
  name: string;
  description: string;
  additional_description: string;
  title: string;
  second_title: string;
  created_at: string;
  updated_at: string;
}

export interface Color {
  product_id: number;
  color: string;
  created_at: string;
  updated_at: string;
}

export interface Dimensions {
  product_id: number;
  width: string;
  height: string;
  length: string;
  capacity: string;
  noise_level: string;
  weight: string;
  power_consumption: string;
  pre_filter: string;
  dust_collecting: string;
  deodorizing_filter: string;
  air_purification: string;
  created_at: string;
  updated_at: string;
}

export interface Features{
    id: 3;
    name: string;
    description: string;
    ar_description: string;
    image_url: string;
    created_at: string;
    updated_at: string;
    pivot: {
        product_id: number;
        feature_id: number;
    }
}

export interface Faqs{
    id: number;
    product_id: number;
    created_at: string;
    updated_at: string;

    translations : {
      id: string;
      faq_id: number;
      locale: string;
      question : string;
      answer: string;
      created_at: string;
      updated_at: string ;
    }

}
