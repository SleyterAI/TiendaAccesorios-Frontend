import { Component } from '@angular/core';
import { HeaderComponent } from "../../../home/components/header/header.component";
import { RouterOutlet, RouterLinkWithHref, RouterLink } from '@angular/router';
import { FooterComponent } from "../../../home/components/footer/footer.component";

@Component({
  selector: 'app-admin-page',
  imports: [HeaderComponent, RouterOutlet, FooterComponent, RouterLinkWithHref,RouterLink],
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.css',
})
export class AdminPageComponent {

}
