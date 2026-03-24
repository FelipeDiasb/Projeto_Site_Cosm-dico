export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  comparePrice?: number;
  image: string;
  badge?: string;
  installment?: string;
}

export interface CarouselMessage {
  id: number;
  icon: string;
  text: string;
  highlight?: string;
  price?: string;
}

export interface FilterState {
  categories: string[];
  brands: string[];
  priceRange: number;
}