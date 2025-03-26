import { CommonModule } from "@angular/common";
import { Component, Input, ViewEncapsulation, HostBinding } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "route",
  imports:[CommonModule],
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  templateUrl: "./Route.component.html",
})
export class Route {
  @HostBinding("style.display") display = "contents";

  @Input() breadcrumbs: { label: string; url?: string }[] = [];

  constructor(private router: Router) {}

  navigateTo(url?: string) {
    if (url) {
      this.router.navigate([url]);
    }
  }

  onHomeIconClick() {
    this.router.navigate(["/inicio"]);
  }
}
