import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AddCartItemRequest, SyncCartRequest, CartItem, CartResponse, Items } from '../interfaces/api-cart.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiCartService {
  private http = inject(HttpClient);
  private API_URL = `${environment.apiUrl}/cart`;

  private readonly _cartItems = signal<CartItem[]>([]);

  readonly cartItems = this._cartItems.asReadonly();

  readonly cartCount = computed(() =>
    this._cartItems().reduce(
      (total, item) => total + item.quantity, 0)
  );

  private updateCartState(cart: CartResponse): void {
    this._cartItems.set(cart.items);
  }

  constructor(){
    this.getCart().subscribe();
  }

  /* METODOS CONSUMEN API */
  // Agregar 1 producto al cart si no hay crea uno nuevo
  addItem(productId: number): Observable<CartResponse> {
    return this.http.post<CartResponse>(`${this.API_URL}/item`, { productId })
    .pipe(
      tap(cart => {
        this.updateCartState(cart);
      })
    );
  }

  // Reducir en 1 la cantidad del product en el cart
  decreaseItem(productId: number): Observable<CartResponse> {
    return this.http.patch<CartResponse>(`${this.API_URL}/item/${productId}/decrease`, {})
    .pipe(
      tap(cart => {
        this.updateCartState(cart);
      })
    );
  }

  //obtiene todos los cart - se usa token para obtener el cart de cada user
  getCart(): Observable<CartResponse> {
    return this.http.get<CartResponse>(this.API_URL)
    .pipe(
      tap(cart => {
        this.updateCartState(cart);
      })
    );
  }

  // Eliminar item del carrito
  removeItem(productId: number): Observable<CartResponse> {
    return this.http.delete<CartResponse>(`${this.API_URL}/item/${productId}`)
    .pipe(
      tap(cart => {
        this.updateCartState(cart);
      })
    );
  }

  // Vaciar carrito
  clearCart(): Observable<CartResponse> {
    return this.http.delete<CartResponse>(`${this.API_URL}/clear`).pipe(
      tap(cart => {
        this.updateCartState(cart);
      })
    );
  }

  // Sincronizar carrito local con el carrito del usuario
  syncCart(request: SyncCartRequest): Observable<CartItem[]> {
    return this.http.put<CartItem[]>(`${this.API_URL}/sync`, request);
  }



}
