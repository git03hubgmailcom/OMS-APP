import { Component, Input, ViewChild } from '@angular/core';
import { Order } from '../../models/order.model';
import { Account } from '../../models/account.model';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth/auth.service';
import { MatSidenav } from '@angular/material/sidenav';
import { OrderService } from 'src/app/services/order/order.service';

@Component({
  selector: 'app-admin-order-details',
  templateUrl: './admin-order-details.component.html',
  styleUrls: ['./admin-order-details.component.css']
})
export class AdminOrderDetailsComponent {
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

  constructor(private route: ActivatedRoute, 
    private router: Router, 
    private authService: AuthService, 
    private orderService: OrderService) {
    if (!authService.isLoggedInUser()) {
      router.navigate(['/login']);
    }
  }

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      const id = +params['id']; 
      this.getOrder(id);
    });

    
  }

  getOrder(id: number) {
    this.orderService.getOrder(id).subscribe((order) => {
      this.order = order;
      console.log(this.order);
    });
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
        this.order.status = "cancelled";
        this.orderService.updateOrder(this.order.id, this.order).subscribe((order) => {
          this.getOrder(this.order.id);
          console.log(this.order);
          Swal.fire({
            title: "Cancelled!",
            text: "Order has been cancelled.",
            icon: "success"
          });
        }
        );

      }
    });
  }

  askIfReject() {
    Swal.fire({
      title: "Are you sure you want to reject this order?",
      text: "Order: " + this.order.id + " will be rejected.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, reject it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.order.status = "rejected";
        this.orderService.updateOrder(this.order.id, this.order).subscribe((order) => {
          this.getOrder(this.order.id);
          console.log(this.order);
          Swal.fire({
            title: "Rejected!",
            text: "Order has been rejected.",
            icon: "success"
          });
        }
        );
      }
    });
  }

  askIfAccept() {
    Swal.fire({
      title: "Are you sure you want to accept this order?",
      text: "Order: " + this.order.id + " will be accepted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, accept it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.order.status = "accepted";
        this.orderService.updateOrder(this.order.id, this.order).subscribe((order) => {
          this.getOrder(this.order.id);
          console.log(this.order);
          Swal.fire({
            title: "Accepted!",
            text: "Order has been accepted.",
            icon: "success"
          });
        }
        );

      }
    });
  }

  askIfReadyForPickup() {
    Swal.fire({
      title: "Are you sure you want to make this order ready for pick up?",
      text: "Order: " + this.order.id + " will be ready for pick up.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, make it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.order.status = "ready-for-pickup";
        this.orderService.updateOrder(this.order.id, this.order).subscribe((order) => {
          this.getOrder(this.order.id);
          console.log(this.order);
          Swal.fire({
            title: "Ready!",
            text: "Order has been made ready for pick up.",
            icon: "success"
          });
        }
        );
      }
    });
  }

  askIfComplete() {
    Swal.fire({
      title: "Are you sure you want to complete this order?",
      text: "Order: " + this.order.id + " will be completed.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, complete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.order.status = "completed";
        this.orderService.updateOrder(this.order.id, this.order).subscribe((order) => {
          this.getOrder(this.order.id);
          console.log(this.order);
          Swal.fire({
            title: "Completed!",
            text: "Order has been completed.",
            icon: "success"
          });
        }
        );
      }
    });
  }
}
