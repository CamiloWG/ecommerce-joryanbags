import {
  Component,
  ViewEncapsulation,
  HostBinding,
  Input,
} from "@angular/core";

import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";
@Component({
  selector: "product-info-card",
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [CommonModule],
  templateUrl: "./ProductInfoCard.component.html",
})
export class ProductInfoCard {
  constructor(private router: Router) {}

  @HostBinding("style.display") display = "contents";
  
  @Input() showDescription: boolean = false;
  @Input() productId: number = 1;
  @Input() image: string = "";
  @Input() precio: string = "";
  @Input() titulo: string = "";
  
  @Input() productInfoCardWidth: string | number = "";

  onProductInfoCardClick() {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['producto', this.productId]);
    });    
  }
  get productInfoCardStyle() {
    return {
      width: this.productInfoCardWidth,
    };
  }
}
