import { Component, inject } from '@angular/core';
import { RouterLink } from "@angular/router";
import { ApiCartService } from '../../../services/api-cart.service';

@Component({
  selector: 'app-cart-button',
  imports: [RouterLink],
  templateUrl: './cart-button.component.html',
  styleUrl: './cart-button.component.css',
})
export class CartButtonComponent {
  readonly apiCartService = inject(ApiCartService);

  readonly cartCount = this.apiCartService.cartCount;
}
