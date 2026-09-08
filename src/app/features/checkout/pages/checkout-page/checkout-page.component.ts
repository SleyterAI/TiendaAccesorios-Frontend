import { Component } from '@angular/core';
import { HeaderComponent } from "../../../home/components/header/header.component";
import { CheckoutProductComponent } from "../../components/checkout-product/checkout-product.component";
import { FooterComponent } from "../../../home/components/footer/footer.component";

@Component({
  selector: 'app-checkout-page',
  imports: [HeaderComponent, CheckoutProductComponent, FooterComponent],
  templateUrl: './checkout-page.component.html',
  styleUrl: './checkout-page.component.css',
})
export class CheckoutPageComponent {

}
