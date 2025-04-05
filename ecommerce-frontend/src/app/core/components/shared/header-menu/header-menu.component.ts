import { Component, ViewEncapsulation, HostBinding } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../../../services/auth.service";

@Component({
  selector: 'header-menu',
  imports: [],
  templateUrl: './header-menu.component.html',
  styleUrl: './header-menu.component.scss'
})
export class HeaderMenuComponent {
  @HostBinding("style.display") display = "contents";

  constructor(private router: Router, private authService: AuthService) {}

  onHomeIconClick() {
    this.router.navigate(["/"]);
  }

  onUserIconClick() {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/usuario']);
    } else {
      this.router.navigate(['/login']);
    }
  }

  onShoppingCartIconClick() {
    this.router.navigate(['/carrito']);
  }
}
