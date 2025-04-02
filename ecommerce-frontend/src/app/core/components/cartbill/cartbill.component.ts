import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ProductInCart } from '../../interfaces/product.interface';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cartbill',
  imports: [
    CommonModule
  ],
  templateUrl: './cartbill.component.html',
  styleUrl: './cartbill.component.css'
})
export class CartbillComponent {
  @Input() title: string = 'Mi carro de compras';
  @Input() buttonText: string = 'Checkout';
  @Input() showButton: boolean = true;
  @Input() rutaBttn: string = '';

  productos: ProductInCart[] = [];
  costoEnvio: number = 18000;
  costoTotal: number = 0;

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit() {
    this.cartService.cart$.subscribe(carrito => {
      this.productos = carrito;
      this.updateBill();
    });
  }


  updateBill() {
    let total: number = this.costoEnvio;
    this.productos.forEach(producto => {
      total += (producto.price * producto.quantity);
    });
    this.costoTotal = total;
  }

  onButtonClick() {
    this.router.navigate([this.rutaBttn]);
  }


}
