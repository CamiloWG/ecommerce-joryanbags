import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../interfaces/category.interface';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private API_URL_GET_CATEGORIES: string = `${environment.API_URL_BASE}/api/categories/`; 

  constructor(private http: HttpClient) { }

  GetCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.API_URL_GET_CATEGORIES);
  }
}
