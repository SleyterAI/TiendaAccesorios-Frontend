import { Category } from "./category.interface";

export interface Product{
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: string;
  visible: boolean;
  categoryName: string;
}
//-------------------------------------------
/*export interface ProductRequestDto{
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: string;
  visible: boolean;
  categoryName: Category;
}

export interface ProductResponseDto{
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: string;
  visible: boolean;
  categoryName: string;
}

export interface OrderDetail{
  id: number;
  quantity: number;
  unitPrice: number;
  subTotal: number;
}*/

//------------------------------------
/*export interface ProductRequest {
  id?:number;
  nombre:string;
  descripcion:string;
  precio:number;
  stock:number;
  imageUrl:string;
  activo:boolean;
  categoryName: Category;
}*/

export interface ProductRequest {
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: string;
  visible: boolean;
  category: {
    id: number;
  };
}
