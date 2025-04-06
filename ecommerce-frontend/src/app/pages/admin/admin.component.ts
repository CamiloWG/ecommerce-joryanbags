import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { HeaderMenuComponent } from '../../core/components/shared/header-menu/header-menu.component';
import { Route } from '../../core/components/shared/Route/Route.component';
import { LogoComponent } from '../../core/components/shared/logo/logo.component';
import { FooterComponent } from '../../core/components/shared/footer/footer.component';

@Component({
  selector: 'app-admin',
  imports: [
       HeaderMenuComponent, 
        Route, 
        LogoComponent,
        FooterComponent  
  ],

  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

  constructor(private router: Router) {}

  onHomeIconClick() {
    this.router.navigate(["/inicio"]);
  }

  onUserIconClick() {
    this.router.navigate(["/"]);
  }

  onShoppingCartIconClick() {
    this.router.navigate(["/carrito"]);
  }
}


