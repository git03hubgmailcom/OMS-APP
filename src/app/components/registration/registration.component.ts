import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';
import { AccountService} from '../../services/user/user.service';
import { Account } from 'src/app/models/account.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  @ViewChild('sidenav') sidenav!: MatSidenav;

  isSidenavOpen: boolean = false;
  isLoggedInUser: boolean = false;
  role: string = '';

  registrationForm: FormGroup;

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

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private accountService: AccountService) {
    if (!authService.isLoggedInUser()) {
      router.navigate(['/login']);
    }

    this.registrationForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirm_password: ['', Validators.required],
      first_name: ['', Validators.required],
      middle_name: [''],
      last_name: ['', Validators.required],
      learner_s_id: ['', Validators.required],
      contact_number: ['', Validators.required],
      grade_level: ['', Validators.required],
      section: ['', Validators.required],
      school_year: ['', Validators.required],
      role: ['', Validators.required],
      status: ['', Validators.required],
    });
  }

  onSubmit() {
    // Handle form submission logic here
    //console.log(this.registrationForm.value);
    let account: Account = {
      id: undefined,
      username: this.registrationForm.value.username,
      password: this.registrationForm.value.password,
      first_name: this.registrationForm.value.first_name,
      middle_name: this.registrationForm.value.middle_name,
      last_name: this.registrationForm.value.last_name,
      learner_s_id: this.registrationForm.value.learner_s_id,
      contact_number: this.registrationForm.value.contact_number,
      grade_level: this.registrationForm.value.grade_level,
      section: this.registrationForm.value.section,
      school_year: this.registrationForm.value.school_year,
      role: this.registrationForm.value.role,
      status: this.registrationForm.value.status
    }

    console.log(account);
    
    this.accountService.createAccount(account).subscribe(() => {
      Swal.fire({
        title: 'Success!',
        text: 'Account has been created.',
        icon: 'success',
        confirmButtonText: 'Ok'
      }).then(() => {
        this.router.navigate(['/accounts']);
      }
      );
    });
    
  }
}
