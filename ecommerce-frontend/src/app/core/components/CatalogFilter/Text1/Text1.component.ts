import {
  Component,
  ViewEncapsulation,
  HostBinding,
  Input,
} from "@angular/core";

import { CommonModule } from "@angular/common";
@Component({
  selector: "text1",
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [CommonModule],
  templateUrl: "./Text1.component.html",
})
export class Text1 {
  @HostBinding("style.display") display = "contents";

  constructor() {}

  /** Value props */
  @Input() text: string = "Keywords";
  /** Style props */
  @Input() textAlignSelf: string | number = "";
  @Input() textFlex: string | number = "";

  get textStyle() {
    return {
      "align-self": this.textAlignSelf,
    };
  }

  get text1Style() {
    return {
      flex: this.textFlex,
    };
  }
}
