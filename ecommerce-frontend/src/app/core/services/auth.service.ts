import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL_API_REGISTER: string = "http://localhost:4000/api/auth/register";

  constructor(private http: HttpClient) {}

  registrarUsuario(data: User): Observable<any> {
    return this.http.post(this.URL_API_REGISTER, data);
  }
}
