import { Component, ViewEncapsulation, HostBinding } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "portada",
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [],
  templateUrl: "./portada.component.html",
})
export class Portada {
  @HostBinding("style.display") display = "contents";

  constructor(private router: Router) { }

  onButtonShopClick() {
    this.router.navigate(['/catalogo']);
  }
}
