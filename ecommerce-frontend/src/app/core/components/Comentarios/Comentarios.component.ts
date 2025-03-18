import { Component, ViewEncapsulation, HostBinding } from "@angular/core";

import { CustomerQuote } from "./CustomerQuote/CustomerQuote.component";
@Component({
  selector: "comentarios",
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [CustomerQuote],
  templateUrl: "./Comentarios.component.html",
})
export class Comentarios {
  @HostBinding("style.display") display = "contents";

  constructor() {}
}
