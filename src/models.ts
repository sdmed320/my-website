// FIX: Implemented model interfaces for Book, CartItem, and Order to resolve type errors across the application.
export interface Book {
  id: number;
  title: string;
  author: string;
  description: string;
  currentPrice: number;
  originalPrice?: number;
  isAvailable: boolean;
  coverImage: string;
  category: string;
}

export interface CartItem {
  book: Book;
  quantity: number;
}

export interface Order {
  id: string;
  customer: {
    name: string;
    phone: string;
    address: string;
  };
  items: CartItem[];
  subtotal: number;
  deliveryCost: number;
  total: number;
}