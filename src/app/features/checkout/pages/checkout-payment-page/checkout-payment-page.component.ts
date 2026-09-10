import { Component, inject, effect, AfterViewInit, computed } from '@angular/core';
import { HeaderComponent } from "../../../home/components/header/header.component";
import { CheckoutProductComponent } from "../../components/checkout-product/checkout-product.component";
import { FooterComponent } from "../../../home/components/footer/footer.component";
import { CustomerInfoComponent } from "../../components/customer-info/customer-info.component";
import { PaymentMethodComponent } from "../../components/payment-method/payment-method.component";
import { OrderSummaryComponent } from "../../components/order-summary/order-summary.component";
import { OrderUserService } from '../../services/order-user.service';
import { OrderRequest } from '../../interfaces/order.interface';

import { ViewChild } from '@angular/core';
import { ApiCartService } from '../../../home/services/api-cart.service';
import { Router } from '@angular/router';
import { CustomerService } from '../../../auth/services/customer.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { CustomerRequest } from '../../../auth/interfaces/customer.interface';

@Component({
  selector: 'app-checkout-payment-page',
  imports: [
    HeaderComponent,
    CheckoutProductComponent,
    FooterComponent,
    CustomerInfoComponent,
    PaymentMethodComponent
  ],
  templateUrl: './checkout-payment-page.component.html',
  styleUrl: './checkout-payment-page.component.css',
})
export class CheckoutPaymentPageComponent {
  @ViewChild(CustomerInfoComponent)
  customerInfo!: CustomerInfoComponent;

  @ViewChild(PaymentMethodComponent)
  paymentMethod!: PaymentMethodComponent;

  private router = inject(Router);
  private orderService = inject(OrderUserService);
  private cartService = inject(ApiCartService);
  private customerService = inject(CustomerService);

  customerResource = rxResource({
    stream: () => this.customerService.getCustomerByUserEmail()
  });

  customer = computed(() => this.customerResource.value() ?? null);


  createOrder(orderRequest: OrderRequest) {
    this.orderService.createOrder(orderRequest).subscribe({
      next: (response) => {
        console.log('Orden creada:', response);
        this.cartService.clearCart();
        this.router.navigate(['messageorderpage']);
      },
      error: (error) => {
        console.error('Error:', error);
      }
    });
  }

  createCustomer(customer: CustomerRequest) {
    this.customerService.createCustomer(customer).subscribe({
      next: () => {
        console.log('customer creado: ', customer);
      },
      error: (error) => {
        console.log('Error: ', error);
      }

    })
  }

  updateCustomer(customer: CustomerRequest) {
    this.customerService.updateCustomer(customer).subscribe({
      next: (response) => {
        console.log('Customer actualizado:', response);
        this.customerResource.reload();
      },
      error: (error) => {
        console.error('Error actualizando customer:', error);
      }
    });
  }

  continuar() {
    const name = this.customerInfo.name();
    const lastName = this.customerInfo.lastName();
    const address = this.customerInfo.address();
    const phoneNumber = this.customerInfo.phoneNumber();

    const cardNumber = this.paymentMethod.cardNumber();
    const expirationDate = this.paymentMethod.expirationDate();

    const orderRequest: OrderRequest = {
      address: address,
      phoneNumber: phoneNumber
    };

    const customerRequest: CustomerRequest = {
      name,
      lastName,
      address,
      phoneNumber,
      card: {
        cardNumber,
        expirationDate
      }
    };

    this.createOrder(orderRequest);
    if (this.customer()) {
      this.updateCustomer(customerRequest);
    } else {
      this.createCustomer(customerRequest);
    }

  }
}
