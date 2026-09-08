import { Component, inject, signal } from "@angular/core";
import { Router, RouterOutlet, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { ProductService } from "../../../product/services/product.service";
import { ProductRequest } from "../../../product/interfaces/product.interface";
import { CategoryService } from "../../../home/services/category.service";
import { Category } from "../../../home/interfaces/category.interface";
import { ToastComponent } from "../../../../components/toast/toast.component";

@Component({
  selector: 'createProducto-page',
  templateUrl: './create-form.component.html',
  styleUrl: './create-form.component.css',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    ToastComponent
],
})
export class CreateFormComponent {

  private fb = inject(FormBuilder);
  private router = inject(Router);

  private productoService = inject(ProductService);
  private categoriaService = inject(CategoryService)

  categorias: Category[] = [];

  cargando = false;
  cargandoCategorias = false;
  mensaje = '';
  error = '';
  categoriaSeleccionada = '';
  mostrarExito = false;
  showToast = signal(false);

  ngOnInit(): void {
    this.getCategorias();
  }

  getCategorias(): void {
    this.cargandoCategorias = true;

    this.categoriaService.getAllCategory().subscribe({
      next: (data) => {
        this.categorias = data;
        this.cargandoCategorias = false;
      },
      error: (err) => {
        console.error('Error al obtener categorías:', err);
        this.cargandoCategorias = false;
      }
    });
  }



  productoForm = this.fb.nonNullable.group({

    nombre: ['',
      [Validators.required,
      Validators.minLength(5)]],

    descripcion: ['',
      [Validators.required,
    Validators.minLength(10)]],

    precio: ['',
      [Validators.required,
      Validators.min(1)]],

    stock: ['',
      [Validators.required,
      Validators.min(1)]],

    imageUrl: ['',
      [Validators.required]],

    activo: [true],

    categoriaId: ['', [Validators.required]]

  });


  guardarProducto(): void {

    if (this.productoForm.invalid) {
      this.productoForm.markAllAsTouched();
      return;
    }

    this.cargando = true;
    this.mensaje = '';
    this.error = '';

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

    //console.log('Producto que se enviará:', producto);

    this.productoService.createProducto(producto).subscribe({
      next: () => {
        this.mensaje ='Producto creado correctamente';
        this.cargando = false;

        this.showToast.set(true);

        setTimeout(() => {
          this.showToast.set(false);
          this.router.navigate([
            '/admin-page/products-admin-page'
          ]);
        }, 1500);

        this.productoForm.reset({
          nombre: '',
          descripcion: '',
          precio: '',
          stock: '',
          imageUrl: '',
          activo: true,
          categoriaId: ''
        });
      },

      error: (err) => {
        console.error('Error al crear producto:', err);
        this.error = 'No se pudo crear el producto';
        this.cargando = false;
      }

    });

  }
}
