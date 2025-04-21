import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product.interface';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ProductFilters } from '../interfaces/filter.interfaces';

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

  GetProductsPaginated(page: number, limit: number, filter: ProductFilters, order: string): Observable<Product[]> {    
    const params = this.getQuerySearchParams(filter, page, limit, order);

    return this.http.get<Product[]>(this.URL_API_GET_PAGINATED, { params }).pipe(
      map(products =>
        products.map(product => ({
          ...product,
          image_url: `${environment.API_URL_BASE}${product.image_url}`
        }))
      )
    );
  }

  getProductCount(filter: ProductFilters): Observable<number> {
    const params = this.getQuerySearchParams(filter);
    return this.http.get<{ count: number }>(`${this.URL_API_GET}/count`, { params }).pipe(
      map(res => res.count)
    );
  }

  private getQuerySearchParams(filters: ProductFilters, page?: number, limit?: number, order?: string) {
    const params: any = {};

    if(page) params.page = page.toString();
    if(limit) params.limit = limit.toString();

    if (filters?.minPrice !== undefined) {
      params.minPrice = filters.minPrice.toString();
    }
  
    if (filters?.maxPrice !== undefined) {
      params.maxPrice = filters.maxPrice.toString();
    }
  
    if (filters?.categories?.length) {
      params.categories = filters.categories.join(',');
    }

    if(order) params.sort = order;

    return params;
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
