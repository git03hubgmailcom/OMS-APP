import { Component, Input } from '@angular/core';
import { Order } from '../../models/order.model';

@Component({
  selector: 'app-admin-order-details',
  templateUrl: './admin-order-details.component.html',
  styleUrls: ['./admin-order-details.component.css']
})
export class AdminOrderDetailsComponent {
  //@Input() order!: Order;
  order: Order = { id: 1, customerName: 'John Doe', product: 'Widget', quantity: 2, totalPrice: 30, status: 'pending' };
}
