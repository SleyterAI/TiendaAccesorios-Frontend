import { Component } from '@angular/core';
import { HeaderComponent } from "../../../home/components/header/header.component";
import { RegisterFormComponent } from "../../components/register-form/register-form.component";
import { FooterComponent } from "../../../home/components/footer/footer.component";

@Component({
  selector: 'app-register-page',
  imports: [HeaderComponent, FooterComponent, RegisterFormComponent],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css',
})
export class RegisterPageComponent {

}
