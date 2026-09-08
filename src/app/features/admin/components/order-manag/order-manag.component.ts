import { DecimalPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { OrderUserService } from '../../../checkout/services/order-user.service';

import { OrderSummaryResponse } from '../../../checkout/interfaces/order.interface';
import { OrderDetailResponse } from '../../../checkout/interfaces/order-detail.interface';

type EstadoPedido =
  | 'pendiente'
  | 'en preparacion'
  | 'entregado';

@Component({
  selector: 'app-order-manag',
  imports: [DecimalPipe],
  templateUrl: './order-manag.component.html',
  styleUrl: './order-manag.component.css',
})
export class OrderManagComponent {
  private orderService = inject(OrderUserService);

  //se necesita hacer update a ordedetailresponse
  //2 interfaces
  //1era: solo ordersummary click -> 2da interfaz
  //2da: aca se usa getOrderById
  //      el backend retorna full data
  orderSummary: OrderSummaryResponse[] = [];
  cargando = false;
  error = '';

  estados: EstadoPedido[] = [
    'pendiente',
    'en preparacion',
    'entregado'
  ];

  ngOnInit(): void {
    this.getAllOrder();
  }

  getAllOrder(): void {
    this.cargando = true;
    this.error = '';

    this.orderService.getAllOrder().subscribe({
      next: (data) => {
        this.orderSummary = [...data].reverse();
        this.cargando = false;
      },

      error: (err) => {
        console.error('Error al obtener productos:', err);
        this.error = 'No se pudieron cargar los productos';
        this.cargando = false;
      }
    });
  }

  actualizandoEstado = new Set<number>();

/*
  changeStatus(orderSummary: OrderSummaryResponse, nuevoEstado: string): void {

    // Si seleccionó el mismo estado,
    // no hacemos ninguna petición.
    if (orderSummary.order_status === nuevoEstado) { return; }

    if (this.actualizandoEstado.has(orderSummary.order_id)) { return; }

    const estadoAnterior = orderSummary.order_status;

    this.actualizandoEstado.add(orderSummary.order_id);
    // Actualizamos visualmente
    orderSummary.order_status = nuevoEstado;

    this.orderService.changeStatus(orderSummary.order_id, nuevoEstado).subscribe({
      next: (pedidoActualizado) => {
        const index = this.orderSummary.findIndex(
          p => p.order_id === pedidoActualizado.order_id);

        if (index !== -1) {
          this.orderSummary[index] = pedidoActualizado;
        }
        this.actualizandoEstado.delete(orderSummary.order_id);
      },

      error: (err) => {
        console.error('Error al cambiar estado:', err);

        // Si falla el backend,
        // recuperamos el estado anterior.
        orderSummary.order_status = estadoAnterior;
        this.actualizandoEstado.delete(orderSummary.order_id);
        this.error = 'No se pudo actualizar el estado del pedido';
      }

    });
  }*/

  getEstadoClass(estado: string): string {

    switch (estado.toLowerCase()) {
      case 'pendiente':
        return 'estado-pendiente';

      case 'en preparacion':
        return 'estado-preparacion';

      case 'entregado':
        return 'estado-entregado';

      default:
        return '';
    }
  }

  getEstadoLabel(estado: string): string {

    switch (estado.toLowerCase()) {
      case 'pendiente':
        return 'Pendiente';

      case 'en preparacion':
        return 'En preparación';

      case 'entregado':
        return 'Entregado';

      default:
        return estado;
    }
  }
}
