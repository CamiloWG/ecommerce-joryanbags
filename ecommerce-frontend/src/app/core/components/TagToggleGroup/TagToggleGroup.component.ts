import { Component, ViewEncapsulation, HostBinding } from "@angular/core";

import { TagToggle } from "../TagToggle/TagToggle.component";
@Component({
  selector: "tag-toggle-group",
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [TagToggle],
  templateUrl: "./TagToggleGroup.component.html",
})
export class TagToggleGroup {
  @HostBinding("style.display") display = "contents";

  constructor() {}
}
