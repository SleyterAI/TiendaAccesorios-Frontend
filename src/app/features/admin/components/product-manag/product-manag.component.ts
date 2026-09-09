import { Component, inject, signal } from '@angular/core';
import { HeaderComponent } from "../../../home/components/header/header.component";
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ProductService } from '../../../product/services/product.service';
import { Product } from '../../../product/interfaces/product.interface';
import { rxResource } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { ToastComponent } from "../../../../components/toast/toast.component";

@Component({
  selector: 'app-product-manag',
  imports: [RouterLink,
    RouterLinkActive, RouterOutlet, ToastComponent],
  templateUrl: './product-manag.component.html',
  styleUrl: './product-manag.component.css',
})
export class ProductManagComponent {
  private readonly productService = inject(ProductService);

  readonly productoResource = rxResource({
    stream: () => this.productService.getAllProductAdmin().pipe(
      map(data => [...data].reverse())
    ),
  });

  showToast = signal(false);
  error = signal('');
  mostrarExito = signal(false);
  tituloPopup = signal('');
  mensajePopup = signal('');

  cambiarActivo(producto: Product): void {
    const nuevoEstado = !producto.visible;

    this.productService
    .updateProductVisible(producto.id!, nuevoEstado)
    .subscribe({
      next: () => {
        producto.visible = nuevoEstado;
        // Mostrar popup
        this.mostrarExito.set(true);
        this.tituloPopup.set(
          nuevoEstado ? '¡Producto activo!' : '¡Producto desactivado!'
        );

        this.mensajePopup.set(
          nuevoEstado ? 'El producto se activó correctamente.'
          : 'El producto se desactivó correctamente.'
        );
        // Esperar 1.5 segundos y navegar
        setTimeout(() => {
          this.mostrarExito.set(false);
        }, 1500);
      },

      error: (err) => {
        console.error('Error al actualizar estado:', err);
        this.error.set('No se pudo actualizar el estado del producto');
      }
    });
  }
}
