import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { Observable, tap } from "rxjs";
import { LoginRequestDto, LoginResponseDto } from "../interfaces/login.interface";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);

  private apiUrl = `${environment.apiUrl}/auth`;

  private logoutTimer?: ReturnType<typeof setTimeout>;

  login(request: LoginRequestDto): Observable<LoginResponseDto> {
    return this.http.post<LoginResponseDto>(`${this.apiUrl}/login`, request)
      .pipe(tap(response => {
        this.saveSession(response);
      }));
  }

  private saveSession(response: LoginResponseDto): void {
    localStorage.setItem('token', response.token);
    localStorage.setItem('email', response.email);
    localStorage.setItem('role', response.role);

    this.startTokenExpirationTimer(response.token);
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('role');
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getEmail(): string | null {
    return localStorage.getItem('email');
  }

  getRole(): string | null {
    return localStorage.getItem('role');
  }

  isAuthenticated(): boolean {
    const token = this.getToken();

    if (!token) {
      return false;
    }

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));

      const expiration = payload.exp * 1000;

      if (Date.now() >= expiration) {
        this.logout();
        return false;
      }
      return true;
    } catch {
      this.logout();
      return false;
    }
  }


  private startTokenExpirationTimer(token: string): void {
    // Si ya había un timer, lo cancelamos
    if (this.logoutTimer) {
      clearTimeout(this.logoutTimer);
    }
    try {
      const payload = JSON.parse(
        atob(token.split('.')[1])
      );
      const expiration = payload.exp * 1000;
      const ahora = Date.now();
      const tiempoRestante = expiration - ahora;

      // Si ya expiró
      if (tiempoRestante <= 0) {
        this.logout(); return;
      }

      // Programar logout automático
      this.logoutTimer = setTimeout(() => {
        this.logout();
      },
        tiempoRestante);
    } catch (error) {
      this.logout();
    }
  }
}
