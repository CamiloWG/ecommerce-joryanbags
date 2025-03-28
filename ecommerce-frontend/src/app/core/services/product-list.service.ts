import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductListService {
  URL_API_GET: string = "http://localhost:4000/api/products"
  
  constructor(private http: HttpClient) { }

  async GetProducts(): Promise<Product[]> {
    let productos: Product[] = [];
    this.http.get<Product[]>(this.URL_API_GET).subscribe(products => {
      productos = products;
    })
    return productos;
  }
}
