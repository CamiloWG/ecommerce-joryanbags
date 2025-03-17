import { Component, ViewEncapsulation, HostBinding } from "@angular/core";

@Component({
  selector: "portada",
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [],
  templateUrl: "./portada.component.html",
})
export class Portada {
  @HostBinding("style.display") display = "contents";

  constructor() {}
}
