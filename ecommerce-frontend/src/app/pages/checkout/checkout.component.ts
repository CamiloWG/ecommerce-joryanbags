import { Component } from '@angular/core';
import { HeaderMenuComponent } from '../../core/components/shared/header-menu/header-menu.component';
import { Route } from '../../core/components/shared/Route/Route.component';
import { LogoComponent } from '../../core/components/shared/logo/logo.component';
import { CartbillComponent } from '../../core/components/cartbill/cartbill.component';
import { FooterComponent } from '../../core/components/shared/footer/footer.component';
import { InfopedidoComponent } from '../../core/components/infopedido/infopedido.component';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-checkout',
  imports: [ HeaderMenuComponent,
    Route,
    LogoComponent,
    InfopedidoComponent,
    CartbillComponent,
    FooterComponent
  ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {
  precioTotal: number;
  constructor(private cartService: CartService) {
    this.precioTotal = cartService.getTotalCost();
  }
}
