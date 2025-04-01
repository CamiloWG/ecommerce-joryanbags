import { Injectable } from '@angular/core';
import { Product, ProductInCart } from '../interfaces/product.interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  
  private cart = new BehaviorSubject<ProductInCart[]>([]);
  cart$ = this.cart.asObservable();

  constructor() {}

  
  addToCart(product: Product, cantidad: number = 1) {
    let currentCart = this.cart.getValue();
    let existingProduct = currentCart.find((p) => p.product_id === product.product_id);

    if (existingProduct) {
      existingProduct.quantity += cantidad; 
    } else {
      currentCart.push({ ...product, quantity: cantidad });
    }

    this.cart.next([...currentCart]);
  }

  
  getCart() {
    return this.cart.getValue();
  }

  
  clearCart() {
    this.cart.next([]);
  }

  
  removeFromCart(productId: number) {
    let updatedCart = this.cart.getValue().filter((p) => p.product_id !== productId);
    this.cart.next(updatedCart);
  }
}
