import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Account } from '../../models/account.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.css']
})
export class AccountDetailsComponent implements OnInit {
  @ViewChild('sidenav') sidenav!: MatSidenav;

  isSidenavOpen: boolean = false;
  isLoggedInUser: boolean = false;
  role: string = '';

  accountDetailsForm: FormGroup;
  account: Account | undefined | any;

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
    }else{
      this.isLoggedInUser = true;
      this.role = authService.getRole();
    }

    console.log("role",this.role);

    this.accountDetailsForm = this.fb.group({
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

  onSubmit() {
    // Handle form submission logic here
    console.log(this.accountDetailsForm.value);
  }

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      const id = +params['id']; 

    });
  }

}
