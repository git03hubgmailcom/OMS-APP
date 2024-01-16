import { Component, Input, ViewChild } from '@angular/core';
import { Order } from '../../models/order.model';
import { Account } from '../../models/account.model';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth/auth.service';
import { MatSidenav } from '@angular/material/sidenav';
import { CartItem } from 'src/app/models/cart-item.model';
import { CartItemsService } from '../../services/cart/cart-items.service';
import { OrderService } from 'src/app/services/order/order.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  @ViewChild('sidenav') sidenav!: MatSidenav;

  isSidenavOpen: boolean = false;
  isLoggedInUser: boolean = false;
  role: string = '';

  order: Order | undefined | any;

  cartItems : CartItem[] = [];
  account : Account | undefined | any;

  payment_reference : string = "";
  payment_method : string = "gcash_ref";

  getCartItems(){
    this.cartItemsService.getCartItems(this.authService.getUserId()).subscribe((cartItems) => {
      this.cartItems = cartItems;
      console.log("cartttt");
      console.log(this.cartItems);
      console.log(this.getTotal(this.cartItems, 'total_price'));
      if(this.cartItems.length == 0){
        Swal.fire({
          title: 'No items in cart!',
          text: 'You have no items in your cart.',
          icon: 'error',
          confirmButtonText: 'Ok'
        }).then((result) => {
          this.router.navigate(['/menu-list']);
        });
      }
    });
  }

  getTotal(data: CartItem[], columnName: keyof CartItem): number {
    return data.reduce((acc, item) => acc + Number(item[columnName]), 0);
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

  constructor(private route: ActivatedRoute, 
    private router: Router, 
    private authService: AuthService, 
    private cartItemsService: CartItemsService, 
    private orderService: OrderService) {
    if (!authService.isLoggedInUser()) {
      router.navigate(['/login']);
    }else{
      this.isLoggedInUser = true;
      this.role = authService.getRole();
      if(this.authService.getRole() == "admin"){
        router.navigate(['/login']);
      }
    }

    this.authService.getAccount().subscribe((account) => {
      this.account = account;
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
        this.order = {
          id: 0,
          user_id: this.account.id,
          customer: this.account,
          items: this.cartItems,
          total_price: this.getTotal(this.cartItems, 'total_price'),
          status: this.payment_method == "gcash_ref" ? "paid" : "pending",
          payment_method: this.payment_method,
          payment_reference_number: this.payment_reference,
          payment_dateTime: this.payment_method == "gcash_ref" ? new Date() : "",
          claimed_dateTime: "",
          created_dateTime: new Date()
        };

        this.orderService.createOrder(this.order).subscribe((order) => {
          this.order = order.data;
          console.log(this.order);
          Swal.fire(
            'Order Submitted!',
            'Your order has been submitted.',
            'success'
          ).then((result) => {
            this.router.navigate(['/order-details/' + this.order['id']]);
          });
        }
        );
        
      }
    });
  }



  ngOnInit(): void {

    this.route.params.subscribe(params => {
      const id = +params['id']; 

    });

    this.getCartItems();


  }

  displayedColumns: string[] = ['name', 'price', 'quantity', 'total_price'];
}
