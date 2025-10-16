


import { Injectable, signal, computed, inject } from '@angular/core';
import { CartItem, Book } from '../models';
import { ConfigService } from './config.service';

@Injectable({ providedIn: 'root' })
export class CartService {
  private configService = inject(ConfigService);
  cartItems = signal<CartItem[]>([]);
  
  itemCount = computed(() => this.cartItems().reduce((acc, item) => acc + item.quantity, 0));
  
  subtotal = computed(() => this.cartItems().reduce((acc, item) => acc + (item.book.currentPrice * item.quantity), 0));

  deliveryCost = this.configService.deliveryCost;

  total = computed(() => this.subtotal() + this.deliveryCost());

  lastAddedItem = signal<Book | null>(null);

  addToCart(book: Book) {
    this.cartItems.update(items => {
      const existingItem = items.find(item => item.book.id === book.id);
      if (existingItem) {
        return items.map(item => item.book.id === book.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...items, { book, quantity: 1 }];
    });
    this.lastAddedItem.set(book);
  }

  updateQuantity(bookId: number, quantity: number) {
    this.cartItems.update(items =>
      items
        .map(item => (item.book.id === bookId ? { ...item, quantity } : item))
        .filter(item => item.quantity > 0)
    );
  }

  clearCart() {
    this.cartItems.set([]);
  }
}
