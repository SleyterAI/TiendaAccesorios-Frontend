import { Injectable, signal, computed } from '@angular/core';
import { Product } from '../../product/interfaces/product.interface';
import { CartItem, CartResponse, FullCartItem } from '../interfaces/api-cart.interface';

@Injectable({
  providedIn: 'root'
})
export class LocalCartService {
  private readonly STORAGE_KEY = 'shopping-cart';

  //Productos guardados en el carrito
  readonly cartProducts = signal<FullCartItem[]>(this.loadCart());

  //Cantidad total de unidades
  readonly cartCount = computed(() =>
    this.cartProducts().reduce((total, item) => total + item.quantity, 0));

  // Subtotal general
  subtotal = computed(() => this.cartProducts().reduce(
      (total, item) => total + (item.product.price * item.quantity), 0)
  );

  // Por ahora el total es igual al subtotal
  readonly total = computed(() => this.subtotal());

  addToCart(product: Product): void {
    this.cartProducts.update(items => {
      const itemExistente = items.find(
        item => item.product.id === product.id
      );

      if (itemExistente) {
        return items.map(item =>
          item.product.id === product.id
          ?{...item, quantity: item.quantity + 1}
          : item
        );
      }

      return [...items, {product, quantity: 1}];
    });

    this.saveCart();
  }

  // Aumentar cantidad
  increaseQuantity(productoId: number): void {
    this.cartProducts.update(items =>
      items.map(item =>
        item.product.id === productoId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
    this.saveCart();
  }

  // Disminuir cantidad
  decreaseQuantity(productoId: number): void {
    this.cartProducts.update(items =>
      items
        .map(item =>
          item.product.id === productoId
            ? { ...item, quantity: item.quantity - 1 }
            : item)
        .filter(item => item.quantity > 0)
    );
    this.saveCart();
  }

  // Eliminar completamente un producto
  removeFromCart(productoId: number): void {
    this.cartProducts.update(items =>
      items.filter(item => item.product.id !== productoId)
    );
    this.saveCart();
  }



  //guardar cart
  private saveCart(): void {
    localStorage.setItem(this.STORAGE_KEY,JSON.stringify(this.cartProducts()));
  }

  //cargar cart
  loadCart(): FullCartItem[] {
    const storedCart = localStorage.getItem(this.STORAGE_KEY);

    if (!storedCart) return [];

    try {
      return JSON.parse(storedCart) as FullCartItem[];
    } catch (error) {
      console.error('Error carrito localStorage', error);
      return [];
    }
  }

  getCart(): CartResponse {
  const items = this.loadCart();

  return {
    id: 0,
    totalPrice: items.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    ),
    items: items.map(item => ({
      id: 0,
      productId: item.product.id,
      productName: item.product.name,
      imageUrl: item.product.imageUrl,
      price: item.product.price,
      quantity: item.quantity,
      subTotal: item.product.price * item.quantity
    }))
  };
}


  clearCart(): void {
    this.cartProducts.set([]);
    localStorage.removeItem(this.STORAGE_KEY);
  }
}
