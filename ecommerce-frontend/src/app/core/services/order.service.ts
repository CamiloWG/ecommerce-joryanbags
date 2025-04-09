import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { RawOrder } from '../interfaces/order.interface';
import { environment } from '../../../environments/environment';
import { ProductInCart } from '../interfaces/product.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  
  private API_URL_CREATE_ORDER: string = `${environment.API_URL_BASE}/api/orders/create`;

  private currentOrder = new BehaviorSubject<RawOrder>({} as RawOrder);

  constructor(private http: HttpClient) { }

  setOrder(order: RawOrder): void {
    this.currentOrder.next(order);
  }

  getOrder(): RawOrder {
    return this.currentOrder.getValue();
  }

  generateOrderUniqueKey(): string {
    const date = new Date();
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    const datePart = `${yyyy}${mm}${dd}`;

    const code = Math.floor(Math.random() * 0xFFFFF).toString(16).toUpperCase().padStart(5, '0');

    const key = `ORD-${datePart}-${code}`;
    return key;
  }

  createOrder(userId: string, orderKey: string, detalles: string, carrito: ProductInCart[]): Observable<any> {
    const bodyUpdated = {
      user_id: userId,
      payment_id: orderKey,
      detalles: `C.C${detalles}`,
      cart: carrito.map(producto => ({
        product_id: producto.product_id,
        quantity: producto.quantity
      }))
    }
    return this.http.post(this.API_URL_CREATE_ORDER, bodyUpdated); 
  }
}
