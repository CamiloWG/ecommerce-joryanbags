import { Component } from '@angular/core';
import { HeaderMenuComponent } from '../../core/components/shared/header-menu/header-menu.component';
import { Route } from '../../core/components/shared/Route/Route.component';
import { LogoComponent } from '../../core/components/shared/logo/logo.component';
import { FooterComponent } from '../../core/components/shared/footer/footer.component';
import { InfoUsuarioComponent } from '../../core/components/infousuario/info-usuario.component';
import { ButtonComponent } from '../../core/components/button/button.component';

@Component({
  selector: 'app-registrousuario',
  imports: [
    HeaderMenuComponent,
    Route,
    LogoComponent,
    FooterComponent,
    InfoUsuarioComponent,
    ButtonComponent,
  ],
  templateUrl: './registrousuario.component.html',
  styleUrl: './registrousuario.component.css'
})
export class RegistrousuarioComponent {
}
