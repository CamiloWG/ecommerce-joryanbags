import { Component } from '@angular/core';
import { HeaderMenuComponent } from '../../core/components/shared/header-menu/header-menu.component';
import { LogoComponent } from '../../core/components/shared/logo/logo.component';
import { Route } from '../../core/components/shared/Route/Route.component';
import { FooterComponent } from '../../core/components/shared/footer/footer.component';
import { PedidoComponent } from '../../core/components/pedido/pedido.component';

@Component({
  selector: 'app-usuario',
  imports: [
    HeaderMenuComponent,
    LogoComponent,
    Route,
    PedidoComponent,
    FooterComponent,
  ],
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.css'
})
export class UsuarioComponent {

}
