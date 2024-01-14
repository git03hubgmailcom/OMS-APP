import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { Menu } from '../../models/menu.model';
import Swal from 'sweetalert2';
import { MenuService } from '../../services/menu/menu.service';

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

  constructor(private authService: AuthService, private router: Router, private menuService: MenuService)  { 
    if (!authService.isLoggedInUser()) {
      router.navigate(['/login']);
    }else{
      this.isLoggedInUser = true;
      this.role = authService.getRole();
      if(this.authService.getRole() == "admin"){
        router.navigate(['/login']);
      }
    }

    this.fetchMenus();
  }

  displayedColumns: string[] = ['id', 'name', 'price', 'stock', 'actions'];

  searchText: string = '';

  get filteredMenus() {
    return this.adminMenus.filter(menu =>
      menu.name.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  fetchMenus() {
    this.menuService.getMenus().subscribe((menus: Menu[]) => {
      this.adminMenus = menus;
      console.log("Data from API2: ", this.adminMenus);
    });
  }
}
