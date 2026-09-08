import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../../../../auth/services/auth.service';

@Component({
  selector: 'app-mobile-menu',
  imports: [],
  templateUrl: './mobile-menu.component.html',
  styleUrl: './mobile-menu.component.css',
})
export class MobileMenuComponent {
  readonly menuOpen = signal(false);

  toggleMenu(): void {
    this.menuOpen.update(open => !open);
  }

  closeMenu(): void {
    this.menuOpen.set(false);
  }

  authService = inject(AuthService);
  readonly role = this.authService.getRole;
}
