import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OrderRequest, OrderResponse, StatusRequest } from '../interfaces/order.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderUserService {

  private http = inject(HttpClient);

  private apiUrl = `${environment.apiUrl}/order`;

  //user
  createOrder(OrderRequest: OrderRequest): Observable<String> {
    return this.http.post(this.apiUrl, OrderRequest,
    { responseType: 'text' });
  }

  //admin
  getAllOrder(): Observable<OrderResponse[]> {
    return this.http.get<OrderResponse[]>(this.apiUrl);
  }

  /*getAllOrderRequest(): Observable<OrderRequest[]> {
    return this.http.get<OrderRequest[]>(this.apiUrl);
  }*/

  //admin - user ?
  getOrderById(id: number): Observable<OrderResponse> {
    return this.http.get<OrderResponse>(`${this.apiUrl}/${id}`);
  }

  /*
  updateOrder(id: number, order: Order): Observable<Order> {
    return this.http.put<Order>(`${this.apiUrl}/${id}`,order);
  }*/

  //admin
  changeStatus(id: number, status: string): Observable<string> {
    return this.http.patch(`${this.apiUrl}/${id}/status`,
      { order_status: status },
    { responseType: 'text' });
  }

  //admin
  deleteOrder(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
