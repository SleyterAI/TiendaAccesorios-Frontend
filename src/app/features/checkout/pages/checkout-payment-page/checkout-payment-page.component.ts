import { Component, inject } from '@angular/core';
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

  private router = inject(Router);
  orderService = inject(OrderUserService);
  cartService = inject(ApiCartService);

  createOrder(orderRequest: OrderRequest){
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

  continuar() {
    const address = this.customerInfo.address();
    const phoneNumber = this.customerInfo.phoneNumber();

    const orderRequest: OrderRequest ={
      address: address,
      phoneNumber: phoneNumber
    };
    this.createOrder(orderRequest);
  }
}
