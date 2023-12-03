import { Component } from '@angular/core';
import { Order } from '../../models/order.model';
import { Account } from '../../models/account.model';

@Component({
  selector: 'app-admin-order-list',
  templateUrl: './admin-order-list.component.html',
  styleUrls: ['./admin-order-list.component.css']
})


@Component({
  selector: 'app-admin-order-list',
  templateUrl: './admin-order-list.component.html',
  styleUrls: ['./admin-order-list.component.css']
})
export class AdminOrderListComponent {
  orders: Order[] = [
    { 
      id: 1, 
      customer: { id: 1, name: 'John Doe', username: '', firstName: '', middleName: '', lastName: '', learnersId: '', contactNumber: '', gradeLevel: '', section: '' } as unknown as Account, 
      items: [],
      totalPrice: 30, 
      status: 'pending',
      paymentMethod: '',
      paymentReferenceNumber: '',
      paymentDateTime: new Date(),
      claimedDateTime: new Date(),
      createdDateTime: new Date()
    },
    { 
      id: 2, 
      customer: { id: 2, name: 'Jane Smith', username: '', firstName: '', middleName: '', lastName: '', learnersId: '', contactNumber: '', gradeLevel: '', section: '' } as unknown as Account, 
      items: [],
      totalPrice: 50, 
      status: 'paid',
      paymentMethod: '',
      paymentReferenceNumber: '',
      paymentDateTime: new Date(),
      claimedDateTime: new Date(),
      createdDateTime: new Date()
    },
    { 
      id: 3, 
      customer: { id: 2, name: 'Jane Smith', username: '', firstName: '', middleName: '', lastName: '', learnersId: '', contactNumber: '', gradeLevel: '', section: '' } as unknown as Account, 
      items: [],
      totalPrice: 50, 
      status: 'completed',
      paymentMethod: '',
      paymentReferenceNumber: '',
      paymentDateTime: new Date(),
      claimedDateTime: new Date(),
      createdDateTime: new Date()
    },
  ];

  displayedColumns: string[] = ['id', 'customer', 'totalPrice', 'status', 'actions'];
}
