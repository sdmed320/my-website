
import { Injectable, signal, inject } from '@angular/core';
import { Order, CartItem } from '../models';
import { CartService } from './cart.service';

@Injectable({ providedIn: 'root' })
export class OrderService {
  private cartService = inject(CartService);
  private lastOrder = signal<Order | null>(null);

  placeOrder(customer: { name: string; phone: string; address: string }): Order {
    const newOrder: Order = {
      id: `QMN${Math.floor(Math.random() * 900000) + 100000}`,
      customer,
      items: this.cartService.cartItems(),
      subtotal: this.cartService.subtotal(),
      deliveryCost: this.cartService.deliveryCost(),
      total: this.cartService.total(),
    };
    this.lastOrder.set(newOrder);
    this.cartService.clearCart();
    return newOrder;
  }

  getLastOrder() {
    return this.lastOrder();
  }
}
