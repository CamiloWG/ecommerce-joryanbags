import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product',
  imports: [FormsModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  @Input() productId: number = 1;
  @Input() image: string = "";
  @Input() precio: number = 0;
  @Input() titulo: string = "";
  @Input() stock: number = 1;
  @Input() categoria: string = "";

  @Output() buttonAddEvent = new EventEmitter<number>();

  cantidad: number = 1;

  addButtonClick() {
    this.buttonAddEvent.emit(this.cantidad);
  }
}
