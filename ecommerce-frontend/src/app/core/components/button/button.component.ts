import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-button',
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css'
})
export class ButtonComponent {
@Input() buttonRoute: string = ''; 
@Input() title: string = '';
@Input() buttonText: string = 'Botón';
@Input() showButton: boolean = true;
@Input() type: 'button' | 'submit' | 'reset' = 'button'; 

}
