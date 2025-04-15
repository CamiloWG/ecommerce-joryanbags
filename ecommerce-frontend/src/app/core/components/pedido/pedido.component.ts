import { Component, Input } from '@angular/core';
import { Order, OrderDetails } from '../../interfaces/order.interface';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../services/order.service';
import { ProductListService } from '../../services/product-list.service';

@Component({
  selector: 'app-pedido',
  imports: [CommonModule],
  templateUrl: './pedido.component.html',
  styleUrl: './pedido.component.css'
})
export class PedidoComponent {
  @Input() pedido: Order = {} as Order;

  urlImg: string | null = null;
  mostrarDetalles: boolean = false;
  detalles: OrderDetails[] = [];
  cargandoDetalles: boolean = false;
  precioEnvio: number = 0;

  constructor(private orderService: OrderService) {}

  toggleDetalles(): void {
    this.mostrarDetalles = !this.mostrarDetalles;

    if (this.mostrarDetalles && this.detalles.length === 0) {
      this.cargarDetalles();
    }
  }

  cargarDetalles(): void {
    this.cargandoDetalles = true;

    this.orderService.getOrderDetails(this.pedido.order_id).subscribe({
      next: (data: OrderDetails[]) => {
        this.detalles = data;        
        this.calcularPrecioEnvio();
        this.cargandoDetalles = false;
      },
      error: (err) => {
        console.error('Error cargando detalles del pedido:', err);
        this.cargandoDetalles = false;
      }
    });
  }

  calcularPrecioEnvio(): void {
    const total = this.detalles.reduce((acc, item) => acc + item.subtotal * item.quantity, 0)
    this.precioEnvio = this.pedido.total_price - total;
  }
}
