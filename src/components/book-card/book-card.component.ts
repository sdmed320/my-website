import { ChangeDetectionStrategy, Component, input, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Book } from '../../models';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterModule],
})
export class BookCardComponent {
  book = input.required<Book>();
  cartService = inject(CartService);

  addToCart(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.cartService.addToCart(this.book());
  }
}
