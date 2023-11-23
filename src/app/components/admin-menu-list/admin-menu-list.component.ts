// admin-menu-list.component.ts

import { Component } from '@angular/core';


@Component({
  selector: 'app-admin-menu-list',
  templateUrl: './admin-menu-list.component.html',
  styleUrls: ['./admin-menu-list.component.css']
})
export class AdminMenuListComponent {
  // Dummy admin menu data, replace it with your actual data
  adminMenus = [
    { id: 1, name: 'Menu 1' },
    { id: 2, name: 'Menu 2' },
    { id: 3, name: 'Menu 3' },
    // Add more admin menus as needed
  ];

  displayedColumns: string[] = ['id', 'name', 'actions'];
}
