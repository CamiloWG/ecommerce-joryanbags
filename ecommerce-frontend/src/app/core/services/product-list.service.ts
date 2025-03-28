import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductListService {
  private URL_API_GET: string = "http://localhost:4000/api/products"
  
  constructor(private http: HttpClient) { }

  GetProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.URL_API_GET); 
  }
}
