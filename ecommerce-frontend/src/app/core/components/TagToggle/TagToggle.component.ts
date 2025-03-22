import {
  Component,
  ViewEncapsulation,
  HostBinding,
  Input,
} from "@angular/core";

import { CommonModule } from "@angular/common";
@Component({
  selector: "tag-toggle",
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [CommonModule],
  templateUrl: "./TagToggle.component.html",
})
export class TagToggle {
  @HostBinding("style.display") display = "contents";

  constructor() {}

  /** Value props */
  @Input() label: string = "New";
  @Input() showIcon: boolean = true;
  /** Variant props */
  @Input() state: string = "On";
}
