import { ChangeDetectionStrategy, Component, inject, computed } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OrderService } from '../../services/order.service';
import { ConfigService } from '../../services/config.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  imports: [RouterModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmationComponent {
  orderService = inject(OrderService);
  configService = inject(ConfigService);
  order = computed(() => this.orderService.getLastOrder());

  get whatsappLink() {
    const orderDetails = this.order();
    const baseLink = this.configService.whatsappLink();
    if (!orderDetails) return baseLink;

    const message = `السلام عليكم، بخصوص الطلب رقم #${orderDetails.id}`;
    return `${baseLink}?text=${encodeURIComponent(message)}`;
  }
}
