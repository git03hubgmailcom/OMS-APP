import { Component, Input, ViewChild } from '@angular/core';
import { Order } from '../../models/order.model';
import { Account } from '../../models/account.model';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth/auth.service';
import { MatSidenav } from '@angular/material/sidenav';
import { OrderService } from 'src/app/services/order/order.service';
import { ZXingScannerModule } from '@zxing/ngx-scanner';

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

  payment_reference: string = '';
  payment_method: string = '';

  qrData: string = '';

  scannedCode: string = '';

  handleFileInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const file = inputElement.files?.[0];

    if (file) {
      this.readQrCodeFromFile(file);
    }
  }

  readQrCodeFromFile(file: File): void {
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      console.log('Uploaded QR code:', result);
      // Implement your logic with the uploaded QR code result
    };
    reader.readAsText(file);
  }

  onCodeScanned(result: any) {
    this.scannedCode = result.code;
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

  constructor(private route: ActivatedRoute, private router: Router, private authService: AuthService, private orderService: OrderService) {
    if (!authService.isLoggedInUser()) {
      router.navigate(['/login']);
    }else{
      this.isLoggedInUser = true;
      this.role = authService.getRole();
      if(this.authService.getRole() == "admin"){
        router.navigate(['/login']);
      }
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
      console.log("order");
      console.log(this.order);
      this.qrData = this.formatNumberWithZeroPrefix(this.order.id, 4);

      this.payment_method = this.order.payment_method;
      if(this.order.payments.length > 0){
        this.payment_reference = this.order.payments[0].reference_number;
        this.payment_method = this.order.payments[0].method;
        console.log(this.payment_method);
      }
    });
  }

  formatNumberWithZeroPrefix(number: number, length: number): string {
    return String(number).padStart(length, '0');
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
          }).then((result) => {
  
          });
        }
        );
        
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
        this.order.status = this.payment_method=="gcash_ref"?"paid":"pending";
        this.orderService.updateOrder(this.order.id, this.order).subscribe((order) => {
          this.getOrder(this.order.id);
          console.log(this.order);
          Swal.fire(
            'Order Submitted!',
            'Your order has been submitted.',
            'success'
          ).then((result) => {
  
          });
        }
        );

        
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
