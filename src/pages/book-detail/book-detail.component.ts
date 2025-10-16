import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { toSignal } from '@angular/core/rxjs-interop';

import { BookService } from '../../services/book.service';
import { CartService } from '../../services/cart.service';
import { BookCardComponent } from '../../components/book-card/book-card.component';
import { Book } from '../../models';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  imports: [RouterModule, BookCardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookDetailComponent {
  private route = inject(ActivatedRoute);
  private bookService = inject(BookService);
  cartService = inject(CartService);

  book = toSignal(
    (this.route.paramMap).pipe(
      switchMap(params => {
        const id = Number(params.get('id'));
        return this.bookService.getBookById(id);
      })
    )
  );

  relatedBooks = toSignal(
    (this.route.paramMap).pipe(
      switchMap(params => {
        const id = Number(params.get('id'));
        return this.bookService.getRelatedBooks(id);
      })
    ), { initialValue: [] }
  );

  addToCart(book: Book) {
      this.cartService.addToCart(book);
  }
}
