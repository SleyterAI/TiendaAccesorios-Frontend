import { Component, computed, inject, signal } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-categories',
  imports: [CommonModule, RouterLink],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
})
export class CategoriesComponent {
  categoryService = inject(CategoryService);

  categoriesResource = rxResource({
    stream: () => this.categoryService.getAllCategory()
  });

  // Estado reactivo para controlar si se muestran todas
  showAll = signal(false);

  // Computed que corta el arreglo a 4 elementos o los muestra todos según el estado
  visibleCategories = computed(() => {
    const list = this.categoriesResource.value() ?? [];
    return this.showAll() ? list : list.slice(0, 4);
  });

  toggleShowAll() {
    this.showAll.update(value => !value);
  }
}
