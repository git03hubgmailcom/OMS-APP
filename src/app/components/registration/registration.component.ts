import { Component } from '@angular/core';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  username: string = '';
  password: string = '';
  firstName: string = '';
  middleName: string = '';
  lastName: string = '';
  address: string = '';
  learnersId: string = '';
  contactNumber: string = '';
  gradeLevel: string = '';
  section: string = '';

  register() {
    // Add your registration logic here
    console.log('Registration data:', {
      username: this.username,
      password: this.password,
      firstName: this.firstName,
      middleName: this.middleName,
      lastName: this.lastName,
      address: this.address,
      learnersId: this.learnersId,
      contactNumber: this.contactNumber,
      gradeLevel: this.gradeLevel,
      section: this.section
    });
  }
}
