import { Component } from '@angular/core';
import { Order } from '../../models/order.model';

@Component({
  selector: 'app-admin-order-list',
  templateUrl: './admin-order-list.component.html',
  styleUrls: ['./admin-order-list.component.css']
})
export class AdminOrderListComponent {
  orders: Order[] = [
    { id: 1, customerName: 'John Doe', product: 'Widget', quantity: 2, totalPrice: 30, status: 'pending' },
    { id: 2, customerName: 'Jane Smith', product: 'Gadget', quantity: 1, totalPrice: 50, status: 'paid' },
    { id: 3, customerName: 'Jane Smith', product: 'Gadget', quantity: 1, totalPrice: 50, status: 'completed' },
    // Add more orders as needed
  ];

  displayedColumns: string[] = ['id', 'customerName', 'product', 'quantity', 'totalPrice', 'status', 'actions'];
}
