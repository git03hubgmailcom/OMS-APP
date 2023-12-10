import { Component, ViewChild, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { Menu } from '../../models/menu.model';
import { CartItem } from '../../models/cart-item.model';
import { CartItemsService } from '../../services/cart/cart-items.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{
  @ViewChild('sidenav') sidenav!: MatSidenav;

  isSidenavOpen: boolean = false;
  isLoggedInUser: boolean = false;
  role: string = '';

  cartItems : CartItem[] = [];


  getCartItems(){
    this.cartItemsService.getCartItems().subscribe((cartItems) => {
      this.cartItems = cartItems;
      console.log(this.cartItems);
      console.log(this.getTotal(this.cartItems, 'total_price'));
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

  ngOnInit(): void {
    this.getCartItems();
  }

  constructor(private authService: AuthService, private router: Router, private cartItemsService: CartItemsService ) { 
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

  displayedColumns: string[] = ['name', 'price', 'quantity', 'subtotal', 'actions'];

  searchText: string = '';

  get filteredCartItems() {
    return this.cartItems.filter(cartItem =>
      cartItem.menu.name.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  askIfUpdate(cart_item: CartItem) {
    Swal.fire({
      title: "Are you sure you want to update this item?",
      text: "Menu: " + cart_item.menu.name + " will be updated.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update it!"
    }).then((result) => {
      if (result.isConfirmed) {
        cart_item.total_price = cart_item.menu.price * cart_item.quantity;
        if(cart_item.id){
          this.cartItemsService.updateCartItem(cart_item.id, cart_item).subscribe(() => {
            Swal.fire({
              title: "Updated!",
              text: "Menu has been updated.",
              icon: "success"
            });
            this.getCartItems();
          });
        }

      }
    });
  }

  askIfDelete(cart_item: CartItem) {
    Swal.fire({
      title: "Are you sure you want to delete this item?",
      text: "Menu: " + cart_item.menu.name + " will be deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {

        if(cart_item.id){
          this.cartItemsService.deleteCartItem(cart_item.id).subscribe(() => {
            Swal.fire({
              title: "Deleted!",
              text: "Menu has been deleted.",
              icon: "success"
            });
            this.getCartItems();
          });
        }

        /* if(account.id){
          this.accountService.deleteAccount(account.id).subscribe(() => {
            Swal.fire({
              title: "Deleted!",
              text: "Account has been deleted.",
              icon: "success"
            });
            this.fetchAccounts();
          });
        } */
      }
    });
  }
}
