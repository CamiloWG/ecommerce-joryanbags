import {
  Component,
  ViewEncapsulation,
  HostBinding,
  Input,
} from "@angular/core";

import { CommonModule } from "@angular/common";
@Component({
  selector: "menu-separator",
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [CommonModule],
  templateUrl: "./MenuSeparator.component.html",
})
export class MenuSeparator {
  @HostBinding("style.display") display = "contents";

  constructor() {}

  /** Style props */
  @Input() menuSeparatorBorderRadius: string | number = "";

  get menuSeparatorStyle() {
    return {
      "border-radius": this.menuSeparatorBorderRadius,
    };
  }
}
