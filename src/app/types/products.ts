export interface Seller {
  id: string;
  login: string;
  company: boolean;
  superSeller: boolean;
}

export interface Promotion {
  emphasized: boolean;
  bold: boolean;
  highlight: boolean;
}

export interface LowestPrice {
  amount: string;
  currency: string;
}

export interface Delivery {
  availableForFree: boolean;
  lowestPrice: LowestPrice;
}

export interface Image {
  url: string;
}

export interface Price {
  amount: string;
  currency: string;
}

export interface SellingMode {
  format: string;
  price: Price;
  popularity: number;
  popularityRange: string;
}

export interface Stock {
  unit: string;
  available: number;
}

export interface Category {
  id: string;
}

export default interface Products {
  id: string;
  name: string;
  seller: Seller;
  promotion: Promotion;
  delivery: Delivery;
  images: Image[];
  sellingMode: SellingMode;
  stock: Stock;
  category: Category;
}
