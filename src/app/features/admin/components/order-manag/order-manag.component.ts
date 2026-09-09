import { DecimalPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { OrderUserService } from '../../../checkout/services/order-user.service';

import { OrderSummaryResponse } from '../../../checkout/interfaces/order.interface';
import { OrderDetailResponseDto } from '../../../checkout/interfaces/order-detail.interface';
import { RouterLink } from '@angular/router';
import { OrderDetailComponent } from "../order-detail/order-detail.component";
import { rxResource } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { ToastComponent } from "../../../../components/toast/toast.component";

type EstadoPedido =
  | 'PENDIENTE'
  | 'EN PREPARACION'
  | 'ENTREGADO';

@Component({
  selector: 'app-order-manag',
  imports: [DecimalPipe, RouterLink, ToastComponent],
  templateUrl: './order-manag.component.html',
  styleUrl: './order-manag.component.css',
})
export class OrderManagComponent {
  private readonly orderService = inject(OrderUserService);

  readonly orderResource = rxResource({
    stream: () => this.orderService.getAllOrder().pipe(
      map(data => [...data].reverse())
    ),
  });

  error = signal<string>('');
  actualizandoEstado = signal<Set<number>>(new Set());

  toastVisible = signal(false);
  toastMessage = signal('');

  showToast(message: string) {
    this.toastMessage.set(message);
    this.toastVisible.set(true);

    setTimeout(() => {
      this.toastVisible.set(false);
    }, 3000);
  }


  estados: EstadoPedido[] = [
    'PENDIENTE',
    'EN PREPARACION',
    'ENTREGADO'
  ];

  changeStatus(id: number, status: EstadoPedido) {
    this.orderService.changeStatus(id, status).subscribe({
      next: () => {
        this.showToast(`Estado cambiado a: ${status}`);
        // Recargar pedidos
        this.orderResource.reload();
      },
      error: (error) => {
        console.error('Error cambiando estado', error);
      }
    });
  }

}
