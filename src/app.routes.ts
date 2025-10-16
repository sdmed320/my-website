
import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { BookDetailComponent } from './pages/book-detail/book-detail.component';
import { CartComponent } from './pages/cart/cart.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { ConfirmationComponent } from './pages/confirmation/confirmation.component';

export const APP_ROUTES: Routes = [
  { path: '', component: HomeComponent, title: 'مكتبة قهوة و كتاب | الرئيسية' },
  { path: 'book/:id', component: BookDetailComponent, title: 'تفاصيل الكتاب' },
  { path: 'cart', component: CartComponent, title: 'عربة التسوق' },
  { path: 'checkout', component: CheckoutComponent, title: 'إتمام الشراء' },
  { path: 'confirmation/:id', component: ConfirmationComponent, title: 'تم الطلب بنجاح' },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];