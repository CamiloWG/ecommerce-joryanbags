import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Component} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-info-usuario',
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './info-usuario.component.html',
  styleUrl: './info-usuario.component.css'
})

export class InfoUsuarioComponent {
  registroForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.registroForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      confirmarCorreo: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required, Validators.minLength(6)]],
      confirmarContrasena: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    console.log('Formulario enviado', this.registroForm.value);
  }
}