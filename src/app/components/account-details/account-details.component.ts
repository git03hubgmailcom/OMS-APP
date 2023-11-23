import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Account } from '../../models/account.model';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.css']
})
export class AccountDetailsComponent implements OnInit {
  account: Account | undefined | any;
  editedAccount: Account | undefined | any;
  isEditing: boolean = false;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    const accounts: Account[] = [
      {
        id: 1,
        username: 'john_doe',
        firstName: 'John',
        middleName: 'M',
        lastName: 'Doe',
        address: '123 Main St, City, Country',
        learnersId: '123456789',
        contactNumber: '123-456-7890',
        gradeLevel: '12',
        section: 'A',
        role: 'admin'
      },
      {
        id: 2,
        username: 'jane_smith',
        firstName: 'Jane',
        middleName: 'L',
        lastName: 'Smith',
        address: '456 Elm St, Town, Country',
        learnersId: '987654321',
        contactNumber: '987-654-3210',
        gradeLevel: '11',
        section: 'B',
        role: 'user'
      }
    ];

    this.route.params.subscribe(params => {
      const id = +params['id']; // Get the id parameter from the URL
      this.account = accounts.find(account => account.id === id);
      this.editedAccount = { ...this.account };

    });
  }

  toggleEditing() {
    this.isEditing = !this.isEditing;
  }

  cancelEdit() {
    // Cancel the edit and revert to the original account data
    this.isEditing = false;
    this.editedAccount = { ...this.account };
  }

  saveChanges(): void {
    this.account = this.editedAccount;
    console.log('Account details updated:', this.account);
  }
}
