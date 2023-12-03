import { Component, Input } from '@angular/core';
import { Order } from '../../models/order.model';
import { Account } from '../../models/account.model';

@Component({
  selector: 'app-admin-order-details',
  templateUrl: './admin-order-details.component.html',
  styleUrls: ['./admin-order-details.component.css']
})
export class AdminOrderDetailsComponent {
  
  order: Order = { 
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
  };
}
