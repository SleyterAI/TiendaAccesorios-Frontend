import { Component, inject, signal } from '@angular/core';
import { CartResponse } from '../../../home/interfaces/api-cart.interface';
import { ApiCartService } from '../../../home/services/api-cart.service';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-order-summary',
  imports: [DecimalPipe],
  templateUrl: './order-summary.component.html',
  styleUrl: './order-summary.component.css',
})
export class OrderSummaryComponent {
  private apiCartService = inject(ApiCartService);
  readonly cart = signal<CartResponse | null>(null);
  readonly cartCount = this.apiCartService.cartCount;
}
