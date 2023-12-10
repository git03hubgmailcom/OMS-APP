// admin-menu-details.component.ts

import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Menu } from '../../models/menu.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { MatSidenav } from '@angular/material/sidenav';
import { MenuService } from '../../services/menu/menu.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-menu-details',
  templateUrl: './admin-menu-details.component.html',
  styleUrls: ['./admin-menu-details.component.css']
})
export class AdminMenuDetailsComponent implements OnInit {
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

  constructor(private authService: AuthService, private fb: FormBuilder, private route: ActivatedRoute, private router: Router, private menuService: MenuService) {
    if (!authService.isLoggedInUser()) {
      router.navigate(['/login']);
    }

    this.menuDetailsForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      stock: ['', Validators.required],
      price: ['', Validators.required]
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

    if (this.menu) {
      this.menuService.updateMenu(this.menu.id, this.menuDetailsForm.value).subscribe(
        (response) => {
          console.log(response);
          Swal.fire({
            title: 'Success!',
            text: 'Menu has been updated.',
            icon: 'success',
            confirmButtonText: 'Ok'
          }).then(() => {
            window.location.reload();
          });
        },
        (error) => {
          console.log(error);
          Swal.fire({
            title: 'Error!',
            text: 'Something went wrong.',
            icon: 'error',
            confirmButtonText: 'Ok'
          });
        }
      );
    }else{
      this.menuService.createMenu(this.menuDetailsForm.value).subscribe(
        (response) => {
          console.log(response);
          Swal.fire({
            title: 'Success!',
            text: 'Menu has been added.',
            icon: 'success',
            confirmButtonText: 'Ok'
          }).then(() => {
            this.router.navigate(['/admin-menu-list']);
          });
        },
        (error) => {
          console.log(error);
          Swal.fire({
            title: 'Error!',
            text: 'Something went wrong.',
            icon: 'error',
            confirmButtonText: 'Ok'
          });
        }
      );
    }


  }

}
