import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { HeaderMenuComponent } from '../../core/components/shared/header-menu/header-menu.component';
import { Route } from '../../core/components/shared/Route/Route.component';
import { LogoComponent } from '../../core/components/shared/logo/logo.component';
import { Search } from "../../core/components/Search/Search.component";
import { BuildingBlocksSegmentedButt } from "../../core/components/BuildingBlocksSegmentedButt/BuildingBlocksSegmentedButt.component";
import { Component1 } from "../../core/components/Component1/Component1.component";
import { ButtonGroup } from "../../core/components/ButtonGroup/ButtonGroup.component";
import { InputField1 } from "../../core/components/InputField1/InputField1.component";


@Component({
  selector: 'app-login',
  imports: [
    HeaderMenuComponent, 
    Route, 
    LogoComponent,
    Search,
    BuildingBlocksSegmentedButt,
    Component1,
    ButtonGroup,
    InputField1,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private router: Router) {}
  
  onButtonGroupContainerClick() {
    this.router.navigate(["/registrousaurio"]);
  }

  onHomeIconClick() {
    this.router.navigate(["/home"]);
  }

  onUserIconClick() {
    const anchor = document.querySelector("[data-scroll-to='formContact']");
    if (anchor) {
      anchor.scrollIntoView({ block: "start", behavior: "smooth" });
    }
  }

  onShoppingCartIconClick() {
    this.router.navigate(["/carrito"]);
  }

  onButtonGroupClick() {
    this.router.navigate(["/pagina-de-usuario"]);
  }

  irARegistro() {
    this.router.navigate(["/registrousaurio"]);
  }
}  

