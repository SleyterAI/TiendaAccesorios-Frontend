import { Component, inject, signal } from '@angular/core';
import { ApiCartService } from '../../../home/services/api-cart.service';
import { OrderUserService } from '../../services/order-user.service';
import { Router, RouterLink } from '@angular/router';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { AddCartItemRequest, CartResponse } from '../../../home/interfaces/api-cart.interface';
import { DecimalPipe } from '@angular/common';
import { rxResource } from '@angular/core/rxjs-interop';

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

  readonly cartCount = this.apiCartService.cartCount;

  readonly cartResource = rxResource({
    stream: () => this.apiCartService.getCart(),
  });

  increaseQuantity(productId: number) {
    this.apiCartService.addItem(productId).subscribe({
    next: (cart) => {
      this.cartResource.set(cart);
    },
    error: (error) => {
      console.error('Error al agregar producto +:', error);
    }
  });
  }

  decreaseQuantity(productId: number)  {
    this.apiCartService.decreaseItem(productId).subscribe({
    next: (cart) => {
      this.cartResource.set(cart);
    },
    error: (error) => {
      console.error('Error al disminuir -:', error);
    }
  });
  }

  removeItem(productId: number)  {
    this.apiCartService.removeItem(productId).subscribe({
    next: (cart) => {
      this.cartResource.set(cart);
    },
    error: (error) => {
      console.error('Error al remove:', error);
    }
  });
  }

  readonly formulario = this.fb.group({
    nombre: ['', Validators.required],
    celular: ['', [Validators.required, Validators.pattern(/^\d{9}$/)]],
    direccion: ['', Validators.required]
  });
}
