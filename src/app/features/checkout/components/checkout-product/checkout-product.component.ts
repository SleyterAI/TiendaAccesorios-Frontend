import { Component, inject, signal } from '@angular/core';
import { ApiCartService } from '../../../home/services/api-cart.service';
import { OrderUserService } from '../../services/order-user.service';
import { Router, RouterLink } from '@angular/router';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { AddCartItemRequest, CartResponse } from '../../../home/interfaces/api-cart.interface';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-checkout-product',
  imports: [DecimalPipe, RouterLink],
  templateUrl: './checkout-product.component.html',
  styleUrl: './checkout-product.component.css',
})
export class CheckoutProductComponent {
  private apiCartService = inject(ApiCartService);
  private fb = inject(NonNullableFormBuilder);

  /*private orderUserService = inject(OrderUserService);*/
  private router = inject(Router);

  readonly cart = signal<CartResponse | null>(null);
  readonly cartCount = this.apiCartService.cartCount;

  /*readonly subtotal = this.apiCartService.subtotal;
  readonly total = this.cartService.total;*/


  constructor() {
    this.loadCart();
  }

  loadCart(){
    this.apiCartService.getCart().subscribe({
      next: (cart) => {
        console.log('Carrito cargado:', cart);
        this.cart.set(cart);
      },
      error: (error) => {
        console.error('Error al cargar carrito:', error);
      }
    });
  }

  increaseQuantity(productId: number) {
    this.apiCartService.addItem(productId).subscribe({
    next: (cart) => {
      console.log('Carrito actualizado +:', cart);
      this.cart.set(cart);
    },
    error: (error) => {
      console.error('Error al agregar producto +:', error);
    }
  });
  }

  decreaseQuantity(productId: number)  {
    this.apiCartService.decreaseItem(productId).subscribe({
    next: (cart) => {
      console.log('Carrito actualizado -:', cart);
      this.cart.set(cart);
    },
    error: (error) => {
      console.error('Error al disminuir -:', error);
    }
  });
  }

  removeItem(productId: number)  {
    this.apiCartService.removeItem(productId).subscribe({
    next: (cart) => {
      console.log('Carrito actualizado remove:', cart);
      this.cart.set(cart);
    },
    error: (error) => {
      console.error('Error al remove:', error);
    }
  });
  }

  formulario = this.fb.group({
    nombre: ['', Validators.required],
    celular: ['', [Validators.required,
    Validators.pattern(/^\d{9}$/)
    ]],
    direccion: ['', Validators.required]
  });

}
