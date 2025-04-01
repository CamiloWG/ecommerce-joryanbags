import {
  Component,
  ViewEncapsulation,
  HostBinding,
  Input,
} from "@angular/core";

import { CommonModule } from "@angular/common";
@Component({
  selector: "search",
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [CommonModule],
  templateUrl: "./Search.component.html",
})
export class Search {
  @HostBinding("style.display") display = "contents";

  constructor() {}

  /** Value props */
  @Input() x: string = "";
  @Input() placeholder: string = "";
  /** Variant props */
  @Input() state: string = "Default";
  @Input() valueType: string = "Default";
  /** Style props */
  @Input() searchTop: string | number = "";
  @Input() searchLeft: string | number = "";
  @Input() valueWidth: string | number = "";
  @Input() valueBorder: string | number = "";
  @Input() valueOutline: string | number = "";
  @Input() valueBackgroundColor: string | number = "";
  @Input() valueDisplay: string | number = "";

  get searchStyle() {
    return {
      top: this.searchTop,
      left: this.searchLeft,
    };
  }

  get value1Style() {
    return {
      width: this.valueWidth,
      border: this.valueBorder,
      outline: this.valueOutline,
      "background-color": this.valueBackgroundColor,
      display: this.valueDisplay,
    };
  }
}
