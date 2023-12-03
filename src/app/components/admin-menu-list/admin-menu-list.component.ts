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
      id: 2,
      name: 'Maha',
      description: 'Maha',
      price: 15,
      stock: 20
    },
    {
      id: 3,
      name: 'Bico',
      description: 'Bico',
      price: 15,
      stock: 30
    },
    {
      id: 4,
      name: 'Shawarma Rice',
      description: '',
      price: 50,
      stock: 30
    },
    {
      id: 5,
      name: 'Pork sisig w/ rice',
      description: '',
      price: 50,
      stock: 30
    },
    {
      id: 6,
      name: 'Pork menudo w/ rice',
      description: '',
      price: 65,
      stock: 30
    },
    {
      id: 7,
      name: 'Fried porkchop w/ rice',
      description: '',
      price: 65,
      stock: 30
    },
    {
      id: 5,
      name: 'Sweet n sour bola 2x w/ rice',
      description: '',
      price: 50,
      stock: 30
    },
    {
      id: 5,
      name: 'Adobong sitaw w/ rice',
      description: '',
      price: 50,
      stock: 30
    },
    {
      id: 5,
      name: 'Embutido and egg w/ rice',
      description: '',
      price: 45,
      stock: 30
    },
    {
      id: 5,
      name: 'Spaghetti',
      description: '',
      price: 30,
      stock: 30
    },
    {
      id: 5,
      name: 'Pillows',
      description: '',
      price: 12,
      stock: 30
    },
    {
      id: 5,
      name: 'Choco mucho bar',
      description: '',
      price: 12,
      stock: 30
    },
    {
      id: 5,
      name: 'Choco mucho sandwich',
      description: '',
      price: 20,
      stock: 30
    },
    {
      id: 5,
      name: 'Bread pan',
      description: '',
      price: 9,
      stock: 30
    },
    {
      id: 5,
      name: 'Fudgee bar',
      description: '',
      price: 10,
      stock: 30
    },
    {
      id: 5,
      name: 'Panda',
      description: '',
      price: 15,
      stock: 30
    },
    {
      id: 5,
      name: 'Chuckee chummy',
      description: '',
      price: 12,
      stock: 30
    },
    {
      id: 5,
      name: 'Sponge',
      description: '',
      price: 12,
      stock: 30
    },
    {
      id: 5,
      name: 'Green tea',
      description: '',
      price: 25,
      stock: 30
    },
    {
      id: 5,
      name: 'Smart C',
      description: '',
      price: 35,
      stock: 30
    },
    {
      id: 5,
      name: 'Tubig',
      description: '',
      price: 12,
      stock: 30
    },
    {
      id: 5,
      name: 'Gulaman',
      description: '',
      price: 10,
      stock: 30
    },
    {
      id: 5,
      name: 'Siomai',
      description: '',
      price: 25,
      stock: 30
    },
    {
      id: 5,
      name: 'Siomai rice',
      description: '',
      price: 40,
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
