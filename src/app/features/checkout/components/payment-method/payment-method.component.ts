import { Component, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Customer } from '../../../auth/interfaces/customer.interface';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-payment-method',
  imports: [FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule
  ],
  templateUrl: './payment-method.component.html',
  styleUrl: './payment-method.component.css',
})
export class PaymentMethodComponent {
  cardNumber = signal('');
  cvv = signal('');
  expirationDate = signal('');

  customer = input<Customer | null>(null);
}
