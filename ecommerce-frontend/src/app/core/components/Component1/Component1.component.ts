import { Component, ViewEncapsulation, HostBinding } from "@angular/core";

@Component({
  selector: "component1",
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [],
  templateUrl: "./Component1.component.html",
})
export class Component1 {
  @HostBinding("style.display") display = "contents";

  constructor() {}
}
