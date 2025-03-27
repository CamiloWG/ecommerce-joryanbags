import {
  Component,
  ViewEncapsulation,
  HostBinding,
  Input,
} from "@angular/core";

import { CommonModule } from "@angular/common";
import { Button1 } from "../Button1/Button1.component";

@Component({
  selector: "button-group",
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [CommonModule, Button1],
  templateUrl: "./ButtonGroup.component.html",
})
export class ButtonGroup {
  @HostBinding("style.display") display = "contents";

  constructor() {}

  /** Value props */
  @Input() buttonEnd: boolean = false;
  @Input() buttonStart: boolean = false;
  /** Variant props */
  @Input() align: "Start" | "Justify" = "Start";
  /** Style props */
  @Input() buttonGroupWidth: string | number = "";
  /** Action props */
  @Input() onButtonGroupContainerClick: () => void = () => {};

  get buttonGroupStyle() {
    return {
      width: this.buttonGroupWidth,
    };
  }
}
