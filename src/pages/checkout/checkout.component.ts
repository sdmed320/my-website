import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { OrderService } from '../../services/order.service';
import { ConfigService } from '../../services/config.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  imports: [ReactiveFormsModule],
  // FIX: Added OnPush change detection strategy for performance.
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckoutComponent {
  // FIX: Explicitly type injected services to resolve type inference issues.
  private fb: FormBuilder = inject(FormBuilder);
  private router: Router = inject(Router);
  private orderService = inject(OrderService);
  private configService = inject(ConfigService);

  checkoutForm = this.fb.group({
    name: ['', Validators.required],
    phone: ['', [Validators.required, Validators.pattern('^[0-9]{8,15}$')]],
    address: ['', Validators.required],
    sameForWhatsapp: [true],
  });

  submitOrder() {
    if (this.checkoutForm.valid) {
      const { name, phone, address } = this.checkoutForm.value;
      const order = this.orderService.placeOrder({ name: name!, phone: phone!, address: address! });
      
      let message = `*طلب جديد من مكتبة قهوة و كتاب*\n\n`;
      message += `*رقم الطلب:* ${order.id}\n\n`;
      
      message += `*بيانات العميل:*\n`;
      message += `الاسم: ${order.customer.name}\n`;
      message += `الهاتف: ${order.customer.phone}\n`;
      message += `العنوان: ${order.customer.address}\n\n`;
      
      message += `*الكتب المطلوبة:*\n`;
      order.items.forEach(item => {
          message += `- ${item.book.title} (الكمية: ${item.quantity}) - ${item.book.currentPrice * item.quantity} أوقية\n`;
      });
      message += `\n`;
      
      message += `*ملخص الطلب:*\n`;
      message += `مبلغ الكتب: ${order.subtotal} أوقية\n`;
      message += `تكلفة التوصيل: ${order.deliveryCost} أوقية\n`;
      message += `*المبلغ الإجمالي: ${order.total} أوقية*\n`;

      const whatsappUrl = `${this.configService.whatsappLink()}?text=${encodeURIComponent(message)}`;
      
      window.open(whatsappUrl, '_blank');
      
      this.router.navigate(['/confirmation', order.id]);

    } else {
      this.checkoutForm.markAllAsTouched();
    }
  }
}
