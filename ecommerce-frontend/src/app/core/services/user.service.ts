import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:4000/api/users';

  constructor(private http: HttpClient) { }

  getUserById(userId: number | string): Observable<User[]> { 
    return this.http.get<User[]>(`${this.apiUrl}/${userId}`);
  }
}
