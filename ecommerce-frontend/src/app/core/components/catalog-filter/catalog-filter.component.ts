import { Component, ViewEncapsulation } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-catalog-filter',
  imports: [
    MatCheckboxModule,
    FormsModule,
    MatSliderModule,
    CommonModule
  ],
  templateUrl: './catalog-filter.component.html',
  styleUrl: './catalog-filter.component.css',
  encapsulation: ViewEncapsulation.None
})
export class CatalogFilterComponent {
  isChecked1 = false;
  isChecked2 = false;
  isChecked3 = false;

  startValue: number = 300;
  endValue: number = 400;

  // Función que se dispara cada vez que el slider cambia
  onSliderChange(event: any) {
    // El valor de startValue y endValue se actualizan con el evento del slider
    console.log(`Nuevo rango: ${this.startValue} - ${this.endValue}`);
  }
  tickArray = Array.from({ length: 25 });
  
}
