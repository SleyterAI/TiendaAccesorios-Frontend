import { Injectable, signal, computed } from '@angular/core';
import { Producto } from '../../product/interfaces/product.interface';
import { CartItem, FullCartItem } from '../interfaces/api-cart.interface';

@Injectable({
  providedIn: 'root'
})
export class LocalCartService {
  private readonly STORAGE_KEY = 'shopping-cart';

  //Productos guardados en el carrito
  readonly cartProducts = signal<FullCartItem[]>(this.loadCart());

  //Cantidad total de unidades
  readonly cartCount = computed(() =>
    this.cartProducts().reduce((total, item) => total + item.cantidad, 0));

  // Subtotal general
  subtotal = computed(() => this.cartProducts().reduce(
      (total, item) => total + (item.producto.price * item.cantidad), 0)
  );

  // Por ahora el total es igual al subtotal
  readonly total = computed(() => this.subtotal());

  addToCart(producto: Producto): void {
    this.cartProducts.update(items => {
      const itemExistente = items.find(
        item => item.producto.id === producto.id
      );

      if (itemExistente) {
        return items.map(item =>
          item.producto.id === producto.id
          ?{...item, cantidad: item.cantidad + 1}
          : item
        );
      }

      return [...items, {producto,cantidad: 1}];
    });

    this.saveCart();
  }

  // Aumentar cantidad
  increaseQuantity(productoId: number): void {
    this.cartProducts.update(items =>
      items.map(item =>
        item.producto.id === productoId
          ? { ...item, cantidad: item.cantidad + 1 }
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
          item.producto.id === productoId
            ? { ...item, cantidad: item.cantidad - 1 }
            : item)
        .filter(item => item.cantidad > 0)
    );
    this.saveCart();
  }

  // Eliminar completamente un producto
  removeFromCart(productoId: number): void {
    this.cartProducts.update(items =>
      items.filter(item => item.producto.id !== productoId)
    );
    this.saveCart();
  }



  //guardar cart
  private saveCart(): void {
    localStorage.setItem(this.STORAGE_KEY,JSON.stringify(this.cartProducts()));
  }

  //cargar cart
  private loadCart(): FullCartItem[] {
    const storedCart = localStorage.getItem(this.STORAGE_KEY);

    if (!storedCart) return [];

    try {
      return JSON.parse(storedCart) as FullCartItem[];
    } catch (error) {
      console.error('Error carrito localStorage', error);
      return [];
    }
  }

  clearCart(): void {
    this.cartProducts.set([]);
    localStorage.removeItem(this.STORAGE_KEY);
  }
}
