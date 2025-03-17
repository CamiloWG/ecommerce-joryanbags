import {
  Component,
  ViewEncapsulation,
  HostBinding,
  Input,
} from "@angular/core";

@Component({
  selector: "search",
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [],
  templateUrl: "./Search.component.html",
})
export class Search {
  @HostBinding("style.display") display = "contents";

  constructor() {}

  /** Value props */
  @Input() x: string = "";
  /** Variant props */
  @Input() state: string = "Default";
  @Input() valueType: string = "Default";
}
