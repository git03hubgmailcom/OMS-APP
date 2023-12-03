import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { Account } from '../../models/account.model';
import Swal from 'sweetalert2';

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
    { id: 1, username: 'john_doe', firstName: 'John', lastName: 'Doe', middleName: '', learnersId: '', contactNumber: '', gradeLevel: '', section: '', school_year: '', role: '' },
    { id: 2, username: 'jane_smith', firstName: 'Jane', lastName: 'Smith', middleName: '', learnersId: '', contactNumber: '', gradeLevel: '', section: '', school_year: '', role: '' },
    { id: 3, username: 'jane_smith', firstName: 'Jane', lastName: 'Smith', middleName: '', learnersId: '', contactNumber: '', gradeLevel: '', section: '', school_year: '', role: '' },
    { id: 3, username: 'jane_smith', firstName: 'Jane', lastName: 'Smith', middleName: '', learnersId: '', contactNumber: '', gradeLevel: '', section: '', school_year: '', role: '' },
    { id: 3, username: 'jane_smith', firstName: 'Jane', lastName: 'Smith', middleName: '', learnersId: '', contactNumber: '', gradeLevel: '', section: '', school_year: '', role: '' },
    { id: 3, username: 'jane_smith', firstName: 'Jane', lastName: 'Smith', middleName: '', learnersId: '', contactNumber: '', gradeLevel: '', section: '', school_year: '', role: '' },
    { id: 3, username: 'jane_smith', firstName: 'Jane', lastName: 'Smith', middleName: '', learnersId: '', contactNumber: '', gradeLevel: '', section: '', school_year: '', role: '' },
    { id: 3, username: 'jane_smith', firstName: 'Jane', lastName: 'Smith', middleName: '', learnersId: '', contactNumber: '', gradeLevel: '', section: '', school_year: '', role: '' },
    { id: 3, username: 'jane_smith', firstName: 'Jane', lastName: 'Smith', middleName: '', learnersId: '', contactNumber: '', gradeLevel: '', section: '', school_year: '', role: '' },
    { id: 3, username: 'jane_smith', firstName: 'Jane', lastName: 'Smith', middleName: '', learnersId: '', contactNumber: '', gradeLevel: '', section: '', school_year: '', role: '' },
    { id: 3, username: 'jane_smith', firstName: 'Jane', lastName: 'Smith', middleName: '', learnersId: '', contactNumber: '', gradeLevel: '', section: '', school_year: '', role: '' },
    { id: 3, username: 'jane_smith', firstName: 'Jane', lastName: 'Smith', middleName: '', learnersId: '', contactNumber: '', gradeLevel: '', section: '', school_year: '', role: '' },
    { id: 3, username: 'jane_smith', firstName: 'Jane', lastName: 'Smith', middleName: '', learnersId: '', contactNumber: '', gradeLevel: '', section: '', school_year: '', role: '' },
    { id: 3, username: 'jane_smith', firstName: 'Jane', lastName: 'Smith', middleName: '', learnersId: '', contactNumber: '', gradeLevel: '', section: '', school_year: '', role: '' },
    { id: 3, username: 'jane_smith', firstName: 'Jane', lastName: 'Smith', middleName: '', learnersId: '', contactNumber: '', gradeLevel: '', section: '', school_year: '', role: '' },
    // Add more accounts as needed
  ];

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
        Swal.fire({
          title: "Deleted!",
          text: "Account has been deleted.",
          icon: "success"
        });
      }
    });
  }

}
