// admin-menu-list.component.ts

import { Component, ViewChild } from '@angular/core';
import { Menu } from '../../models/menu.model';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-admin-menu-list',
  templateUrl: './admin-menu-list.component.html',
  styleUrls: ['./admin-menu-list.component.css']
})
export class AdminMenuListComponent {
  @ViewChild('sidenav') sidenav!: MatSidenav;

  isSidenavOpen: boolean = false;
  isLoggedInUser: boolean = false;
  role: string = '';

  adminMenus : Menu[] = [
    {
      id: 1,
      name: 'Menu 1',
      description: 'Description 1',
      price: 100,
      stock: 10
    },
    {
      id: 2,
      name: 'Menu 2',
      description: 'Description 2',
      price: 200,
      stock: 20
    },
    {
      id: 3,
      name: 'Menu 3',
      description: 'Description 3',
      price: 300,
      stock: 30
    }
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

  constructor(private authService: AuthService, private router: Router ) { 
    if (!authService.isLoggedInUser()) {
      router.navigate(['/login']);
    }
  }

  displayedColumns: string[] = ['id', 'name', 'price', 'stock', 'actions'];

  searchText: string = '';

  get filteredMenus() {
    return this.adminMenus.filter(menu =>
      menu.name.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  askIfDelete(menu: Menu) {
    Swal.fire({
      title: "Are you sure you want to delete this menu item?",
      text: "Menu Item: " + menu.name + " will be deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Menu item has been deleted.",
          icon: "success"
        });
      }
    });
  }
}
