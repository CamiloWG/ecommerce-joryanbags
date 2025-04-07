import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Necesario para ngModel

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

  // Estado editable del stock
  editandoStock = false;
  cantidad = 25;
  precio = 19999;

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

  toggleEditarStock() {
    if (this.editandoStock) {
      // Guardar cambios: aquí puedes hacer una llamada a una API
      console.log('Datos guardados:', {
        cantidad: this.cantidad,
        precio: this.precio
      });
    }
    this.editandoStock = !this.editandoStock;
  }
}
