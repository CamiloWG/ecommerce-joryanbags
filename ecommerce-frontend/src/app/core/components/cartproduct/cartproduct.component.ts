import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-cartproduct',
  imports: [],
  templateUrl: './cartproduct.component.html',
  styleUrl: './cartproduct.component.css'
})
export class CartproductComponent {
  @Input() nombreProducto = "";
  @Input() urlImagen = "";
  @Input() cantidad = 1;

  @Output() onDelete = new EventEmitter();
  @Output() onChangeQty: EventEmitter<number> = new EventEmitter<number>();

  onProductAddQuantity() {
    this.onChangeQty.emit(1);
  }

  onProductLessQuantity() {
    this.onChangeQty.emit(-1);
  }

  onProductDelete() {
    this.onDelete.emit();
  }
}
