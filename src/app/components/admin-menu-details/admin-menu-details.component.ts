// admin-menu-details.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-menu-details',
  templateUrl: './admin-menu-details.component.html',
  styleUrls: ['./admin-menu-details.component.css']
})
export class AdminMenuDetailsComponent implements OnInit {
  adminMenu: any; // Replace 'any' with the actual type of your admin menu data
  isEditing = false;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    // Fetch initial admin menu details
    this.route.params.subscribe(params => {
      const adminMenuId = +params['id']; // Convert the parameter to a number
      this.adminMenu = this.fetchAdminMenuDetails(adminMenuId);
    });
  }

  fetchAdminMenuDetails(adminMenuId: number): any {
    // Example data, replace with your actual data fetching logic
    return { id: adminMenuId, name: `Menu ${adminMenuId}` };
  }

  toggleEditMode() {
    this.isEditing = true;
  }

  saveChanges() {
    // Save changes logic (e.g., send request to update the server)
    // After saving, switch back to display mode
    this.isEditing = false;
  }

  cancelEdit() {
    // Cancel edit and switch back to display mode without saving changes
    this.isEditing = false;
  }
}
