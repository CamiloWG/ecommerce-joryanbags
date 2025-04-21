import { Component, EventEmitter, Output, ViewEncapsulation } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
import { CommonModule } from '@angular/common';
import { ProductFilters } from '../../interfaces/filter.interfaces';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-catalog-filter',
  imports: [
    MatCheckboxModule,
    FormsModule,
    MatSliderModule,
    CommonModule
  ],
  templateUrl: './catalog-filter.component.html',
  styleUrl: './catalog-filter.component.css',
  encapsulation: ViewEncapsulation.None
})
export class CatalogFilterComponent {
  @Output() filtersChanged = new EventEmitter<ProductFilters>();

  startValue: number = 10;
  endValue: number = 500;

  categories: { id: number; name: string; checked: boolean }[] = [];

  tickArray = Array.from({ length: 25 });

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoryService.GetCategories().subscribe((data) => {
      this.categories = data.filter(c => !c.is_disabled).map((cat: any) => ({
        id: cat.category_id,
        name: cat.name,
        checked: false
      }));
    });
  }

  emitFilters(): void {
    const selectedCategories = this.categories
      .filter(c => c.checked)
      .map(c => c.id);

    const filters: ProductFilters = {
      minPrice: this.startValue * 1000,
      maxPrice: this.endValue * 1000,
      categories: selectedCategories
    };

    this.filtersChanged.emit(filters);
  }

  onSliderChange(): void {
    console.log('slider cambió');
    
    this.emitFilters();
  }

  onCheckboxChange(): void {
    this.emitFilters();
  }
}
