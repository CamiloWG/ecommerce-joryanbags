import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderMenuComponent } from '../../core/components/shared/header-menu/header-menu.component';
import { Route } from '../../core/components/shared/Route/Route.component';
import { LogoComponent } from '../../core/components/shared/logo/logo.component';
import { ButtonComponent } from '../../core/components/button/button.component';
import { FooterComponent } from '../../core/components/shared/footer/footer.component';


@Component({
  selector: 'app-login',
  imports: [
    HeaderMenuComponent, 
    Route, 
    LogoComponent,
    FooterComponent,
    ButtonComponent,
    RouterModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  onLogin(): void {
  }

}  