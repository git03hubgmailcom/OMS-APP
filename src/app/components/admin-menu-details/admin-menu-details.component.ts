// admin-menu-details.component.ts

import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Menu } from '../../models/menu.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-admin-menu-details',
  templateUrl: './admin-menu-details.component.html',
  styleUrls: ['./admin-menu-details.component.css']
})
export class AdminMenuDetailsComponent implements OnInit {
  menuDetailsForm: FormGroup;
  account: Menu | undefined | any;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router) {
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
