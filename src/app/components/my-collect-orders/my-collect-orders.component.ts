import { Component, ViewChild } from '@angular/core';
import { Order } from '../../models/order.model';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-my-collect-orders',
  templateUrl: './my-collect-orders.component.html',
  styleUrl: './my-collect-orders.component.css'
})
export class MyCollectOrdersComponent {
  @ViewChild('sidenav') sidenav!: MatSidenav;

  isSidenavOpen: boolean = false;
  isLoggedInUser: boolean = false;
  role: string = '';

  orders: Order[] = [
    { 
      id: 1, 
      customer: { 
        id: 1, 
        username: '', 
        firstName: '', 
        middleName: '', 
        lastName: '', 
        learnersId: '', 
        contactNumber: '', 
        gradeLevel: '', 
        section: '', 
        school_year: '', 
        role: '' 
      }, 
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
      customer: { 
        id: 2, 
        username: '', 
        firstName: '', 
        middleName: '', 
        lastName: '', 
        learnersId: '', 
        contactNumber: '', 
        gradeLevel: '', 
        section: '', 
        school_year: '', 
        role: '' 
      }, 
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
      customer: { 
        id: 3, 
        username: '', 
        firstName: '', 
        middleName: '', 
        lastName: '', 
        learnersId: '', 
        contactNumber: '', 
        gradeLevel: '', 
        section: '', 
        school_year: '', 
        role: '' 
      }, 
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

  toggleSidenav() {
    if (this.sidenav) {
      this.sidenav.toggle();
    }
  }

  logout() {
    this.authService.logout();
    this.toggleSidenav();
    this.isLoggedInUser = false;
  }

  constructor(private authService: AuthService, private router: Router) { 
    if (!authService.isLoggedInUser()) {
      router.navigate(['/login']);
    }else{
      this.isLoggedInUser = true;
      this.role = authService.getRole();
    }
  }

  displayedColumns: string[] = ['id', 'customer', 'totalPrice', 'status', 'date', 'actions'];
  searchText: string = '';
  
  get filteredOrders() {
    return this.orders.filter(order =>
      order.id && order.id.toString().includes(this.searchText.toLowerCase())
    );
  }
}