import {
  Component,
  ViewEncapsulation,
  HostBinding,
  Input,
} from "@angular/core";

import { CommonModule } from "@angular/common";
@Component({
  selector: "button1",
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [CommonModule],
  templateUrl: "./Button1.component.html",
})
export class Button1 {
  @HostBinding("style.display") display = "contents";

  constructor() {}

  /** Value props */
  @Input() hasIconEnd: boolean = false;
  @Input() hasIconStart: boolean = false;
  @Input() label: string = "Ver compra";
  @Input() star: string = "";
  @Input() x: string = "";
  /** Variant props */
  @Input() size: string = "Medium";
  @Input() state: string = "Default";
  @Input() variant: "Primary" | "Subtle" | "Neutral" = "Primary";
  /** Style props */
  @Input() buttonWidth: string | number = "";
  @Input() buttonPosition: string | number = "";
  @Input() buttonTop: string | number = "";
  @Input() buttonLeft: string | number = "";
  @Input() buttonFlex: string | number = "";

  get buttonStyle() {
    return {
      width: this.buttonWidth,
      position: this.buttonPosition,
      top: this.buttonTop,
      left: this.buttonLeft,
      flex: this.buttonFlex,
    };
  }
}
