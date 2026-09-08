import { Injectable, signal, computed } from '@angular/core';
import { Product } from '../../product/interfaces/product.interface';
import { CartItem } from '../interfaces/api-cart.interface';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageCartService {
  /* This part needs to be implemented 2 ways down: choose the better one */
  /*
  private readonly STORAGE_KEY = 'shopping-cart';

  private cartProducts = signal<CartItem[]>(this.loadCart());

  readonly cartCount = computed(() =>
    this.cartProducts().reduce((total, item) => total + item.quantity, 0)
  );

  readonly subtotal = computed(() =>
    this.cartProducts().reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    )
  );

  readonly total = computed(() => this.subtotal());

  addToCart(product: Product, quantity: number = 1): void {
    this.cartProducts.update(items => {
      const existingItem = items.find(item => item.product.id === product.id);

      if (existingItem) {
        return items.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [...items, { product, quantity }];
    });

    this.saveCart();
  }

  increaseQuantity(productId: number): void {
    this.cartProducts.update(items =>
      items.map(item =>
        item.product.id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
    this.saveCart();
  }

  decreaseQuantity(productId: number): void {
    this.cartProducts.update(items =>
      items
        .map(item =>
          item.product.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter(item => item.quantity > 0)
    );
    this.saveCart();
  }

  removeFromCart(productId: number): void {
    this.cartProducts.update(items =>
      items.filter(item => item.product.id !== productId)
    );
    this.saveCart();
  }

  getCartProducts() {
    return this.cartProducts.asReadonly();
  }

  clearCart(): void {
    this.cartProducts.set([]);
    localStorage.removeItem(this.STORAGE_KEY);
  }

  private saveCart(): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.cartProducts()));
  }

  private loadCart(): CartItem[] {
    const storedCart = localStorage.getItem(this.STORAGE_KEY);
    if (!storedCart) return [];

    try {
      return JSON.parse(storedCart) as CartItem[];
    } catch (error) {
      console.error('Error loading cart from localStorage', error);
      return [];
    }
  }*/
}

/*
  import { Injectable } from '@angular/core';

export interface CartItem {
  productId: number;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartLocalStorageService {

  private readonly CART_KEY = 'cart';

  getItems(): CartItem[] {
    const cart = localStorage.getItem(this.CART_KEY);

    return cart ? JSON.parse(cart) : [];
  }

  addItem(productId: number, quantity: number): void {
    const items = this.getItems();

    const existingItem = items.find(
      item => item.productId === productId
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      items.push({
        productId,
        quantity
      });
    }

    this.saveItems(items);
  }

  updateQuantity(productId: number, quantity: number): void {
    const items = this.getItems();

    const item = items.find(
      item => item.productId === productId
    );

    if (!item) return;

    if (quantity <= 0) {
      this.removeItem(productId);
      return;
    }

    item.quantity = quantity;

    this.saveItems(items);
  }

  removeItem(productId: number): void {
    const items = this.getItems().filter(
      item => item.productId !== productId
    );

    this.saveItems(items);
  }

  clear(): void {
    localStorage.removeItem(this.CART_KEY);
  }

  getItem(productId: number): CartItem | undefined {
    return this.getItems().find(
      item => item.productId === productId
    );
  }

  getTotalItems(): number {
    return this.getItems().reduce(
      (total, item) => total + item.quantity,
      0
    );
  }

  private saveItems(items: CartItem[]): void {
    localStorage.setItem(
      this.CART_KEY,
      JSON.stringify(items)
    );
  }
}
*/
