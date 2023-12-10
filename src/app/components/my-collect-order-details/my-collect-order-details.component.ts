import { Component, Input, ViewChild } from '@angular/core';
import { Order } from '../../models/order.model';
import { Account } from '../../models/account.model';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth/auth.service';
import { MatSidenav } from '@angular/material/sidenav';
import { CollectionService } from 'src/app/services/collection/collection.service';
import { CollectionItem } from 'src/app/models/collection-item.model';

@Component({
  selector: 'app-my-collect-order-details',
  templateUrl: './my-collect-order-details.component.html',
  styleUrl: './my-collect-order-details.component.css'
})
export class MyCollectOrderDetailsComponent {
  @ViewChild('sidenav') sidenav!: MatSidenav;

  isSidenavOpen: boolean = false;
  isLoggedInUser: boolean = false;
  role: string = '';

  order: Order | undefined | any;
  collectionItem: CollectionItem | any;

  collection_id: number = 0;

  getCollectionItem(collection_item_id: number) {
    this.collectionService.getCollectionItem(collection_item_id).subscribe((collectionItem) => {
      this.collectionItem = collectionItem;
      this.collection_id = collectionItem.collection_id;
      console.log(this.collectionItem);
    });
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

  constructor(private route: ActivatedRoute, private router: Router, private authService: AuthService, private collectionService: CollectionService) {
    if (!authService.isLoggedInUser()) {
      router.navigate(['/login']);
    }else{
      this.isLoggedInUser = true;
      this.role = authService.getRole();
      if(this.authService.getRole() == "admin"){
        router.navigate(['/login']);
      }
    }
  }

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      const collection_item_id = +params['collection_item_id']; 
      this.getCollectionItem(collection_item_id);
    });
    
    

  }

  displayedColumns: string[] = ['name', 'price', 'quantity', 'totalPrice'];

  askIfMarkPaid(collectionItem: CollectionItem) {
    Swal.fire({
      title: "Are you sure you want to mark this order as paid?",
      text: "Order: " + this.collectionItem.order.id + " will be mark as paid.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, mark it!"
    }).then((result) => {
      if (result.isConfirmed) {
        collectionItem.status = "paid";
        this.collectionService.updateCollectionItem(collectionItem.id, collectionItem).subscribe((collectionItem) => {
          this.getCollectionItem(collectionItem.id);
          console.log(this.collectionItem);
          Swal.fire({
            title: "Marked as paid!",
            text: "Order has been marked as paid.",
            icon: "success"
          });
        });
        
      }
    });
  }

  askIfRemoveToCollection(collectionItem: CollectionItem) {
    Swal.fire({
      title: "Are you sure you want to remove this order?",
      text: "Order: " + this.collectionItem.order.id + " will be remove to collection.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.collectionService.deleteCollectionItem(collectionItem.id).subscribe((collectionItem) => {
          this.router.navigate([`/my-collect-orders/${this.collection_id}`]);
          console.log(this.collectionItem);
          Swal.fire({
            title: "Removed!",
            text: "Order has been removed to collection.",
            icon: "success"
          });
        });
        
      }
    });
  }

}
