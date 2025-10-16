import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ConfigService } from '../../services/config.service';

@Component({
  selector: 'app-floating-cta',
  templateUrl: './floating-cta.component.html',
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FloatingCtaComponent {
  configService = inject(ConfigService);
}
