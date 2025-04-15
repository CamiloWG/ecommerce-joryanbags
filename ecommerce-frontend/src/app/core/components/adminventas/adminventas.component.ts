import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';  // Importar CommonModule
import { Earning } from '../../interfaces/order.interface';

@Component({
  selector: 'app-adminventas',
  imports: [CommonModule],  
  templateUrl: './adminventas.component.html',
  styleUrls: ['./adminventas.component.css']
})
export class AdminventasComponent {
  @Input() dataVentas!: Earning;
  periodoSeleccionado: string = 'hoy';

  seleccionarPeriodo(periodo: string) {
    this.periodoSeleccionado = periodo;
  }
}
