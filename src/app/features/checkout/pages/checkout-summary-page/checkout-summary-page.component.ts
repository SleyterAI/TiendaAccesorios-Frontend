import { Component } from '@angular/core';
import { HeaderComponent } from "../../../home/components/header/header.component";
import { CheckoutProductComponent } from "../../components/checkout-product/checkout-product.component";
import { CustomerInfoComponent } from "../../components/customer-info/customer-info.component";
import { PaymentMethodComponent } from "../../components/payment-method/payment-method.component";
import { FooterComponent } from "../../../home/components/footer/footer.component";

@Component({
  selector: 'app-checkout-summary-page',
  imports: [HeaderComponent, CheckoutProductComponent, CustomerInfoComponent, PaymentMethodComponent, FooterComponent],
  templateUrl: './checkout-summary-page.component.html',
  styleUrl: './checkout-summary-page.component.css',
})
export class CheckoutSummaryPageComponent {
  //this part needs to updated
  //checkout-page: product
  //checkout-payment: product + customer + payment
  //checkout-summary: summary: no modify just data, button createOrder
}
