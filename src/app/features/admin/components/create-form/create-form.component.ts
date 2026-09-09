import { Component, inject, signal } from "@angular/core";
import { Router, RouterOutlet, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { ProductService } from "../../../product/services/product.service";
import { ProductRequest } from "../../../product/interfaces/product.interface";
import { CategoryService } from "../../../home/services/category.service";
import { Category } from "../../../home/interfaces/category.interface";
import { ToastComponent } from "../../../../components/toast/toast.component";
import { rxResource } from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
  styleUrl: './create-form.component.css',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    ToastComponent
],
})
export class CreateFormComponent {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly productoService = inject(ProductService);
  private readonly categoryService = inject(CategoryService);

  readonly categoryResource = rxResource({
    stream: () => this.categoryService.getAllCategory(),
  });

  cargando = signal(false);
  mensaje = signal('');
  error = signal('');
  showToast = signal(false);

  readonly productoForm = this.fb.nonNullable.group({
    nombre: ['', [Validators.required, Validators.minLength(5)]],
    descripcion: ['', [Validators.required, Validators.minLength(10)]],
    precio: ['', [Validators.required, Validators.min(1)]],
    stock: ['', [Validators.required, Validators.min(1)]],
    imageUrl: ['', [Validators.required]],
    activo: [true],
    categoriaId: ['', [Validators.required]]
  });


  guardarProducto(): void {
    if (this.productoForm.invalid) {
      this.productoForm.markAllAsTouched();
      return;
    }

    this.cargando.set(true);
    this.mensaje.set('');
    this.error.set('');
    const formValue = this.productoForm.getRawValue();

    const producto: ProductRequest = {
      name: formValue.nombre,
      description: formValue.descripcion,
      price: Number(formValue.precio),
      stock: Number(formValue.stock),
      imageUrl: formValue.imageUrl,
      visible: formValue.activo,
      category: {
        id: Number(formValue.categoriaId)
      }
    };

    this.productoService.createProducto(producto).subscribe({
      next: () => {
        this.mensaje.set('Producto creado correctamente');
        this.cargando.set(false);
        this.showToast.set(true);

        setTimeout(() => {
          this.showToast.set(false);
          this.router.navigate(['/admin/product']);
        }, 1500);
      },
      error: (err) => {
        console.error('Error al crear producto:', err);
        this.error.set('No se pudo crear el producto');
        this.cargando.set(false);
      }
    });
  }
}
