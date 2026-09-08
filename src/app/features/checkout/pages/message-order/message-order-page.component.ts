import { Component } from '@angular/core';
import { HeaderComponent } from "../../../home/components/header/header.component";
import { FooterComponent } from "../../../home/components/footer/footer.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-message-order-page',
  imports: [HeaderComponent, FooterComponent, RouterLink],
  templateUrl: './message-order-page.component.html',
  styleUrl: './message-order-page.component.css',
})
export class MessageOrderPageComponent {
}
