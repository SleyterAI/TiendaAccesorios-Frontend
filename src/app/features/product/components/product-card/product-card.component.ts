import { Component, inject, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '../../interfaces/product.interface';
import { ApiCartService } from '../../../home/services/api-cart.service';
import { AuthService } from '../../../auth/services/auth.service';
import { LocalCartService } from '../../../home/services/local-cart.service';

@Component({
  selector: 'app-product-card',
  imports: [RouterLink],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent {
  readonly product = input.required<Product>();
  readonly apiCartService = inject(ApiCartService);
  readonly localService = inject(LocalCartService);
  readonly authService = inject(AuthService);

  readonly auth = this.authService.isAuthenticated();

  //forma para poder enviar info al componente padre
  agregar = output<Product>();

  //se envia al producto
  addToCart(): void {

    if (this.auth) {
      this.apiCartService.addItem(this.product().id).subscribe({
        next: () => {
          // Avisar al componente padre
          /*this.agregar.emit(this.product());*/
        },
        error: (error) => {
          console.error('Error al agregar producto:', error);
        }
      });
    } else {
      console.log('error en product-card, needs update for syncCart ')
      console.log('user with no acc can add items to cart too¡¡ ')
      //this.localService.addToCart(this.product());
    }
  }
}
