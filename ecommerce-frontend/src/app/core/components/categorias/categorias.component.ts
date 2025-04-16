import { Component } from '@angular/core';
import { MenuItem } from '../shared/MenuItem/MenuItem.component';
import { MenuSeparator } from '../shared/MenuSeparator/MenuSeparator.component';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../interfaces/category.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'menu-categorias',
  imports: [MenuItem, MenuSeparator, CommonModule],
  templateUrl: './categorias.component.html',
  styleUrl: './categorias.component.css'
})
export class CategoriasComponent {
  categorias: Category[] = [];
  isLoading: boolean = true;

  constructor(private categoryService: CategoryService) {
    categoryService.GetCategories().subscribe(data => {
      this.categorias = data.filter(c => !c.is_disabled);
      this.isLoading = false;
    });
  }
}
