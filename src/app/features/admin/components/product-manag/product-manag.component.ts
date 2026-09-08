import { Component, inject, signal } from '@angular/core';
import { HeaderComponent } from "../../../home/components/header/header.component";
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ProductService } from '../../../product/services/product.service';
import { Product } from '../../../product/interfaces/product.interface';

@Component({
  selector: 'app-product-manag',
  imports: [RouterLink,
    RouterLinkActive,RouterOutlet],
  templateUrl: './product-manag.component.html',
  styleUrl: './product-manag.component.css',
})
export class ProductManagComponent {
  private productService = inject(ProductService);
  productos: Product[] = [];

  showToast = signal(false);
  //producto = this.productoService.
  cargando = false;
  error = '';
  mostrarExito = false
  tituloPopup = '';
  mensajePopup = '';

  ngOnInit(): void {
    this.getAllProducto();
  }

  getAllProducto(): void {
    this.cargando = true;
    this.error = '';

    this.productService.getAllProductAdmin().subscribe({
      next: (data) => {
        this.productos = [...data].reverse();
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error al obtener productos:', err);
        this.error = 'No se pudieron cargar los productos';
        this.cargando = false;
      }
    });
  }

  cambiarActivo(producto: Product): void {

    const nuevoEstado = !producto.visible;

    this.productService.cambiarActivo(producto.id!, nuevoEstado).subscribe({
      next: (productoActualizado) => {
        /*console.log(
          'Producto actualizado:',
          productoActualizado
        );*/
        producto.visible = productoActualizado.visible;
        // Mostrar popup
        this.mostrarExito = true;

        if (productoActualizado.visible) {

            this.tituloPopup = '¡Producto activo!';

            this.mensajePopup =
              'El producto se activó correctamente.';

          } else {

            this.tituloPopup = '¡Producto desactivado!';

            this.mensajePopup =
              'El producto se desactivó correctamente.';
          }

        // Esperar 1.5 segundos y navegar
        setTimeout(() => {
          this.mostrarExito = false;
        }, 1500);
      },

      error: (err) => {
        console.error('Error al actualizar estado:', err);
        this.error =
          'No se pudo actualizar el estado del producto';
      }
    });
  }
}
