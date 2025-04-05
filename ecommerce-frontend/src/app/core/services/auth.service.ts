import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenUser, User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL_API_REGISTER: string = "http://localhost:4000/api/auth/register";
  private URL_API_LOGIN: string = "http://localhost:4000/api/auth/login";

  constructor(private http: HttpClient) {}

  registrarUsuario(data: User): Observable<TokenUser> {
    return this.http.post<TokenUser>(this.URL_API_REGISTER, data);
  }

  logearUsuario(email: string, password: string): Observable<TokenUser> {
    return this.http.post<TokenUser>(this.URL_API_LOGIN, { email, password });
  }
}
