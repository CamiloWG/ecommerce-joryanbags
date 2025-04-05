import { Component } from '@angular/core';
import { HeaderMenuComponent } from '../../core/components/shared/header-menu/header-menu.component';
import { Route } from '../../core/components/shared/Route/Route.component';
import { LogoComponent } from '../../core/components/shared/logo/logo.component';
import { FooterComponent } from '../../core/components/shared/footer/footer.component';
import { ButtonComponent } from '../../core/components/button/button.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { User } from '../../core/interfaces/user.interface';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  imports: [
    HeaderMenuComponent,
    Route,
    LogoComponent,
    FooterComponent,
    ButtonComponent,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {
  form: FormGroup = {} as FormGroup;

  constructor(private fb: FormBuilder, private registroService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      correo: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]{10,10}$')]],
      contrasena: ['', [Validators.required, Validators.minLength(6)]],
      confirmarContrasena: ['', [Validators.required]],
      terminos: [false, [Validators.requiredTrue]]
    }, { validator: this.matchPasswords });
  }

  matchPasswords(group: FormGroup) {
    const password = group.get('contrasena');
    const confirm = group.get('confirmarContrasena');
  
    if (!password || !confirm) return null;
  
    if (password.value !== confirm.value) {
      confirm.setErrors({ noCoinciden: true });
      return { noCoinciden: true };
    } else {      
      if (confirm.hasError('noCoinciden')) {
        confirm.setErrors(null);
      }
      return null;
    }
  }

  onRegistro() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.matchPasswords(this.form);
      return;
    }

    const data: User = {
      full_name: this.form.value.nombre + ' ' + this.form.value.apellido,      
      email: this.form.value.correo,
      phone: this.form.value.telefono,
      password: this.form.value.contrasena,
      address: 'Sin dirección',
      rol_id: 1      
    };

    this.registroService.registrarUsuario(data).subscribe({
      next: (response) => {       
        localStorage.setItem('token', response.token);  
        Swal.fire({
          icon: 'success',
          title: '¡Registro exitoso!',
          text: 'Tu cuenta ha sido creada correctamente.',
          confirmButtonText: 'Ir al login',
          confirmButtonColor: '#3085d6',
          customClass: {
            title: "font-sans",
            popup: "font-sans"
          }
        }).then(() => {          
          this.router.navigate(['/login']).then(() => {
            window.scrollTo(0, 0);
          });
        });
      },
      error: (err) => {
        console.error('Error en el registro:', err);
        Swal.fire({
          icon: 'error',
          title: 'Ocurrió un error',
          text: err.error.error || 'Error al registrarse, por favor intente de nuevo mas tarde',
          customClass: {
            title: "font-sans",
            popup: "font-sans"
          }
        });
      }
    });
  }
}
