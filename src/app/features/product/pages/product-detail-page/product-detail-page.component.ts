import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { ApiCartService } from '../../../home/services/api-cart.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs';
import { DecimalPipe } from '@angular/common';
import { HeaderComponent } from '../../../home/components/header/header.component';
import { FooterComponent } from '../../../home/components/footer/footer.component';
import { Product } from '../../interfaces/product.interface';
import { AuthService } from '../../../auth/services/auth.service';
import { LocalCartService } from '../../../home/services/local-cart.service';

@Component({
  selector: 'app-product-detail-page',
  imports: [DecimalPipe,HeaderComponent,FooterComponent],
  templateUrl: './product-detail-page.component.html',
  styleUrl: './product-detail-page.component.css',
})
export class ProductDetailPageComponent {
  private route = inject(ActivatedRoute);
  private readonly productService = inject(ProductService);
  private readonly apiCartService = inject(ApiCartService);
  private readonly localCartService = inject(LocalCartService);
  private readonly authService = inject(AuthService);

  product = toSignal(
    this.route.paramMap.pipe(
      switchMap(params => {
        const id = Number(params.get('id'));
        return this.productService.getProductByIdCart(id);
      })
    ),
    { initialValue: null }
  );

  addToCart(product: Product): void {
    if (this.authService.isAuthenticated()) {
      this.apiCartService.addItem(product.id).subscribe();
    }else{
      this.localCartService.addToCart(product);
      console.log('Added to local storage cart')
    }

  }

  cartCount = this.apiCartService.cartCount;
}
