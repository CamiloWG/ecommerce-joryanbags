import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Component, Input } from '@angular/core';
import { User } from '../../interfaces/user.interface';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import colombiaData from '../../../../assets/data/colombia.min.json';
import { OrderService } from '../../services/order.service';
import { RawOrder } from '../../interfaces/order.interface';

@Component({
  selector: 'app-infopedido',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './infopedido.component.html',
  styleUrl: './infopedido.component.css'
})
export class InfopedidoComponent {
  @Input() showButton = true;
  @Input() showDiv = true;
  @Input() isConfirmationPage = false;

  form!: FormGroup;

  departamentos: any[] = [];
  ciudadesFiltradas: string[] = [];

  departamentoSeleccionado: any = null;
  ciudadSeleccionada: string = '';

  usuario: User | null = null;

  colombia = colombiaData;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private orderService: OrderService,
    private router: Router
  ) {}

  ngOnInit(): void {
    window.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
    });
    this.departamentos = colombiaData;

    this.form = this.fb.group({
      nombreCompleto: ['', Validators.required],
      telefono: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      cedula: ['', Validators.required],
      departamento: ['', Validators.required],
      ciudad: ['', Validators.required],
      barrio: ['', Validators.required],
      direccion: ['', Validators.required],
      informacionAdicional: ['', Validators.required]
    });

    const id = this.authService.getUserIdFromToken();
    if (id) {
      this.userService.getUserById(id).subscribe((data) => {
        this.usuario = data[0];
        this.form.patchValue({
          nombreCompleto: this.usuario?.full_name || '',
          telefono: this.usuario?.phone || '',
          email: this.usuario?.email || ''
        });
      });
    } else {
      this.router.navigate(['/login']);
    }

    this.form.get('departamento')?.valueChanges.subscribe(() => {
      this.form.get('ciudad')?.setValue('');
      this.actualizarCiudades();
    });
    this.form.get('nombreCompleto')?.disable();
    this.form.get('telefono')?.disable();
    this.form.get('email')?.disable();
     

    if(this.isConfirmationPage) this.showOrderInfo();
  }


  guardar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched(); 
      return;
    }
    const idUser = this.authService.getUserIdFromToken();
    if(idUser) {
      const pedido = {
        ...this.form.value,
        nombreCompleto: this.usuario?.full_name,
        telefono: this.usuario?.phone,
        email: this.usuario?.email
      };
      this.orderService.setOrder(pedido);
      const address: string = `${pedido.direccion} Barrio ${pedido.barrio} ${pedido.ciudad}, ${pedido.departamento} | ${pedido.informacionAdicional}`;
      this.userService.updateUserById(idUser, {address}).subscribe();
      console.log(address);
      
      this.router.navigate(['/confirmacioncompra'])
    }
    
  }

  campoInvalido(controlName: string): boolean {
    const control = this.form.get(controlName);
    return ((control?.invalid) && (control?.touched)) ?? false;
  }

  actualizarCiudades(): void {
    const depSeleccionado = this.form.get('departamento')?.value;
    const departamentoEncontrado = this.colombia.find(d => d.departamento === depSeleccionado);
    this.ciudadesFiltradas = departamentoEncontrado ? departamentoEncontrado.ciudades : [];
  }


  showOrderInfo(): void  {
    const pedido: RawOrder = this.orderService.getOrder();
    if(pedido.cedula == undefined) {
      this.router.navigate(['/carrito']);
      return;
    }
    this.form.patchValue({
      cedula: pedido.cedula,
      departamento: pedido.departamento,
      ciudad: pedido.ciudad,
      barrio: pedido.barrio,
      direccion: pedido.direccion,
      informacionAdicional: pedido.informacionAdicional
    });
  }
}
