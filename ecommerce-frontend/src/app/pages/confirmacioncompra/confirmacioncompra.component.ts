import { Component, AfterViewInit } from '@angular/core';
import { HeaderMenuComponent } from '../../core/components/shared/header-menu/header-menu.component';
import { Route } from '../../core/components/shared/Route/Route.component';
import { LogoComponent } from '../../core/components/shared/logo/logo.component';
import { CartbillComponent } from '../../core/components/cartbill/cartbill.component';
import { FooterComponent } from '../../core/components/shared/footer/footer.component';
import { InfopedidoComponent } from '../../core/components/infopedido/infopedido.component';
import { OrderService } from '../../core/services/order.service';
import { CartService } from '../../core/services/cart.service';
import { RawOrder } from '../../core/interfaces/order.interface';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../core/services/auth.service';

interface BoldCheckout {
  load: () => void;
}

declare global {
  interface Window {
    boldCheckout?: BoldCheckout;
  }
}
@Component({
  selector: 'app-confirmacioncompra',
  imports: [ HeaderMenuComponent,
    Route,
    LogoComponent,
    InfopedidoComponent,
    CartbillComponent,
    FooterComponent
  ],
  templateUrl: './confirmacioncompra.component.html',
  styleUrl: './confirmacioncompra.component.css'
})
export class ConfirmacioncompraComponent {

  order_key: string = '';
  constructor(private orderService: OrderService, private cartService: CartService, private authService: AuthService) { }


  ngAfterViewInit() {
    this.cargarBotonBold();
    console.log('Cargado');
    
  }
  

  async cargarBotonBold() {
    const cliente = this.orderService.getOrder();
    this.order_key = this.orderService.generateOrderUniqueKey();
    const TotalCost = this.cartService.getTotalCost().toString();
    const secretKey = 'h6zLQThK3fBAghlP8TWqEA';
  
    const container = document.getElementById('bold-button-container');
    if (!container) return;
  
    container.innerHTML = '';
  
    const oldBoldScript = document.querySelector('script[src="https://checkout.bold.co/library/boldPaymentButton.js"]');
    if (oldBoldScript) {
      oldBoldScript.remove();
    }

    const script = document.createElement('script');
    script.src = 'https://checkout.bold.co/library/boldPaymentButton.js';
    script.async = true;
    script.onload = () => {
      console.log('Script BOLD cargado y listo');
    };
    document.head.appendChild(script);
  
    const boton = document.createElement('script');
    boton.setAttribute('data-bold-button', 'dark-L');
    boton.setAttribute('data-api-key', 'dxzLd_YF_InRvzQTh2UIYl-C8eRsZM9wT1Wvb58Ycgs');
    boton.setAttribute('data-integrity-signature', await this.generateHash(`${this.order_key}${TotalCost}COP${secretKey}`));
    boton.setAttribute('data-amount', TotalCost);
    boton.setAttribute('data-order-id', this.order_key);
    boton.setAttribute('data-currency', 'COP');
    boton.setAttribute('data-customer-data', this.userDataFormatted(cliente));
    boton.setAttribute('data-description', 'Compra en JoryanBags\nBolso 1\nBolso 2');
    boton.setAttribute('data-redirection-url', `${environment.URL_APP}/payment-result/`);
    container.appendChild(boton);
  
  }

  crearPedido() {
    const idUser = this.authService.getUserIdFromToken();
    if(idUser) {
      this.orderService.createOrder(idUser, this.order_key, this.orderService.getOrder().cedula, this.cartService.getCart()).subscribe();
      this.cartService.clearCart();
    }    
  }

  private userDataFormatted(data: RawOrder) {
    const userInfo = {
      email: data.email,
      fullName: data.nombreCompleto,
      phone: data.telefono,
      dialCode: '+57',
      documentNumber: data.cedula,
      documentType: 'CC'
    };
    return JSON.stringify(userInfo);
  }

  async generateHash(cadena: string) {  
    const encodedText = new TextEncoder().encode(cadena);
    
    const hashBuffer = await crypto.subtle.digest('SHA-256', encodedText);
      
    const hashArray = Array.from(new Uint8Array(hashBuffer));
       
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
   
    return hashHex;
  }
  
  
}
