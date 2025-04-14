import { Component, Output, EventEmitter, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-resumen',
  templateUrl: './adminresumen.component.html',
  styleUrls: ['./adminresumen.component.css'],
  imports: [CommonModule]
})
export class ResumenComponent {
  @Input() resumenActivo: 'ordenes' | 'stock' = 'ordenes';
  @Output() resumenSeleccionado = new EventEmitter<'ordenes' | 'stock'>();

  seleccionarResumen(tipo: 'ordenes' | 'stock') {
    this.resumenSeleccionado.emit(tipo);
  }
}
