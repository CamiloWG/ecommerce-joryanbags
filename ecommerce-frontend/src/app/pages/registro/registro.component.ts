import { Component } from '@angular/core';
import { HeaderMenuComponent } from '../../core/components/shared/header-menu/header-menu.component';
import { Route } from '../../core/components/shared/Route/Route.component';
import { LogoComponent } from '../../core/components/shared/logo/logo.component';
import { FooterComponent } from '../../core/components/shared/footer/footer.component';
import { ButtonComponent } from '../../core/components/button/button.component';

@Component({
  selector: 'app-registro',
  imports: [
    HeaderMenuComponent,
    Route,
    LogoComponent,
    FooterComponent,
    ButtonComponent,
  ],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {
  onRegistro(): void {
  }
}
