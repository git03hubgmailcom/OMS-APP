// admin-menu-details.component.ts

import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Menu } from '../../models/menu.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { MatSidenav } from '@angular/material/sidenav';

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
  account: Menu | undefined | any;

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

  constructor(private authService: AuthService, private fb: FormBuilder, private route: ActivatedRoute, private router: Router) {
    if (!authService.isLoggedInUser()) {
      router.navigate(['/login']);
    }

    this.menuDetailsForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      firstName: ['', Validators.required],
      middleName: [''],
      lastName: ['', Validators.required],
      address: ['', Validators.required],
      learnersId: ['', Validators.required],
      contactNumber: ['', Validators.required],
      gradeLevel: ['', Validators.required],
      section: ['', Validators.required],
    });
  }

  ngOnInit(): void {
      this.route.params.subscribe(params => {
        const id = +params['id']; 
  
      });
  }

  onSubmit() {
    // Handle form submission logic here
    console.log(this.menuDetailsForm.value);
  }

}
