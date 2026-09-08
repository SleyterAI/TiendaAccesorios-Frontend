import { Component, inject } from '@angular/core';
import { AuthService } from '../../../../auth/services/auth.service';

@Component({
  selector: 'app-auth-message',
  templateUrl: './auth-message.component.html',
  styleUrl: './auth-message.component.css',
})
export class AuthMessageComponent {
  private authService = inject(AuthService);
  role = this.authService.getRole;
}
