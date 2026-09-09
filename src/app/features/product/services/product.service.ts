import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product, Producto, ProductRequest} from '../interfaces/product.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private http = inject(HttpClient);

  private apiUrl = `${environment.apiUrl}/product`;

  getAllProduct(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  getProductsByCategory(categoryName: string): Observable<Product[]> {
    const params = new HttpParams()
    .set('categoryName', categoryName);

    return this.http.get<Product[]>(this.apiUrl,{params});
  }

  getProductById(id: number): Observable<Producto> {
    return this.http.get<Producto>(`${this.apiUrl}/${id}`);
  }

  //Admin methods
  createProducto(producto: ProductRequest): Observable<ProductRequest> {
    return this.http.post<ProductRequest>(this.apiUrl, producto);
  }

  getAllProductAdmin(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/admin`);
  }
  updateProducto(id: number, producto: ProductRequest): Observable<ProductRequest> {
    return this.http.put<ProductRequest>(`${this.apiUrl}/${id}`, producto);
  }

  deleteProducto(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  updateProductVisible(id: number, visible: boolean): Observable<string> {
    return this.http.patch(`${this.apiUrl}/${id}/visible`, { visible },
    { responseType: 'text' });
  }

}
