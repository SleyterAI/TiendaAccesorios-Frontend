import { Category } from "./category.interface";

export interface Product{
  id: Number;
  name: String;
  description: String;
  price: Number;
  stock: Number;
  imageUrl: String;
  visible: Boolean;
  categoryName: Category;
}

export interface ProductRequestDto{
  name: String;
  description: String;
  price: Number;
  stock: Number;
  imageUrl: String;
  visible: Boolean;
  categoryName: Category;
}

export interface ProductResponseDto{
  name: String;
  description: String;
  price: Number;
  stock: Number;
  imageUrl: String;
  visible: Boolean;
  categoryName: String;
}

export interface OrderDetail{
  id: Number;
  quantity: Number;
  unitPrice: Number;
  subTotal: Number;
}
