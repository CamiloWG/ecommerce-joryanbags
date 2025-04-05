import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { HeaderMenuComponent } from '../../core/components/shared/header-menu/header-menu.component';
import { Route } from '../../core/components/shared/Route/Route.component';
import { LogoComponent } from '../../core/components/shared/logo/logo.component';
import { ButtonComponent } from '../../core/components/button/button.component';
import { FooterComponent } from '../../core/components/shared/footer/footer.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  imports: [
    HeaderMenuComponent, 
    Route, 
    LogoComponent,
    FooterComponent,
    ButtonComponent,
    RouterModule,    
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  

  onLogin() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const { email, password } = this.loginForm.value;

    this.authService.logearUsuario(email, password).subscribe({
      next: (response) => {        
        localStorage.setItem('token', response.token);
        this.router.navigate(['/usuario']);
      },
      error: (err) => {        
        console.error('Error en el registro:', err);
        Swal.fire({
          icon: 'error',
          title: 'Ocurrió un error',
          text: 'Correo o contraseña inválidos',
          customClass: {
            title: "font-sans",
            popup: "font-sans"
          }
        }); 
      }
    });
  }
}  