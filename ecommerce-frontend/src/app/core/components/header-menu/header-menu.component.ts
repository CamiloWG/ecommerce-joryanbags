import { Component, ViewEncapsulation, HostBinding } from "@angular/core";
import { Router } from "@angular/router";
import { Search } from "../Search/Search.component";
import { BuildingBlocksSegmentedButt } from "../BuildingBlocksSegmentedButt/BuildingBlocksSegmentedButt.component";

@Component({
  selector: 'header-menu',
  imports: [
    Search,
    BuildingBlocksSegmentedButt],
  templateUrl: './header-menu.component.html',
  styleUrl: './header-menu.component.scss'
})
export class HeaderMenuComponent {
  @HostBinding("style.display") display = "contents";

  constructor(private router: Router) {}

  onHomeIconClick() {
    this.router.navigate(["/inicio"]);
  }

  onUserIconClick() {
    // Please sync "Login" to the project
  }

  onShoppingCartIconClick() {
    // Please sync "Carrito" to the project
  }
}
