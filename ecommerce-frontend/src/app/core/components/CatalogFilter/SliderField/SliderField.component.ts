import {
  Component,
  ViewEncapsulation,
  HostBinding,
  Input,
} from "@angular/core";

import { CommonModule } from "@angular/common";
@Component({
  selector: "slider-field",
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [CommonModule],
  templateUrl: "./SliderField.component.html",
})
export class SliderField {
  @HostBinding("style.display") display = "contents";

  constructor() {}

  /** Value props */
  @Input() description: string = "Description";
  @Input() label: string = "Label";
  @Input() hasLabel: boolean = true;
  @Input() hasDescription: boolean = false;
  /** Variant props */
  @Input() state: string = "Default";
}
