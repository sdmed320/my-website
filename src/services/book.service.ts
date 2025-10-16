
// FIX: Implemented BookService with mock data and methods to fetch books, resolving import errors in other components.
import { Injectable, signal } from '@angular/core';
import { of } from 'rxjs';
import { Book } from '../models';
import { books as booksData } from '../data/books';

@Injectable({ providedIn: 'root' })
export class BookService {
  private books = signal<Book[]>(booksData);

  getBooks() {
    return of(this.books());
  }

  getBookById(id: number) {
    const book = this.books().find(b => b.id === id);
    return of(book);
  }

  getRelatedBooks(currentBookId: number) {
    const currentBook = this.books().find(b => b.id === currentBookId);
    if (!currentBook) {
      return of([]);
    }
    const related = this.books().filter(b => b.category === currentBook.category && b.id !== currentBookId).slice(0, 4);
    return of(related);
  }
}
