import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

interface Account {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
}

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.css']
})
export class AccountListComponent {


  constructor(private authService: AuthService, private router: Router) {
    if (!authService.isLoggedInUser()) {
      router.navigate(['/login']);
    }
  }

  accounts: Account[] = [
    { id: 1, username: 'john_doe', firstName: 'John', lastName: 'Doe' },
    { id: 2, username: 'jane_smith', firstName: 'Jane', lastName: 'Smith' },
    // Add more accounts as needed
  ];

  displayedColumns: string[] = ['id', 'username', 'actions'];
  searchText: string = '';

  get filteredAccounts() {
    return this.accounts.filter(account =>
      account.username.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }


}
