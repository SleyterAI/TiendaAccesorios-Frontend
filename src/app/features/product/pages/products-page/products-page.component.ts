import { Component, inject, signal } from '@angular/core';
import { HeaderComponent } from '../../../home/components/header/header.component';
import { FooterComponent } from '../../../home/components/footer/footer.component';
import { ProductService } from '../../services/product.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { CategoryService } from '../../../home/services/category.service';
import { ApiCartService } from '../../../home/services/api-cart.service';
import { Product } from '../../interfaces/product.interface';
import { ProductCardComponent } from '../../components/product-card/product-card.component';

@Component({
  selector: 'app-products-page',
  imports: [
    FooterComponent,
    ProductCardComponent,
    HeaderComponent
],
  templateUrl: './products-page.component.html',
  styleUrl: './products-page.component.css',
})
export class ProductsPageComponent {
  private readonly productService = inject(ProductService);
  private readonly categoryService = inject(CategoryService);

  readonly categoriaSeleccionada = signal<string>('');

  readonly categoriasResource = rxResource({
    stream: () => this.categoryService.getAllCategory()
  });

  readonly productResource = rxResource({
    stream: () => this.productService.getAllProduct()
  });


  readonly productosResource = rxResource<Product[], string>({
  params: () => this.categoriaSeleccionada(),
  stream: ({ params: categoria }) => {
    if (!categoria) {
      return this.productService.getAllProduct();
    }
    return this.productService.getProductsByCategory(categoria);
  }
});

  cambiarCategoria(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.categoriaSeleccionada.set(select.value);
  }

}
