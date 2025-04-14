import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Necesario para ngModel
import { ProductListService } from '../../services/product-list.service';
import { Product } from '../../interfaces/product.interface';

@Component({
  selector: 'app-contenido',
  templateUrl: './admincontenido.component.html',
  styleUrls: ['./admincontenido.component.css'],
  imports: [CommonModule, FormsModule]
})
export class ContenidoResumenComponent {
  @Input() tipoResumen: 'ordenes' | 'stock' = 'ordenes';
  mostrarDetallesOrden1: boolean = false;
  mostrarDetallesOrden2: boolean = false;

  vistaStock: 'listado' | 'nuevo' = 'listado';
  vistaOrden: 'pendientes' | 'todas' | 'aprobadas' = 'pendientes';

  // Simulación de datos de una orden (opcional, para mostrar lista)
  ordenesAprobadas: any[] = [];

  editandoStock = false;
  productoEditandoId: number | null = null;

  productos: Product[] = [];

  constructor(private productService: ProductListService) {
    productService.GetProducts().subscribe(data => this.productos = data);
  }

  seleccionarVistaStock(tipo: 'listado' | 'nuevo') {
    this.vistaStock = tipo;
  }

  seleccionarVistaOrden(tipo: 'pendientes' | 'todas' | 'aprobadas') {
    this.vistaOrden = tipo;
  }

  aprobarOrden(orden: any) {
    this.ordenesAprobadas.push(orden);
    this.vistaOrden = 'aprobadas';
  }

  toggleEditarStock(product: Product) {
    if (this.productoEditandoId === product.product_id) {      
      this.productService.UpdateProduct(product).subscribe();
      this.productoEditandoId = null;
    } else {      
      this.productoEditandoId = product.product_id;
    }
  }
}
