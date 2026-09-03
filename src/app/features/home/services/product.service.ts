import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product, ProductRequestDto} from '../interfaces/product.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private http = inject(HttpClient);

  private apiUrl = `${environment.apiUrl}/productos`;

  getAllProduct(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  getAllProductAdmin(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/admin`);
  }

  getProductsByCategoria(nombreCategoria: string): Observable<Product[]> {
    const params = new HttpParams()
    .set('nombreCategoria', nombreCategoria);

    return this.http.get<Product[]>(this.apiUrl,{params});
  }

    /*getProductsByCategoria(nombreCategoria: string): Observable<Producto[]> {
    return this.http.get<Producto[]>(
      `${this.apiUrl}?nombreCategoria=${encodeURIComponent(nombreCategoria)}`
    );
  }*/

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  createProducto(producto: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, producto);
  }

  updateProducto(id: number, producto: ProductRequestDto): Observable<ProductRequestDto> {
    return this.http.put<ProductRequestDto>(`${this.apiUrl}/${id}`, producto);
  }

  /*deleteProducto(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }*/

  cambiarActivo(id: number, activo: boolean): Observable<Product> {
    return this.http.patch<Product>(`${this.apiUrl}/${id}/activo`, { activo });
  }

}
