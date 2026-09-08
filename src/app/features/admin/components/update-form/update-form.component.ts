import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { ProductService } from '../../../product/services/product.service';
import { ProductRequest } from '../../../product/interfaces/product.interface';

@Component({
  selector: 'app-update-form',
  templateUrl: './update-form.component.html',
  styleUrl: './update-form.component.css',
  imports: [
    ReactiveFormsModule, RouterLink
  ]
})
export class UpdateFormComponent implements OnInit {

  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private productoService = inject(ProductService);

  productoId!: number;

  cargando = false;
  guardando = false;
  mostrarExito = false;
  error = '';
  mensaje = '';

  formulario = this.fb.nonNullable.group({
    nombre: ['', Validators.required],
    descripcion: ['', Validators.required],
    precio: [0, [
      Validators.required,
      Validators.min(1)
    ]],
    stock: [0, [
      Validators.required,
      Validators.min(0)
    ]],
    imageUrl: ['', Validators.required],
    activo: [true],
    categoriaId: ['', Validators.required
    ]
  });


  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      this.error = 'No se recibió el ID del producto';
      return;
    }

    this.productoId = Number(id);
    this.getProducto();
  }


  getProducto(): void {
    this.cargando = true;
    this.error = '';

    this.productoService.getProductById(this.productoId).subscribe({
        next: (producto) => {
          this.formulario.patchValue({
            nombre: producto.name,
            descripcion: producto.description,
            precio: producto.price,
            stock: producto.stock,
            imageUrl: producto.imageUrl,
            activo: producto.visible,
            categoriaId: producto.categoryName ?? 0
          });

          this.cargando = false;
        },

        error: (err) => {
          console.error(
            'Error al obtener producto:',
            err
          );
          this.error =
            'No se pudo cargar el producto';
          this.cargando = false;
        }
      });
  }

/*
  actualizarProducto(): void {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    this.guardando = true;
    this.error = '';

    const formValue = this.formulario.getRawValue();

    const productoRequest: ProductRequest = {
      name: formValue.nombre,
      description: formValue.descripcion,
      price: formValue.precio,
      stock: formValue.stock,
      imageUrl: formValue.imageUrl,
      visible: formValue.activo,
      category: {id: formValue.categoriaId}
    };

    this.productoService
      .updateProducto(this.productoId, productoRequest).subscribe({
        next: () => {
          this.mensaje = 'Producto actualizado correctamente';
          this.guardando = false;

          // Mostrar popup
          this.mostrarExito = true;

          // Esperar 1.5 segundos y navegar
          setTimeout(() => {
            this.mostrarExito = false;
            this.router.navigate([
              '/admin-page/products-admin-page']);
          }, 1500);
        },

        error: (err) => {
          console.error(
            'Error al actualizar producto:',err);
          this.error =
            'No se pudo actualizar el producto';
          this.guardando = false;
        }
      });
  }*/
}

