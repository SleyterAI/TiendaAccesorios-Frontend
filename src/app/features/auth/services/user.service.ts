import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { Observable } from "rxjs";

import { RegistroRequestDto, UsuarioRequestDto } from "../interfaces/usuario.interface";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private http = inject(HttpClient);

  private apiUrl = `${environment.apiUrl}/user`;

  createUsuario(request: RegistroRequestDto): Observable<RegistroRequestDto> {
    return this.http.post<RegistroRequestDto>(`${this.apiUrl}/register`, request);
  }

  getAllUsuario(): Observable<UsuarioRequestDto[]> {
    return this.http.get<UsuarioRequestDto[]>(this.apiUrl);
  }

  promoverAdmin(id: number, role: String): Observable<UsuarioRequestDto> {
      return this.http.patch<UsuarioRequestDto>(`${this.apiUrl}/${id}/role`, { role });
    }

  deleteUsuario(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
