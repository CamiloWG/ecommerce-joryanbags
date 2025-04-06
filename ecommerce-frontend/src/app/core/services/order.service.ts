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
}
