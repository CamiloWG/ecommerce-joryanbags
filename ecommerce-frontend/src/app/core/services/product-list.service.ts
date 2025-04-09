import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product.interface';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductListService {
  private URL_API_GET: string = `${environment.API_URL_BASE}/api/products`;

  private productos: Product[] = [];
  
  constructor(private http: HttpClient) { }

  GetProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.URL_API_GET); 
  }

  GetProductById(id: string | number): Observable<Product> {
    return this.http.get<Product>(`${this.URL_API_GET}/get/${id}`);
  }


}
