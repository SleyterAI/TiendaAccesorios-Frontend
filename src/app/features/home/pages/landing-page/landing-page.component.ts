import { Component } from '@angular/core';
import { RouterOutlet } from "@angular/router";
import { HeaderComponent } from '../../components/header/header.component';
import { ProductCardComponent } from '../../components/product/product-card/product-card.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css',
  imports: [
    HeaderComponent,
    ProductCardComponent,
    FooterComponent,
    RouterOutlet
],
})
export class LandingPageComponent {

}
