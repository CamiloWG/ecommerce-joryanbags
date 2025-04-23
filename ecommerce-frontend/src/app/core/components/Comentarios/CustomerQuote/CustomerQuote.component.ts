import {
  Component,
  ViewEncapsulation,
  HostBinding,
  Input,
} from "@angular/core";

import { CommonModule } from "@angular/common";
@Component({
  selector: "customer-quote",
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [CommonModule],
  templateUrl: "./CustomerQuote.component.html",
})
export class CustomerQuote {
  @HostBinding("style.display") display = "contents";

  constructor() {}

  /** Value props */
  @Input() comment: string = "";
  @Input() avatar: string = "";
  /** Style props */
  @Input() customerQuoteAlignSelf: string | number = "";
  @Input() name: string = '';  

  get customerQuoteStyle() {
    return {
      "align-self": this.customerQuoteAlignSelf,
    };
  }
}
