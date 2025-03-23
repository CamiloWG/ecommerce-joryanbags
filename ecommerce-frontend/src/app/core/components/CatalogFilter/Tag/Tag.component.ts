import {
  Component,
  ViewEncapsulation,
  HostBinding,
  Input,
} from "@angular/core";

import { CommonModule } from "@angular/common";
@Component({
  selector: "tag",
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [CommonModule],
  templateUrl: "./Tag.component.html",
})
export class Tag {
  @HostBinding("style.display") display = "contents";

  constructor() {}

  /** Value props */
  @Input() label: string = "Spring";
  @Input() removable: boolean = true;
  /** Variant props */
  @Input() scheme: string = "Brand";
  @Input() state: string = "Default";
  @Input() variant: string = "Primary";
}
