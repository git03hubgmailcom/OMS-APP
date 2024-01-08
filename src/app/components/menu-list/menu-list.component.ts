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

  adminMenus : Menu[] = [/* {
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
    } */
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
