import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';  // Importar CommonModule

@Component({
  selector: 'app-adminventas',
  imports: [CommonModule],  // Asegúrate de que CommonModule esté en el array de imports
  templateUrl: './adminventas.component.html',
  styleUrls: ['./adminventas.component.css']
})
export class AdminventasComponent {
  periodoSeleccionado: string = 'hoy';

   // Simulación de datos para ventas y cantidad de dinero
   ventasHoy = { cantidad: 120, dinero: 3500 };
   ventasUltimaSemana = { cantidad: 850, dinero: 25000 };
   ventasUltimoMes = { cantidad: 3500, dinero: 100000 };
   ventasUltimosTresMeses = { cantidad: 10500, dinero: 300000 };

  seleccionarPeriodo(periodo: string) {
    this.periodoSeleccionado = periodo;
  }
}
