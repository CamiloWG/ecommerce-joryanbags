import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Component} from '@angular/core';

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
  }
