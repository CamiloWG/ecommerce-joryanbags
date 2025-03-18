import {
  Component,
  ViewEncapsulation,
  HostBinding,
  Input,
} from "@angular/core";

import { CommonModule } from "@angular/common";
@Component({
  selector: "menu-item",
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [CommonModule],
  templateUrl: "./MenuItem.component.html",
})
export class MenuItem {
  @HostBinding("style.display") display = "contents";

  constructor() {}

  /** Value props */
  @Input() hasShortcut: boolean = false;
  @Input() hasIcon: boolean = false;
  @Input() hasImage: boolean = false;
  @Input() label: string = "Menu Label";
  @Input() hasDescription: boolean = true;
  @Input() description: string = "Menu description.";
  /** Variant props */
  @Input() state: string = "Default";
  /** Style props */
  @Input() menuItemAlignSelf: string | number = "";
  @Input() menuItemWidth: string | number = "";
  
  @Input() image: string = "";
  @Input() imageIconOverflow: string | number = "";

  get menuItemStyle() {
    return {
      "align-self": this.menuItemAlignSelf,
      width: this.menuItemWidth,
    };
  }

  get imageIconStyle() {
    return {
      overflow: this.imageIconOverflow,
    };
  }
}
