import { Injectable } from '@angular/core';
import { Product, ProductInCart } from '../interfaces/product.interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cart = new BehaviorSubject<ProductInCart[]>([]);
  private SHIPMENT_COST: number = 18000;
  private CART_KEY: string = 'JY_CART';

  cart$ = this.cart.asObservable();

  constructor() {
    this.loadCartFromLocalStorage();
    this.cart$.subscribe(() => this.updateLocalCart());
  }

  
  addToCart(product: Product | ProductInCart, cantidad: number = 1) {
    let currentCart = this.cart.getValue();
    let existingProduct = currentCart.find((p) => p.product_id === product.product_id);

    if (existingProduct) {
      existingProduct.quantity += cantidad;
      if(existingProduct.quantity <= 0) return this.removeFromCart(product.product_id);
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

  getShipmentCost(): number {
    return this.SHIPMENT_COST;
  }

  getTotalCost(): number {
    const monto = this.cart.value.reduce((acc, item) => acc + item.price * item.quantity, 0);
    return monto + this.SHIPMENT_COST;
  }

  
  removeFromCart(productId: number) {
    let updatedCart = this.cart.getValue().filter((p) => p.product_id !== productId);
    this.cart.next(updatedCart);    
  }

  private updateLocalCart(): void {
    localStorage.setItem(this.CART_KEY, JSON.stringify(this.cart.getValue()));
  }

  private loadCartFromLocalStorage(): void {
    const savedCart = localStorage.getItem(this.CART_KEY);
    if (savedCart) {
      try {
        const parsedCart: ProductInCart[] = JSON.parse(savedCart);
        this.cart.next(parsedCart);
      } catch (error) {
        console.error('Error parsing cart from localStorage:', error);
        localStorage.removeItem(this.CART_KEY);
      }
    }
  }
  
}
