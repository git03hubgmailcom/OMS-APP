import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthService } from '../../services/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Menu } from '../../models/menu.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuService } from '../../services/menu/menu.service';
import { CartItemsService } from 'src/app/services/cart/cart-items.service';
import { CartItem } from 'src/app/models/cart-item.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-menu-details',
  templateUrl: './menu-details.component.html',
  styleUrls: ['./menu-details.component.css']
})
export class MenuDetailsComponent {
  @ViewChild('sidenav') sidenav!: MatSidenav;

  isSidenavOpen: boolean = false;
  isLoggedInUser: boolean = false;
  role: string = '';

  menuDetailsForm: FormGroup;
  menu: Menu | undefined | any;


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

  constructor(private authService: AuthService, 
    private router: Router, 
    private route: ActivatedRoute, 
    private fb: FormBuilder, 
    private menuService: MenuService,
    private cartItemsService: CartItemsService ) { 
    if (!authService.isLoggedInUser()) {
      router.navigate(['/login']);
    }else{
      this.isLoggedInUser = true;
      this.role = authService.getRole();
      if(this.authService.getRole() == "admin"){
        router.navigate(['/login']);
      }
    }

    this.menuDetailsForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      stock: ['', Validators.required],
      price: ['', Validators.required],
      quantity: ['1', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params['id']; 
      this.menuService.getMenu(id).subscribe(
        (response) => {
          this.menu = response;
          console.log(this.menu);
          this.menuDetailsForm.patchValue(
            {
              name: this.menu.name,
              description: this.menu.description,
              stock: this.menu.stock,
              price: this.menu.price
            }
          );
        },
        (error) => {
          console.log(error);
        }
      );
    });
  }

  onSubmit() {
    // Handle form submission logic here
    console.log(this.menuDetailsForm.value);
    let cartItem: any  = {
      menu_id: this.menu.id,
      user_id: this.authService.getUserId(),
      quantity: this.menuDetailsForm.value.quantity,
      total_price: this.menuDetailsForm.value.quantity * this.menu.price
    };

    this.cartItemsService.createCartItem(cartItem).subscribe(
      (response) => {
        console.log(response);
        //window.location.reload();
        Swal.fire({
          title: 'Success!',
          text: 'Menu has been added to cart.',
          icon: 'success',
          confirmButtonText: 'Ok'
        }).then(() => {
          this.router.navigate(['/menu-list']);
        });
      },
      (error) => {
        console.log(error);
      }
    );

  }
}
