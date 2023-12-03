import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Account } from '../../models/account.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.css']
})
export class AccountDetailsComponent implements OnInit {
  accountDetailsForm: FormGroup;
  account: Account | undefined | any;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router) {
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
