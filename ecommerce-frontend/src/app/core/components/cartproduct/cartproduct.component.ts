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
  @Input() descripcion = "";
  @Input() stock = 1;
  @Input() precio = 0;

  @Output() onDelete = new EventEmitter();
  @Output() onChangeQty: EventEmitter<number> = new EventEmitter<number>();

  onProductAddQuantity() {
    if(this.cantidad >= this.stock) return;
    this.onChangeQty.emit(1);
  }

  onProductLessQuantity() {
    this.onChangeQty.emit(-1);
  }

  onProductDelete() {
    this.onDelete.emit();
  }
}
