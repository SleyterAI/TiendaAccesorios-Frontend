import { Component, effect, inject, input, output, signal } from '@angular/core';
import { UserService } from '../../../auth/services/user.service';
import { FormsModule, Validators } from '@angular/forms';
import { Customer } from '../../../auth/interfaces/customer.interface';

@Component({
  selector: 'app-customer-info',
  imports: [FormsModule],
  templateUrl: './customer-info.component.html',
  styleUrl: './customer-info.component.css',
})
export class CustomerInfoComponent {
  name = signal('');
  lastName = signal('');
  address = signal('');
  phoneNumber = signal('');

  customer = input<Customer | null>(null);

  constructor() {
    effect(() => {
      const customer = this.customer();

      if (customer) {
        this.name.set(customer.name);
        this.lastName.set(customer.lastName);
        this.address.set(customer.address);
        this.phoneNumber.set(customer.phoneNumber);
      }
    });
  }
}
