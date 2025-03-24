import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-infopedido',
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './infopedido.component.html',
  styleUrl: './infopedido.component.css'
})
export class InfopedidoComponent {
  @Input() showButton: boolean = true;
  @Input() showDiv: boolean = true;
  @Input() isConfirmationPage: boolean = false;

  nombreCompleto: string = 'Value';
  telefono: string = '123456789';
  email: string = 'value@example.com';
  direccion: string = 'Value';
  departamento: string = 'Value';
  ciudad: string = 'Value';
  informacionAdicional: string = 'Value';
}
