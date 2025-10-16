import { ChangeDetectionStrategy, Component, inject, computed, signal, OnDestroy, effect } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BookService } from '../../services/book.service';
import { SearchService } from '../../services/search.service';
import { ConfigService } from '../../services/config.service';
import { BookCardComponent } from '../../components/book-card/book-card.component';
import { Book } from '../../models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  imports: [BookCardComponent, RouterModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnDestroy {
  private bookService = inject(BookService);
  private searchService = inject(SearchService);
  configService = inject(ConfigService);
  private intervalId: number | undefined;

  allBooks = signal<Book[]>([]);
  searchQuery = this.searchService.searchQuery;
  
  selectedCategory = signal<string | null>(null);

  categories = computed(() => {
    const books = this.allBooks();
    return ['الكل', ...new Set(books.map(b => b.category))];
  });

  filteredBooks = computed(() => {
    const query = this.searchQuery().toLowerCase();
    const category = this.selectedCategory();
    let books = this.allBooks();

    if (category && category !== 'الكل') {
        books = books.filter(book => book.category === category);
    }

    if (query) {
        books = books.filter(
        book =>
            book.title.toLowerCase().includes(query) ||
            book.author.toLowerCase().includes(query)
        );
    }
    return books;
  });

  discountedBookImages = computed(() =>
    this.allBooks()
      .filter(b => b.originalPrice && b.originalPrice > b.currentPrice)
      .map(b => b.coverImage)
  );
  currentImageIndex = signal(0);

  constructor() {
    this.bookService.getBooks().subscribe(books => {
      this.allBooks.set(books);
    });

    effect(() => {
      const images = this.discountedBookImages();
      
      if (this.intervalId) {
        clearInterval(this.intervalId);
      }

      if (images.length > 1) {
        this.currentImageIndex.set(0); 
        this.intervalId = window.setInterval(() => {
          this.currentImageIndex.update(i => (i + 1) % images.length);
        }, 5000);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      window.clearInterval(this.intervalId);
    }
  }

  selectCategory(category: string) {
    if (category === 'الكل') {
      this.selectedCategory.set(null);
    } else {
      this.selectedCategory.set(category);
    }
  }

  onSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchQuery.set(input.value);
  }
}
