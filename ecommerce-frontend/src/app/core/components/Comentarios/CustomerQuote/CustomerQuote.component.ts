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
  @Input() aTerrificPieceOfPraise: string = "";
  @Input() avatar: string = "";
  /** Style props */
  @Input() customerQuoteAlignSelf: string | number = "";

  get customerQuoteStyle() {
    return {
      "align-self": this.customerQuoteAlignSelf,
    };
  }
}
