import { Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { ProductService } from '../../../product/services/product.service';
import { ProductRequest } from '../../../product/interfaces/product.interface';
import { CategoryService } from '../../../home/services/category.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';
import { ToastComponent } from "../../../../components/toast/toast.component";

@Component({
  selector: 'app-update-form',
  templateUrl: './update-form.component.html',
  styleUrl: './update-form.component.css',
  imports: [
    ReactiveFormsModule, RouterLink,
    ToastComponent
]
})
export class UpdateFormComponent {
  private readonly fb = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly productoService = inject(ProductService);
  private readonly categoryService = inject(CategoryService);

  private readonly productoId = Number(this.route.snapshot.paramMap.get('id'));

  readonly categoriaResource = rxResource({
    stream: () => this.categoryService.getAllCategory(),
  });

  showToast = signal(false);
  error = signal('');

  readonly formulario = this.fb.nonNullable.group({
    nombre: ['', Validators.required],
    descripcion: ['', Validators.required],
    precio: [0, [Validators.required, Validators.min(1)]],
    stock: [0, [Validators.required, Validators.min(0)]],
    imageUrl: ['', Validators.required],
    activo: [true],
    categoriaId: [0, [Validators.required, Validators.min(1)]]
  });

  readonly productoResource = rxResource({
    stream: () => {
      if (!this.productoId) {
        this.error.set('No se recibió el ID del producto');
        throw new Error('ID no válido');
      }

      return this.productoService.getProductById(this.productoId).pipe(
        tap(producto => {
          this.formulario.patchValue({
            nombre: producto.name,
            descripcion: producto.description,
            precio: producto.price,
            stock: producto.stock,
            imageUrl: producto.imageUrl,
            activo: producto.visible,
            categoriaId: producto.category.id ?? 0
          });
        })
      );
    }
  });

  actualizarProducto(): void {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    this.error.set('');
    const formValue = this.formulario.getRawValue();

    const productoRequest: ProductRequest = {
      name: formValue.nombre,
      description: formValue.descripcion,
      price: formValue.precio,
      stock: formValue.stock,
      imageUrl: formValue.imageUrl,
      visible: formValue.activo,
      category: { id: formValue.categoriaId }
    };

    this.productoService.updateProducto(this.productoId, productoRequest)
      .subscribe({
        next: () => {
          this.showToast.set(true);
          setTimeout(() => {
            this.showToast.set(false);
            this.router.navigate(['/admin/product']);
          }, 1500);
        },

        error: (err) => {
          console.error('Error al actualizar producto:', err);
          this.error.set('No se pudo actualizar el producto');
        }
      });
  }
}

