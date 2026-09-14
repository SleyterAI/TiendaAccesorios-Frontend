import { Component, inject, signal } from '@angular/core';
import { ApiCartService } from '../../../home/services/api-cart.service';
import { OrderUserService } from '../../services/order-user.service';
import { Router, RouterLink } from '@angular/router';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { DecimalPipe } from '@angular/common';
import { rxResource } from '@angular/core/rxjs-interop';
import { AuthService } from '../../../auth/services/auth.service';
import { LocalCartService } from '../../../home/services/local-cart.service';
import { of } from 'rxjs';

@Component({
  selector: 'app-checkout-product',
  imports: [DecimalPipe, RouterLink],
  templateUrl: './checkout-product.component.html',
  styleUrl: './checkout-product.component.css',
})
export class CheckoutProductComponent {
  private readonly apiCartService = inject(ApiCartService);
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);
  private readonly localCartService = inject(LocalCartService);

  readonly auth = this.authService.isAuthenticated();

  readonly cartCount = this.apiCartService.cartCount;

  readonly cartResource = rxResource({
    stream: () => {
      if (this.auth) {
        return this.apiCartService.getCart();
      }
      return of(this.localCartService.getCart())
    }
  });

  increaseQuantity(productId: number) {
    if (this.auth) {
      //user authenticated
      this.apiCartService.addItem(productId).subscribe({
        next: () => {
          this.cartResource.reload();
        },
        error: (error) => {
          console.error('Error al agregar producto +:', error);
        }
      });
    } else {
      //user no authenticated
      this.localCartService.increaseQuantity(productId);
      this.cartResource.reload();
    }
  }

  decreaseQuantity(productId: number) {
    if(this.auth){
      //user authenticated
      this.apiCartService.decreaseItem(productId).subscribe({
      next: () => {
        this.cartResource.reload();
      },
      error: (error) => {
        console.error('Error al disminuir -:', error);
      }
    });
    }else{
      //user no authenticated
      this.localCartService.decreaseQuantity(productId);
      this.cartResource.reload();
    }

  }

  removeItem(productId: number) {
    if(this.auth){
      //user authenticated
      this.apiCartService.removeItem(productId).subscribe({
      next: (cart) => {
        this.cartResource.set(cart);
      },
      error: (error) => {
        console.error('Error al remove:', error);
      }
    });
    }else{
      //user no authenticated
      this.localCartService.removeFromCart(productId);
      this.cartResource.reload();
    }
  }

  readonly formulario = this.fb.group({
    nombre: ['', Validators.required],
    celular: ['', [Validators.required, Validators.pattern(/^\d{9}$/)]],
    direccion: ['', Validators.required]
  });
}
