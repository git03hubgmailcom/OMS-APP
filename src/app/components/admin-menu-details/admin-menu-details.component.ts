// admin-menu-details.component.ts

import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Menu } from '../../models/menu.model';

@Component({
  selector: 'app-admin-menu-details',
  templateUrl: './admin-menu-details.component.html',
  styleUrls: ['./admin-menu-details.component.css']
})
export class AdminMenuDetailsComponent implements OnInit {
  @Input() menu!: Menu;

  isEditing = false;
  editedMenu!: Menu;

  ngOnInit() {
    this.editedMenu = { ...this.menu }; // Create a copy for editing
  }

  toggleEditMode() {
    this.isEditing = !this.isEditing;
    this.editedMenu = { ...this.menu }; // Reset the edited values
  }

  saveChanges() {
    // Save the changes (e.g., send to the server)
    this.menu = { ...this.editedMenu };
    this.isEditing = false;
  }
}
