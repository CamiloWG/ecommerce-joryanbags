import {
  Component,
  ViewEncapsulation,
  HostBinding,
  Input,
} from "@angular/core";

import { CommonModule } from "@angular/common";
@Component({
  selector: "checkbox-field",
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [CommonModule],
  templateUrl: "./CheckboxField.component.html",
})
export class CheckboxField {
  @HostBinding("style.display") display = "contents";

  constructor() {}

  /** Value props */
  @Input() hasDescription: boolean = true;
  @Input() description: string = "Description";
  @Input() label: string = "Label";
  /** Variant props */
  @Input() state: string = "Default";
  @Input() valueType: string = "Checked";
  /** Style props */
  @Input() descriptionRowAlignSelf: string | number = "";
  @Input() descriptionRowWidth: string | number = "";

  get descriptionRowStyle() {
    return {
      "align-self": this.descriptionRowAlignSelf,
      width: this.descriptionRowWidth,
    };
  }
}
