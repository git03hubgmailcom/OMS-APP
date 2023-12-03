import { Component, ViewChild } from '@angular/core';
import { Order } from '../../models/order.model';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';
import { Collection } from '../../models/collections.model';

@Component({
  selector: 'app-my-collections',
  templateUrl: './my-collections.component.html',
  styleUrl: './my-collections.component.css'
})
export class MyCollectionsComponent {
  @ViewChild('sidenav') sidenav!: MatSidenav;

  isSidenavOpen: boolean = false;
  isLoggedInUser: boolean = false;
  role: string = '';

  collections: Collection[] = [
    {
      id: 1,
      collector: {
        id: 1,
        username: '',
        firstName: '',
        middleName: '',
        lastName: '',
        learnersId: '',
        contactNumber: '',
        gradeLevel: '',
        section: '',
        school_year: '',
        role: ''
      },
      orders: [
        {
          id: 1,
          customer: {
            id: 1,
            username: '',
            firstName: '',
            middleName: '',
            lastName: '',
            learnersId: '',
            contactNumber: '',
            gradeLevel: '',
            section: '',
            school_year: '',
            role: ''
          },
          items: [],
          totalPrice: 30,
          status: 'pending',
          paymentMethod: '',
          paymentReferenceNumber: '',
          paymentDateTime: new Date(),
          claimedDateTime: new Date(),
          createdDateTime: new Date()
        },
        {
          id: 2,
          customer: {
            id: 2,
            username: '',
            firstName: '',
            middleName: '',
            lastName: '',
            learnersId: '',
            contactNumber: '',
            gradeLevel: '',
            section: '',
            school_year: '',
            role: ''
          },
          items: [],
          totalPrice: 50,
          status: 'paid',
          paymentMethod: '',
          paymentReferenceNumber: '',
          paymentDateTime: new Date(),
          claimedDateTime: new Date(),
          createdDateTime: new Date()
        },
        {
          id: 3,
          customer: {
            id: 3,
            username: '',
            firstName: '',
            middleName: '',
            lastName: '',
            learnersId: '',
            contactNumber: '',
            gradeLevel: '',
            section: '',
            school_year: '',
            role: ''
          },
          items: [],
          totalPrice: 50,
          status: 'completed',
          paymentMethod: '',
          paymentReferenceNumber: '',
          paymentDateTime: new Date(),
          claimedDateTime: new Date(),
          createdDateTime: new Date()
        },
      ],
      totalPrice: 130,
      status: 'pending',
      paymentDateTime: new Date(),
      claimedDateTime: new Date(),
      createdDateTime: new Date()
    },
    {
      id: 2,
      collector: {
        id: 2,
        username: '',
        firstName: '',
        middleName: '',
        lastName: '',
        learnersId: '',
        contactNumber: '',
        gradeLevel: '',
        section: '',
        school_year: '',
        role: ''
      },
      orders: [
        {
          id: 4,
          customer: {
            id: 1,
            username: '',
            firstName: '',
            middleName: '',
            lastName: '',
            learnersId: '',
            contactNumber: '',
            gradeLevel: '',
            section: '',
            school_year: '',
            role: ''
          },
          items: [],
          totalPrice: 30,
          status: 'pending',
          paymentMethod: '',
          paymentReferenceNumber: '',
          paymentDateTime: new Date(),
          claimedDateTime: new Date(),
          createdDateTime: new Date()
        },
        {
          id: 5,
          customer: {
            id: 2,
            username: '',
            firstName: '',
            middleName: '',
            lastName: '',
            learnersId: '',
            contactNumber: '',
            gradeLevel: '',
            section: '',
            school_year: '',
            role: ''
          },
          items: [],
          totalPrice: 50,
          status: 'paid',
          paymentMethod: '',
          paymentReferenceNumber: '',
          paymentDateTime: new Date(),
          claimedDateTime: new Date(),
          createdDateTime: new Date()
        },
        {
          id: 6,
          customer: {
            id: 3,
            username: '',
            firstName: '',
            middleName: '',
            lastName: '',
            learnersId: '',
            contactNumber: '',
            gradeLevel: '',
            section: '',
            school_year: '',
            role: ''
          },
          items: [],
          totalPrice: 50,
          status: 'completed',
          paymentMethod: '',
          paymentReferenceNumber: '',
          paymentDateTime: new Date(),
          claimedDateTime: new Date(),
          createdDateTime: new Date()
        },
      ],
      totalPrice: 130,
      status: 'pending',
      paymentDateTime: new Date(),
      claimedDateTime: new Date(),
      createdDateTime: new Date()
    }];


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

  constructor(private authService: AuthService, private router: Router) { 
    if (!authService.isLoggedInUser()) {
      router.navigate(['/login']);
    }else{
      this.isLoggedInUser = true;
      this.role = authService.getRole();
    }
  }

  displayedColumns: string[] = ['id', 'date', 'totalPrice', 'status', 'actions'];
  searchText: string = '';
  
  get filteredCollections() {
    /* return this.collections.filter(collection =>
      collection.id && collection..toString().includes(this.searchText.toLowerCase())
    ); */
    return this.collections;
  }
}
