import { /*OrderDetail,*/ OrderDetailResponse } from './order-detail.interface';
/*
export interface OrderDetailRequest {
  productId: number;
  quantity: number;
}

export interface Order {
  id?:number;
  userName:string;
  phoneNumber:string;
  address:string;
  orderDetailRequest: OrderDetailRequest[];
}*/


//implemented
export interface OrderRequest {
  phoneNumber: string;
  address: string;
}

export interface OrderResponse {
  //order
  order_id: number;
  order_phoneNumber: string;
  order_address: string;
  order_date: string;
  order_status: string;
  order_total: number;

  //user
  user_name: string;
  user_email: string;

  //order detail
  orderDetailResponse: OrderDetailResponse[];
}

export interface OrderSummaryResponse{
  //order
  order_id: number;
  order_phoneNumber: string;
  order_address: string;
  order_date: string;
  order_status: string;
  order_total: number;

  //user
  user_name: string;
  user_email: string;
}

export interface StatusRequest {
  order_status: string;
}
