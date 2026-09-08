export interface AddCartItemRequest {
  productId: number;
  /*quantity: number;*/
}

export interface SyncCartRequest {
  items: AddCartItemRequest[];
}

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

