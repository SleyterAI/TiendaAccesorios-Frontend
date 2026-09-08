import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { IntroductionComponent } from "../../components/header/introduction/introduction.component";
import { CategoriesComponent } from '../../components/body/categories.component';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css',
  imports: [
    HeaderComponent,
    IntroductionComponent,
    CategoriesComponent,
    FooterComponent,
    IntroductionComponent
],
})
export class LandingPageComponent {

}
