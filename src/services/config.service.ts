
import { Injectable, signal, computed } from '@angular/core';
import { config } from '../data/config';

@Injectable({ providedIn: 'root' })
export class ConfigService {
  private configData = signal(config);
  
  deliveryCost = computed(() => this.configData().deliveryCost);
  whatsappNumber = computed(() => this.configData().whatsappNumber);
  whatsappLink = computed(() => `https://wa.me/${this.configData().whatsappNumber}`);
}
