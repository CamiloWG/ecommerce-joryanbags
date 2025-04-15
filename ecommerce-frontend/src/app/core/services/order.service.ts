import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Earning, Order, OrderDetails, RawOrder } from '../interfaces/order.interface';
import { environment } from '../../../environments/environment';
import { ProductInCart } from '../interfaces/product.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  
  private API_URL_CREATE_ORDER: string = `${environment.API_URL_BASE}/api/orders/create`;
  private API_URL_GET_USER_ORDERS: string = `${environment.API_URL_BASE}/api/orders/user`;
  private API_URL_GET_ORDER_DETAILS: string = `${environment.API_URL_BASE}/api/orders/detail`;
  private API_URL_GET_ALL_ORDERS: string = `${environment.API_URL_BASE}/api/orders`;
  private API_URL_UPDATE_ORDER_STATUS: string = `${environment.API_URL_BASE}/api/orders/update-status`;
  private API_URL_GET_EARNINGS: string = `${environment.API_URL_BASE}/api/orders/earnings`;

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
      detalles: `CC ${detalles}`,
      cart: carrito.map(producto => ({
        product_id: producto.product_id,
        quantity: producto.quantity
      }))
    }
    return this.http.post(this.API_URL_CREATE_ORDER, bodyUpdated); 
  }


  getAllUserOrders(user_id: string | number): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.API_URL_GET_USER_ORDERS}/${user_id}`);
  }

  getAllOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.API_URL_GET_ALL_ORDERS);
  }

  getOrderDetails(order_id: string | number): Observable<OrderDetails[]> {
    return this.http.get<OrderDetails[]>(`${this.API_URL_GET_ORDER_DETAILS}/${order_id}`);
  }

  updateOrderStatus(order_id: string | number, status: number): Observable<Order[]> {
    const body: any = {order_id, status};
    return this.http.post<Order[]>(this.API_URL_UPDATE_ORDER_STATUS, body);
  }

  getEarnings(): Observable<Earning> {
    return this.http.get<Earning>(this.API_URL_GET_EARNINGS);
  }
}
