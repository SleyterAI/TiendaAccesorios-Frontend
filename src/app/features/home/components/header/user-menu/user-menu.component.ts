import { Component, HostListener, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../../auth/services/auth.service';

@Component({
  selector: 'app-user-menu',
  imports: [RouterLink],
  templateUrl: './user-menu.component.html',
  styleUrl: './user-menu.component.css',
})
export class UserMenuComponent {
  readonly menuOpen = signal(false);
  readonly authService = inject(AuthService);

  toggleMenu(): void {
    this.menuOpen.update(open => !open);
  }

  closeMenu(): void {
    this.menuOpen.set(false);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {

    const target = event.target as HTMLElement;

    if (!target.closest('.user-menu-container')) {
      this.closeMenu();
    }
  }

  logout() {
    this.authService.logout();
  }

  authenticated(){
    return this.authService.isAuthenticated();
  }
}
