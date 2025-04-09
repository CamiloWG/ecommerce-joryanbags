import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = `${environment.API_URL_BASE}/api/users`;
  private API_URL_UPDATE = `${environment.API_URL_BASE}/api/users/update`;

  constructor(private http: HttpClient) { }

  getUserById(userId: number | string): Observable<User[]> { 
    return this.http.get<User[]>(`${this.apiUrl}/${userId}`);
  }


  updateUserById(userId: number | string, body: any): Observable<User[]> {
    const updatedBody = { ...body, user_id: userId };
    return this.http.patch<User[]>(this.API_URL_UPDATE, updatedBody);
  }
}
