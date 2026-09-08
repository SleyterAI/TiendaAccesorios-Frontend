import { Product } from "../../product/interfaces/product.interface";

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Cart{
  cartItem: CartItem[];
}
