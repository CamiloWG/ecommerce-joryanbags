import { Component, ViewEncapsulation, HostBinding } from "@angular/core";

import { Router } from "@angular/router";
@Component({
  selector: "route",
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [],
  templateUrl: "./Route.component.html",
})
export class Route {
  @HostBinding("style.display") display = "contents";

  constructor(private router: Router) {}

  onSupportingTextClick() {
    const anchor = document.querySelector(
      "[data-scroll-to='pageProductResults']"
    );
    if (anchor) {
      anchor.scrollIntoView({ block: "start", behavior: "smooth" });
    }
  }

  onHomeIconClick() {
    this.router.navigate(["/inicio"]);
  }
}
