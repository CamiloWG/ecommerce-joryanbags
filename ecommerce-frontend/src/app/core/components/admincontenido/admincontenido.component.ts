import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'; // Necesario para ngModel
import { ProductListService } from '../../services/product-list.service';
import { Product } from '../../interfaces/product.interface';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../interfaces/category.interface';
import Swal from 'sweetalert2';

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
  vistaOrden: 'pendientes' | 'todas' | 'aprobadas' = 'pendientes';

  // Simulación de datos de una orden (opcional, para mostrar lista)
  ordenesAprobadas: any[] = [];

  editandoStock = false;
  productoEditandoId: number | null = null;

  productos: Product[] = [];
  categorias: Category[] = [];
  
  formProducto!: FormGroup;
  imagenSeleccionada: File | null = null;

  constructor(private productService: ProductListService, private categoryService: CategoryService, private fb: FormBuilder) {
    productService.GetProducts().subscribe(data => this.productos = data);
    categoryService.GetCategories().subscribe(data => this.categorias = data);

    this.formProducto = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: [null, Validators.required],
      stock: [null, Validators.required],
      image_url: [null, Validators.required],
      category_id: ['', Validators.required]
    });
  }

  seleccionarVistaStock(tipo: 'listado' | 'nuevo') {
    if(tipo === 'listado') this.productService.GetProducts().subscribe(data => this.productos = data);
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
}
