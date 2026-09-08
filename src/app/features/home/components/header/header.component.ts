import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PrincipalButtonComponent } from './principal-button/principal-button.component';
import { DesktopNavigationComponent } from './desktop-navigation/desktop-navigation.component';
import { UserMenuComponent } from './user-menu/user-menu.component';
import { CartButtonComponent } from './cart-button/cart-button.component';
import { SearchButtonComponent } from './search-button/search-button.component';
import { MobileMenuComponent } from './mobile-menu/mobile-menu.component';
import { AuthMessageComponent } from "./auth-message/auth-message.component";

@Component({
  selector: 'app-header',
  imports: [
    PrincipalButtonComponent,
    DesktopNavigationComponent,
    SearchButtonComponent,
    UserMenuComponent,
    CartButtonComponent,
    MobileMenuComponent,
    AuthMessageComponent
],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
}
