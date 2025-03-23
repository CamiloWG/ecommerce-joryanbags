import {
  Component,
  ViewEncapsulation,
  HostBinding,
  Input,
} from "@angular/core";

import { CommonModule } from "@angular/common";
@Component({
  selector: "product-info-card",
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [CommonModule],
  templateUrl: "./ProductInfoCard.component.html",
})
export class ProductInfoCard {
  @HostBinding("style.display") display = "contents";

  constructor() {}

  /** Value props */
  @Input() showDescription: boolean = false;
  @Input() image: string = "";
  @Input() precio: string = "";
  @Input() titulo: string = "";
  /** Style props */
  @Input() productInfoCardWidth: string | number = "";

  onProductInfoCardClick() {
    // Please sync "Página de producto" to the project
  }
  get productInfoCardStyle() {
    return {
      width: this.productInfoCardWidth,
    };
  }
}
