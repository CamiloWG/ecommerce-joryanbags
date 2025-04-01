import { Component } from '@angular/core';
import { HeaderMenuComponent } from '../../core/components/shared/header-menu/header-menu.component';
import { Route } from '../../core/components/shared/Route/Route.component';
import { LogoComponent } from '../../core/components/shared/logo/logo.component';
import { CartproductComponent } from '../../core/components/cartproduct/cartproduct.component';
import { CartbillComponent } from '../../core/components/cartbill/cartbill.component';
import { FooterComponent } from '../../core/components/shared/footer/footer.component';
import { CartService } from '../../core/services/cart.service';
import { ProductInCart } from '../../core/interfaces/product.interface';

@Component({
  selector: 'app-carrito',
  imports: [ HeaderMenuComponent,
    Route,
    LogoComponent,
    CartproductComponent,
    CartbillComponent,
    FooterComponent
  ],
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.css'
})
export class CarritoComponent {
  totalProductos: ProductInCart[] = [];

  constructor(private cartService: CartService) {
    this.cartService.cart$.subscribe(productos => {
      this.totalProductos = productos;
    });
  }


  onDeleteProduct(product: ProductInCart) {    
    this.cartService.removeFromCart(product.product_id);
  }

}
