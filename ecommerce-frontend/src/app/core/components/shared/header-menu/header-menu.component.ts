import { Component, ViewEncapsulation, HostBinding } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: 'header-menu',
  imports: [],
  templateUrl: './header-menu.component.html',
  styleUrl: './header-menu.component.scss'
})
export class HeaderMenuComponent {
  @HostBinding("style.display") display = "contents";

  constructor(private router: Router) {}

  onHomeIconClick() {
    this.router.navigate(["/"]);
  }

  onUserIconClick() {
    // Please sync "Login" to the project
  }

  onShoppingCartIconClick() {
    this.router.navigate(['/carrito']);
  }
}
