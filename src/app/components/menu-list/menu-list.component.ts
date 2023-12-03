import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { Menu } from '../../models/menu.model';


@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.css']
})
export class MenuListComponent {
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
}
