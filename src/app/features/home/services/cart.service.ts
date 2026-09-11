import { Injectable, inject, signal, computed, effect } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CartItemRequest, SyncCartRequest, CartItem, CartResponse, Items, LocalCartItem, FullCartItem } from '../interfaces/api-cart.interface';
import { AuthService } from '../../auth/services/auth.service';
import { LocalCartService } from './local-cart.service';
import { ApiCartService } from './api-cart.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private readonly localCart = inject(LocalCartService);
  private readonly apiCart = inject(ApiCartService);

  syncCart() {
    const items = this.localCart.cartProducts();

    const request: SyncCartRequest = {
      items: items.map(({ producto, cantidad }) => ({
        productId: producto.id,
        quantity: cantidad
      }))
    };

    return this.apiCart.syncCart(request);
  }
}
