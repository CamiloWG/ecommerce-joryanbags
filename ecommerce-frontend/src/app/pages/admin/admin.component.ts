import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { HeaderMenuComponent } from '../../core/components/shared/header-menu/header-menu.component';
import { Route } from '../../core/components/shared/Route/Route.component';
import { LogoComponent } from '../../core/components/shared/logo/logo.component';
import { ResumenComponent } from '../../core/components/adminresumen/adminresumen.component';
import { ContenidoResumenComponent } from '../../core/components/admincontenido/admincontenido.component';
import { AdminventasComponent } from '../../core/components/adminventas/adminventas.component';
import { FooterComponent } from '../../core/components/shared/footer/footer.component';
import { OrderService } from '../../core/services/order.service';
import { Earning } from '../../core/interfaces/order.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin',
  imports: [
      HeaderMenuComponent, 
      Route, 
      LogoComponent,
      ResumenComponent,
      ContenidoResumenComponent,
      AdminventasComponent,
      FooterComponent,
      CommonModule
  ],

  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

  earnings!: Earning;


  constructor(private router: Router, private orderService: OrderService) {
    orderService.getEarnings().subscribe(data => this.earnings = data);
  }

  resumenActivo: 'ordenes' | 'stock' = 'ordenes';

  actualizarResumen(tipo: 'ordenes' | 'stock') {
    this.resumenActivo = tipo;
  }

}


