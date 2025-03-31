import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-product',
  imports: [],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  @Input() productId: number = 1;
  @Input() image: string = "";
  @Input() precio: number = 0;
  @Input() titulo: string = "";
  @Input() stock: number = 1;

}
