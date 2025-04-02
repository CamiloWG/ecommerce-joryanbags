import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

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

  constructor(private router: Router) {}

  cantidad: number = 1;

  addButtonClick() {
    this.buttonAddEvent.emit(this.cantidad);
    Swal.fire({
      title: "¡Exito!",
      text: `Tu ${this.titulo} fue agregado exitosamente al carrito`,
      icon: 'success',
      showCancelButton: true,
      cancelButtonText: "Ir al carrito",
      confirmButtonText: "Seguir comprando",
      customClass: {
        title: "font-sans",
        popup: "font-sans"
      }
    }).then((result) => {
      if (result.isConfirmed) {        
        this.router.navigate(['/catalogo']);
      } else if (result.dismiss === Swal.DismissReason.cancel) {        
        this.router.navigate(['/carrito']);
      }
  });
  }
}
