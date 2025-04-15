import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'; // Necesario para ngModel
import { ProductListService } from '../../services/product-list.service';
import { Product } from '../../interfaces/product.interface';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../interfaces/category.interface';
import Swal from 'sweetalert2';
import { OrderService } from '../../services/order.service';
import { Order, OrderDetails } from '../../interfaces/order.interface';

@Component({
  selector: 'app-contenido',
  templateUrl: './admincontenido.component.html',
  styleUrls: ['./admincontenido.component.css'],
  imports: [CommonModule, FormsModule, ReactiveFormsModule]
})
export class ContenidoResumenComponent {
  @Input() tipoResumen: 'ordenes' | 'stock' = 'ordenes';
  mostrarDetallesOrden1: boolean = false;
  mostrarDetallesOrden2: boolean = false;
  isLoading: boolean = false;


  vistaStock: 'listado' | 'nuevo' = 'listado';
  vistaOrden: 'pendientes' | 'enviadas' | 'entregadas' = 'pendientes';


  editandoStock = false;
  productoEditandoId: number | null = null;

  productos: Product[] = [];
  categorias: Category[] = [];
  pedidosPendientes: Order[] = [];
  pedidosEnviados: Order[] = [];
  pedidosEntregados: Order[] = [];
  
  formProducto!: FormGroup;
  imagenSeleccionada: File | null = null;

  ordenMostrandoDetalles: number | null = null;
  detallePedidoSeleccionado: OrderDetails[] = [];
  cargandoDetalles: boolean = false;

  constructor(private productService: ProductListService, private categoryService: CategoryService, private orderService: OrderService, private fb: FormBuilder) {
    productService.GetProducts().subscribe(data => this.productos = data);
    categoryService.GetCategories().subscribe(data => this.categorias = data);
    this.updateOrders();

    this.formProducto = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: [null, Validators.required],
      stock: [null, Validators.required],
      image_url: [null, Validators.required],
      category_id: ['', Validators.required]
    });
  }

  updateOrders() {
    this.pedidosEnviados = [];
    this.pedidosPendientes = [];
    this.orderService.getAllOrders().subscribe(data => {
      this.pedidosPendientes = data.filter(p => p.status_id == 1 || p.status_id == 2 || p.status_id == 3);
      this.pedidosEnviados = data.filter(p => p.status_id == 4);
      this.pedidosEntregados = data.filter(p => p.status_id == 5);
    });
  }

  seleccionarVistaStock(tipo: 'listado' | 'nuevo') {
    if(tipo === 'listado') this.productService.GetProducts().subscribe(data => this.productos = data);
    this.vistaStock = tipo;    
  }

  seleccionarVistaOrden(tipo: 'pendientes' | 'enviadas' | 'entregadas') {       
    this.updateOrders(); 
    this.vistaOrden = tipo;
  }

  //////////////// VISTA DE STOCK

  toggleEditarStock(product: Product) {
    if (this.productoEditandoId === product.product_id) {      
      this.productService.UpdateProduct(product).subscribe();
      this.productoEditandoId = null;
    } else {      
      this.productoEditandoId = product.product_id;
    }
  }

  campoInvalido(campo: string): boolean {
    const ctrl = this.formProducto.get(campo);
    return !!ctrl && ctrl.invalid && (ctrl.touched || ctrl.dirty);
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.imagenSeleccionada = file;
      this.formProducto.get('image_url')?.setValue(file);
    }
  }

  crearProducto() {
    if (this.formProducto.invalid) {
      this.formProducto.markAllAsTouched();
      return;
    }
  
    this.isLoading = true;
    const formValue = this.formProducto.value;
    const formData = new FormData();

    formData.append('name', formValue.name);
    formData.append('description', formValue.description);
    formData.append('price', formValue.price);
    formData.append('stock', formValue.stock);
    formData.append('category_id', formValue.category_id);
    formData.append('brand', 'Joryan');

    if (this.imagenSeleccionada) {
      formData.append('image_url', this.imagenSeleccionada);
    }
  
    this.productService.CreateProduct(formData).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Producto creado',
          text: 'El producto fue creado correctamente 🎉',
          confirmButtonColor: '#6366f1',
          customClass: {
            title: "font-sans",
            popup: "font-sans"
          }
        });
  
        this.formProducto.reset();
        this.imagenSeleccionada = null;
        
        this.isLoading = false;
      },
      error: (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error al crear producto',
          text: error?.message || 'Algo salió mal al guardar el producto 😢',
          confirmButtonColor: '#ef4444',
          customClass: {
            title: "font-sans",
            popup: "font-sans"
          }
        });
        
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }





  ///////////////// VISTA DE ORDENES

  verDetalles(pedido: Order): void {
    if (this.ordenMostrandoDetalles === pedido.order_id) {
      
      this.ordenMostrandoDetalles = null;
      this.detallePedidoSeleccionado = [];
      return;
    }
  
    this.cargandoDetalles = true;
    this.ordenMostrandoDetalles = pedido.order_id;
    this.detallePedidoSeleccionado = [];
  
    this.orderService.getOrderDetails(pedido.order_id).subscribe({
      next: (detalles) => {
        this.detallePedidoSeleccionado = detalles;
        this.cargandoDetalles = false;
      },
      error: () => {
        this.cargandoDetalles = false;
        Swal.fire('Error', 'No se pudieron cargar los detalles del pedido.', 'error');
      }
    });
  }

  aprobarEnvioOrden(orden: Order) {
    this.orderService.updateOrderStatus(orden.order_id, 4).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Producto enviado',
          text: 'El producto fue marcado como enviado exitosamente',
          confirmButtonColor: '#6366f1',
          customClass: {
            title: "font-sans",
            popup: "font-sans"
          }
        });
        
      this.updateOrders();
      },
      error: (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error al cambiar estado del producto',
          text: error?.message || 'Algo salió mal al marcar como enviado el producto',
          confirmButtonColor: '#ef4444',
          customClass: {
            title: "font-sans",
            popup: "font-sans"
          }
        });
      }
    });
  }


  aprobarOrdenEntregada(orden: Order) {
    this.orderService.updateOrderStatus(orden.order_id, 5).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Producto entregado',
          text: 'El producto fue marcado como entregado',
          confirmButtonColor: '#6366f1',
          customClass: {
            title: "font-sans",
            popup: "font-sans"
          }
        });
        
      this.updateOrders();
      },
      error: (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error al cambiar estado del producto',
          text: error?.message || 'Algo salió mal al marcar como entregado el producto',
          confirmButtonColor: '#ef4444',
          customClass: {
            title: "font-sans",
            popup: "font-sans"
          }
        });
      }
    });
  }
  
}
