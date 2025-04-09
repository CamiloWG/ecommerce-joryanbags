import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenUser, User } from '../interfaces/user.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL_API_REGISTER: string = `${environment.API_URL_BASE}/api/auth/register`;
  private URL_API_LOGIN: string = `${environment.API_URL_BASE}/api/auth/login`;
  private TOKEN_KEY: string = 'JY_TKN';

  constructor(private http: HttpClient) {}

  registrarUsuario(data: User): Observable<TokenUser> {
    return this.http.post<TokenUser>(this.URL_API_REGISTER, data);
  }

  logearUsuario(email: string, password: string): Observable<TokenUser> {
    return this.http.post<TokenUser>(this.URL_API_LOGIN, { email, password });
  }

  setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  deleteToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    if (!token) return false;

    try {
      const payload: any = this.decodeToken(token);
      const expiracion = payload.exp;
      const ahora = Math.floor(Date.now() / 1000);
      return expiracion > ahora;
    } catch (e) {
      return false;
    }
  }

  getUserIdFromToken(): string | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const payload: any = this.decodeToken(token);
      return payload.user_id || payload.id || null;
    } catch (e) {
      return null;
    }
  }

  private decodeToken(token: string): any {
    try {
      const payload = token.split('.')[1];
      return JSON.parse(atob(payload));
    } catch (e) {
      console.error('Error al decodificar token', e);
      return null;
    }
  }
}
