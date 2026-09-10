import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { Customer } from "../interfaces/customer.interface";
import { catchError, Observable, of, throwError } from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/customer`;

  getCustomerByUserEmail(): Observable<Customer | null> {
    return this.http.get<Customer>(`${this.apiUrl}/me`).pipe(
      catchError(error => {
        if (
          error.status === 400 &&
          error.error?.message === 'Customer not found'
        ) {
          return of(null);
        }

        return throwError(() => error);
      })
    );
  }
}
