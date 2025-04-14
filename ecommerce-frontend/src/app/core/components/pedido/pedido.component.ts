import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pedido',
  imports: [],
  templateUrl: './pedido.component.html',
  styleUrl: './pedido.component.css'
})
export class PedidoComponent {
  @Input() titulo: string = '';
  @Input() estado: string = '';
  @Input() infoPedido: string = '';
}
