import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  imports: [RouterModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartComponent {
  cartService = inject(CartService);

  updateQuantity(bookId: number, newQuantity: number) {
    if (newQuantity >= 0) {
      this.cartService.updateQuantity(bookId, newQuantity);
    }
  }
}
