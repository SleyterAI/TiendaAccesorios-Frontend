import { Producto } from "../../product/interfaces/product.interface";

export interface CartItem {
  id: number;
  productId: number;
  quantity: number;
  // agrega aquí los demás campos que devuelve tu API
}

export interface CartResponse {
  id: number;
  totalPrice: number;
  items: Items[];
}

export interface Items {
  id: number;
  productId: number;
  productName: string;
  imageUrl: string;
  price: number;
  quantity: number;
  subTotal: number;
}

//duda......
export interface LocalCartItem {
  productId: number;
  quantity: number;
}

export interface FullCartItem{
  producto: Producto;
  cantidad: number;
}

//....ready
export interface SyncCartRequest {
  items: CartItemRequest[];
}

export interface CartItemRequest {
  productId: number;
  quantity: number;
}

export interface SyncCartResponse {
  id: number;
  totalPrice: number;
  items: CartItemResponse[];
}

export interface CartItemResponse {
  id: number;
  productId: number;
  productName: string;
  imageUrl: string;
  price: number;
  quantity: number;
  subTotal: number;
}

