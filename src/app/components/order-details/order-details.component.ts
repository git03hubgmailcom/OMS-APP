import { Component, Input, ViewChild } from '@angular/core';
import { Order } from '../../models/order.model';
import { Account } from '../../models/account.model';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth/auth.service';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent {
  @ViewChild('sidenav') sidenav!: MatSidenav;

  isSidenavOpen: boolean = false;
  isLoggedInUser: boolean = false;
  role: string = '';

  order: Order | undefined | any;

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

  constructor(private route: ActivatedRoute, private router: Router, private authService: AuthService) {
    if (!authService.isLoggedInUser()) {
      router.navigate(['/login']);
    }else{
      this.isLoggedInUser = true;
      this.role = authService.getRole();
    }
  }

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      const id = +params['id']; 

    });

    this.order = {
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
    };
  }

  displayedColumns: string[] = ['name', 'price', 'quantity', 'totalPrice'];

  askIfCancel() {
    Swal.fire({
      title: "Are you sure you want to cancel this order?",
      text: "Order: " + this.order.id + " will be cancelled.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, cancel it!"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Cancelled!",
          text: "Order has been cancelled.",
          icon: "success"
        });
      }
    });
  }

  submitOrder() {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You are about to submit your order.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, submit my order!',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Order Submitted!',
          'Your order has been submitted.',
          'success'
        ).then((result) => {

        });
      }/*  else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Order Cancelled',
          'Your order has not been submitted.',
          'error'
        ).then((result) => {
          this.router.navigate(['/cart']);
        });
      } */
    });
  }
}
