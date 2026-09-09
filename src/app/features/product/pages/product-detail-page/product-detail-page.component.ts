import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { ApiCartService } from '../../../home/services/api-cart.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs';
import { DecimalPipe } from '@angular/common';
import { HeaderComponent } from '../../../home/components/header/header.component';
import { FooterComponent } from '../../../home/components/footer/footer.component';
import { Product, Producto } from '../../interfaces/product.interface';

@Component({
  selector: 'app-product-detail-page',
  imports: [DecimalPipe,HeaderComponent,FooterComponent],
  templateUrl: './product-detail-page.component.html',
  styleUrl: './product-detail-page.component.css',
})
export class ProductDetailPageComponent {
  private route = inject(ActivatedRoute);
  private productService = inject(ProductService);
  private cartService = inject(ApiCartService);

  producto = toSignal(
    this.route.paramMap.pipe(
      switchMap(params => {
        const id = Number(params.get('id'));
        return this.productService.getProductById(id);
      })
    ),
    { initialValue: null }
  );

  addToCart(product: Producto): void {
    this.cartService.addItem(product.id).subscribe();
  }

  cartCount = this.cartService.cartCount;
}
