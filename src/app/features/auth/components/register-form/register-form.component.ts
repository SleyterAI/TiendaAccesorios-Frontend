import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';

import { ToastComponent } from '../../../../components/toast/toast.component';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register-form',
  imports: [ReactiveFormsModule,RouterLink, ToastComponent],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css',
})

export class RegisterFormComponent {
  private readonly fb = inject(FormBuilder);
  private readonly userService = inject(UserService);
  private readonly router = inject(Router);

  readonly isSubmitting = signal(false);
  readonly showToast = signal(false);
  readonly error = signal('');

  readonly registerForm = this.fb.nonNullable.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]]
  });

  createUsuario(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }
    this.isSubmitting.set(true);
    this.error.set('');

    const request = this.registerForm.getRawValue();

    this.userService.createUsuario(request).subscribe({
     next: () => {
        this.isSubmitting.set(false);
        this.showToast.set(true);

        setTimeout(() => {
          this.showToast.set(false);
          this.router.navigate(['']);
        }, 1500);
      },
      error: (err) => {
        this.error.set('No se pudo completar el registro');
        this.isSubmitting.set(false);
      }
    });

  }
}
