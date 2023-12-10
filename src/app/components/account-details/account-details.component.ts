import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Account } from '../../models/account.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { MatSidenav } from '@angular/material/sidenav';
import Swal from 'sweetalert2';
import { AccountService } from '../../services/user/user.service';


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

  constructor(private authService: AuthService, private fb: FormBuilder, private route: ActivatedRoute, private router: Router, private accountService: AccountService) {
    if (!authService.isLoggedInUser()) {
      router.navigate(['/login']);
    }else{
      this.isLoggedInUser = true;
      this.role = authService.getRole();
    }

    this.accountDetailsForm = this.fb.group({
      role: [{value:''}, Validators.required],
      username: ['', Validators.required],
      password: ['', (this.router.url.split('/')[1] != 'registration')?null:Validators.required],
      confirm_password: ['', (this.router.url.split('/')[1] != 'registration')?null:Validators.required],
      first_name: ['', Validators.required],
      middle_name: [{value:''}],
      last_name: [{value:''}, Validators.required],
      learner_s_id: [{value:''}, Validators.required],
      contact_number: [{value:''}, Validators.required],
      grade_level: [{value:''}, Validators.required],
      section: [{value:''}, Validators.required],
      school_year: [{value:''}, Validators.required],
    });
    
  }

  onSubmit() {
    // Handle form submission logic here
    console.log(this.accountDetailsForm.value);

    let account: Account = {
      id: this.account.id,
      username: this.accountDetailsForm.value.username,
      password: this.accountDetailsForm.value.password?this.accountDetailsForm.value.password:this.account.password,
      first_name: this.accountDetailsForm.value.first_name,
      middle_name: this.accountDetailsForm.value.middle_name,
      last_name: this.accountDetailsForm.value.last_name,
      learner_s_id: this.accountDetailsForm.value.learner_s_id,
      contact_number: this.accountDetailsForm.value.contact_number,
      grade_level: this.accountDetailsForm.value.grade_level,
      section: this.accountDetailsForm.value.section,
      school_year: this.accountDetailsForm.value.school_year,
      role: this.accountDetailsForm.value.role,
      status: this.account.status
    }

    console.log(account);
    
    this.accountService.updateAccount(this.account.id,account).subscribe(() => {
      Swal.fire({
        title: 'Success!',
        text: 'Account has been updated.',
        icon: 'success',
        confirmButtonText: 'Ok'
      }).then(() => {
        window.location.reload();
      }
      );
    });
  }

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      let id = +params['id']; 
      
      if (this.router.url.split('/')[1] == 'my-account'){
        id = +this.authService.getUserId();
      }

      console.log(id);

      if (id){
        this.account = this.accountService.getAccount(id).subscribe((account: Account) => {
          this.account = account;
          console.log(this.account);
          this.accountDetailsForm.patchValue({
            role: account.role,
            username: account.username,
            first_name: account.first_name,
            middle_name: account.middle_name,
            last_name: account.last_name,
            learner_s_id: account.learner_s_id,
            contact_number: account.contact_number,
            grade_level: account.grade_level,
            section: account.section,
            school_year: account.school_year,
          });
        });
      }
    });

    
  }

}
