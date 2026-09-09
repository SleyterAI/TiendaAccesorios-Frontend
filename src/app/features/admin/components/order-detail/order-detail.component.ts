import { Component, inject, signal } from "@angular/core";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { OrderUserService } from "../../../checkout/services/order-user.service";
import { rxResource, toSignal } from "@angular/core/rxjs-interop";
import { DecimalPipe } from "@angular/common";

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrl: './order-detail.component.css',
  imports: [
    DecimalPipe, RouterLink
  ],
})
export class OrderDetailComponent {
  private route = inject(ActivatedRoute);
  private orderService = inject(OrderUserService);

  readonly orderResource = rxResource({
    stream: () => {
      const id = Number(this.route.snapshot.paramMap.get('id'));
      return this.orderService.getOrderById(id);
    },
  });
}

