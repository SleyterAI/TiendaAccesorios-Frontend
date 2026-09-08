import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../../auth/services/auth.service';

@Component({
  selector: 'app-desktop-navigation',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './desktop-navigation.component.html',
  styleUrl: './desktop-navigation.component.css',
})
export class DesktopNavigationComponent {
  authService = inject(AuthService);
  readonly role = this.authService.getRole;
}
