import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  registrationForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.registrationForm = this.fb.group({
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
    console.log(this.registrationForm.value);
  }
}
