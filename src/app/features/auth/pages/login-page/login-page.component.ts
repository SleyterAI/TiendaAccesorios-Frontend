import { Component } from '@angular/core';
import { HeaderComponent } from "../../../home/components/header/header.component";
import { FooterComponent } from "../../../home/components/footer/footer.component";
import { LoginFormComponent } from "../../components/login-form/login-form.component";

@Component({
  selector: 'app-login-page',
  imports: [HeaderComponent, FooterComponent, LoginFormComponent],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
})
export class LoginPageComponent {

}
