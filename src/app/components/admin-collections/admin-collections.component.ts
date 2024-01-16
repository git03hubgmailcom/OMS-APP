import { Component, ViewChild, OnInit } from '@angular/core';
import { Order } from '../../models/order.model';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';
import { Collection } from '../../models/collections.model';
import { CollectionService } from '../../services/collection/collection.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-collections',
  templateUrl: './admin-collections.component.html',
  styleUrl: './admin-collections.component.css'
})
export class AdminCollectionsComponent implements OnInit {
  @ViewChild('sidenav') sidenav!: MatSidenav;

  isSidenavOpen: boolean = false;
  isLoggedInUser: boolean = false;
  role: string = '';
  user_id: string = '';

  collections: Collection[] = [];

  ngOnInit(): void {
    this.getCollections();
  }

  getCollections() {
    this.collectionService.getCollections().subscribe((collections) => {
      this.collections = collections;
      console.log(this.collections);
    });
  }

  toggleSidenav() {
    if (this.sidenav) {
      this.sidenav.toggle();
    }
  }

  askIfDelete(collection: Collection) {
    Swal.fire({
      title: "Are you sure you want to delete this collection?",
      text: "Collection: " + collection.id + " will be deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        if(collection.id){
          this.collectionService.deleteCollection(collection.id).subscribe(() => {
            Swal.fire({
              title: "Deleted!",
              text: "Collection has been deleted.",
              icon: "success"
            });
            this.getCollections();
          });
        }
      }
    });
  }

  logout() {
    this.authService.logout();
    this.toggleSidenav();
    this.isLoggedInUser = false;
  }

  constructor(private authService: AuthService, private router: Router, private collectionService: CollectionService) { 
    if (!authService.isLoggedInUser()) {
      router.navigate(['/login']);
    }else{
      this.isLoggedInUser = true;
      this.role = authService.getRole();
      this.user_id = authService.getUserId();
      if(this.authService.getRole() == "user"){
        router.navigate(['/login']);
      }
    }
  }

  addNewCollection() {
    const newCollection : any = {
      total_price: 0,
      status: "pending",
      user_id: +this.user_id
    };

    this.collectionService.createCollection(newCollection).subscribe((collection) => {
      this.getCollections();
    });
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
