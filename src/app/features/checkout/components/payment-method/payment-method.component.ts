import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-payment-method',
  imports: [FormsModule],
  templateUrl: './payment-method.component.html',
  styleUrl: './payment-method.component.css',
})
export class PaymentMethodComponent {
  cardNumber = signal('');
  cvv = signal('');
}
