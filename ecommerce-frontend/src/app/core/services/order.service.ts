import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { RawOrder } from '../interfaces/order.interface';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private currentOrder = new BehaviorSubject<RawOrder>({} as RawOrder);

  constructor() { }

  setOrder(order: RawOrder): void {
    this.currentOrder.next(order);
  }

  getOrder(): RawOrder {
    return this.currentOrder.getValue();
  }

  saveOrderLocal(): string {
    const date = new Date();
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    const datePart = `${yyyy}${mm}${dd}`;

    const code = Math.floor(Math.random() * 0xFFFFF).toString(16).toUpperCase().padStart(5, '0');

    const key = `ORD-${datePart}-${code}`;
    localStorage.setItem(key, this.getOrder().toString());
    return key;
  }
}
