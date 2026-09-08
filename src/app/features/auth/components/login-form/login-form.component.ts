import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators,  } from '@angular/forms';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-form',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css',
})
export class LoginFormComponent {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router= inject(Router);
  readonly isSubmitting = signal(false);

  readonly loginForm = this.fb.nonNullable.group({
    email: ['',
      [ Validators.required,
        Validators.email]],

    password: ['',
      [Validators.required,
        Validators.minLength(8)]]
  });

  login(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    this.isSubmitting.set(true);

    const request = this.loginForm.getRawValue();

    this.authService.login(request).subscribe({
      next: () => {
        this.router.navigate(['']);
        this.isSubmitting.set(false);
      },
      error: (error) => {
        console.error(error);
        this.isSubmitting.set(false);
      }
    });

  }
}
