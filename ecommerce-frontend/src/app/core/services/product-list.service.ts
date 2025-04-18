import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product.interface';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductListService {
  private URL_API_GET: string = `${environment.API_URL_BASE}/api/products`;  
  private URL_API_GET_PAGINATED: string = `${environment.API_URL_BASE}/api/products/paginated`;
  private URL_API_UPDATE: string = `${environment.API_URL_BASE}/api/products/update`;
  private URL_API_CREATE: string = `${environment.API_URL_BASE}/api/products/create`;

  private productos: Product[] = [];
  
  constructor(private http: HttpClient) { }

  GetProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.URL_API_GET).pipe(
      map(products => 
        products.map(product => ({
          ...product,
          image_url: `${environment.API_URL_BASE}${product.image_url}`
        }))
      )
    );
  }

  GetProductsPaginated(page: number, limit: number): Observable<Product[]> {    
    const params = {
      page: page.toString(),
      limit: limit.toString()
    };
    return this.http.get<Product[]>(this.URL_API_GET_PAGINATED, { params }).pipe(
      map(products =>
        products.map(product => ({
          ...product,
          image_url: `${environment.API_URL_BASE}${product.image_url}`
        }))
      )
    );
  }

  getProductCount(): Observable<number> {
    return this.http.get<{ count: number }>(`${this.URL_API_GET}/count`).pipe(
      map(res => res.count)
    );
  }

  GetProductById(id: string | number): Observable<Product> {
    return this.http.get<Product>(`${this.URL_API_GET}/get/${id}`).pipe(
      map(product => ({
        ...product,
        image_url: `${environment.API_URL_BASE}${product.image_url}`
      }))
    );
  }


  UpdateProduct(product: Product): Observable<Product> {
    return this.http.patch<Product>(this.URL_API_UPDATE, product);
  }

  CreateProduct(product: FormData): Observable<Product> {
    return this.http.post<Product>(this.URL_API_CREATE, product);
  }

}
