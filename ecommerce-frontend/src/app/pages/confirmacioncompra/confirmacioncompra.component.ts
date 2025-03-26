import { Component } from '@angular/core';
import { HeaderMenuComponent } from '../../core/components/shared/header-menu/header-menu.component';
import { Route } from '../../core/components/shared/Route/Route.component';
import { LogoComponent } from '../../core/components/shared/logo/logo.component';
import { CartbillComponent } from '../../core/components/cartbill/cartbill.component';
import { FooterComponent } from '../../core/components/shared/footer/footer.component';
import { InfopedidoComponent } from '../../core/components/infopedido/infopedido.component';

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

}
