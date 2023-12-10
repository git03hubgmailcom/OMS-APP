import { Component, ViewChild } from '@angular/core';
import { Order } from '../../models/order.model';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';
import Swal from 'sweetalert2';
import { OrderService } from '../../services/order/order.service';

@Component({
  selector: 'app-admin-order-list',
  templateUrl: './admin-order-list.component.html',
  styleUrls: ['./admin-order-list.component.css']
})

export class AdminOrderListComponent {
  @ViewChild('sidenav') sidenav!: MatSidenav;

  isSidenavOpen: boolean = false;
  isLoggedInUser: boolean = false;
  role: string = '';

  orders: Order[] = [];

  ngOnInit(): void {
    this.isLoggedInUser = this.authService.isLoggedInUser();
    this.role = this.authService.getRole();
    this.getOrders();
  }
  
  getOrders() {
    this.orderService.getOrders().subscribe((orders) => {
      this.orders = orders;
      console.log(this.orders);
    });
  }

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

  constructor(private authService: AuthService, private router: Router, private orderService: OrderService) { 
    if (!authService.isLoggedInUser()) {
      router.navigate(['/login']);
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
