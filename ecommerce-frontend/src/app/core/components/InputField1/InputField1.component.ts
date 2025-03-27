import {
  Component,
  ViewEncapsulation,
  HostBinding,
  Input,
} from "@angular/core";

import { CommonModule } from "@angular/common";
@Component({
  selector: "input-field1",
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [CommonModule],
  templateUrl: "./InputField1.component.html",
})
export class InputField1 {
  @HostBinding("style.display") display = "contents";

  constructor() {}

  /** Value props */
  @Input() description: string = "Description";
  @Input() hasDescription: boolean = false;
  @Input() error: string = "Error";
  @Input() hasLabel: boolean = true;
  @Input() label: string = "Nombre";
  @Input() hasError: boolean = false;
  @Input() placeholder: string = "";
  /** Variant props */
  @Input() state: string = "Default";
  @Input() valueType: string = "Placeholder";
  /** Style props */
  @Input() inputFieldHeight: string | number = "";
  @Input() valueBorder: string | number = "";
  @Input() valueOutline: string | number = "";
  @Input() valueBackgroundColor: string | number = "";
  @Input() valueDisplay: string | number = "";

  get inputFieldStyle() {
    return {
      height: this.inputFieldHeight,
    };
  }

  get valueStyle() {
    return {
      border: this.valueBorder,
      outline: this.valueOutline,
      "background-color": this.valueBackgroundColor,
      display: this.valueDisplay,
    };
  }
}
