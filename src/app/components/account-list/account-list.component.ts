import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { Account } from '../../models/account.model';
import Swal from 'sweetalert2';
import { MatSidenav } from '@angular/material/sidenav';
import { AccountService } from '../../services/user/user.service';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.css']
})
export class AccountListComponent {
  @ViewChild('sidenav') sidenav!: MatSidenav;

  isSidenavOpen: boolean = false;
  isLoggedInUser: boolean = false;
  role: string = '';

  accounts: Account[] = [];

  constructor(private authService: AuthService, private router: Router, private accountService: AccountService) {
    if (!authService.isLoggedInUser()) {
      router.navigate(['/login']);
    }else{
      this.isLoggedInUser = true;
      this.role = authService.getRole();
    }

    this.fetchAccounts();
   
  }

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


  fetchAccounts() {
    this.accountService.getAccounts().subscribe((accounts: Account[]) => {
      this.accounts = accounts;
      console.log("Data from API: ", this.accounts);
    });
  }


  displayedColumns: string[] = ['learner_s_id', 'full_name', 'grade_level', 'section', 'school_year', 'actions'];
  searchText: string = '';

  get filteredAccounts() {
    return this.accounts.filter(account =>
      account.username && account.username.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }



  askIfDelete(account: Account) {
    Swal.fire({
      title: "Are you sure you want to delete this account?",
      text: "Account: " + account.username + " will be deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        if(account.id){
          this.accountService.deleteAccount(account.id).subscribe(() => {
            Swal.fire({
              title: "Deleted!",
              text: "Account has been deleted.",
              icon: "success"
            });
            this.fetchAccounts();
          });
        }
      }
    });
  }

}
