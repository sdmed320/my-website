import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { CartService } from './services/cart.service';
import { FloatingCtaComponent } from './components/floating-cta/floating-cta.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterModule, HeaderComponent, FooterComponent, FloatingCtaComponent],
})
export class AppComponent {
  cartService = inject(CartService);
  
  closeModal() {
    this.cartService.lastAddedItem.set(null);
  }
}