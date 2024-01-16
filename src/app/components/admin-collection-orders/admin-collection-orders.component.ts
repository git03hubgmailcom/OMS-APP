import { Component, ViewChild, OnInit } from '@angular/core';
import { Order } from '../../models/order.model';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';
import { Collection } from '../../models/collections.model';
import { CollectionService } from '../../services/collection/collection.service';
import { ActivatedRoute } from '@angular/router';
import { CollectionItem } from 'src/app/models/collection-item.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-collection-orders',
  templateUrl: './admin-collection-orders.component.html',
  styleUrl: './admin-collection-orders.component.css'
})
export class AdminCollectionOrdersComponent {
  @ViewChild('sidenav') sidenav!: MatSidenav;

  isSidenavOpen: boolean = false;
  isLoggedInUser: boolean = false;
  role: string = '';
  total_price: number = 0;

  collection: Collection | undefined | any;
  collectionItems: CollectionItem[] = [];
  add_order_id: string = '';

  askIfReceive(collection: Collection) {
    Swal.fire({
      title: "Are you sure you want to receive this collection?",
      text: "Collection: " + this.collection.id + " will be received.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, receive it!"
    }).then((result) => {
      if (result.isConfirmed) {
        if(collection.id){
          collection.status = "paid";
          this.collectionService.updateCollection(this.collection.id, this.collection).subscribe((collection) => {
            Swal.fire({
              title: "Received!",
              text: "Collection has been received.",
              icon: "success"
            });
            this.getCollection(this.collection.id);
          });
        }
      }
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      let id = +params['id']; // (+) converts string 'id' to a number
      this.getCollection(id);
    });
  }

  getCollection(id: number) {
    this.collectionService.getCollection(id).subscribe((collection) => {
      this.collection = collection;
      this.total_price = collection.total_price;
      this.collectionItems = collection.collection_items;
      console.log(this.collection);
    });
  }

  addOrder() {
    if(this.collectionItems.find((collectionItem: CollectionItem) => collectionItem.order.id == +this.add_order_id)){
      Swal.fire({
        title: "Error!",
        text: "Order already exists on this collection.",
        icon: "error"
      });
      return;
    }
    this.collectionService.addOrder(+this.add_order_id, this.collection.id).subscribe((collection) => {
      this.getCollection(this.collection.id);
      console.log(this.collection);
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

  constructor(private authService: AuthService, private router: Router, private collectionService: CollectionService , private route: ActivatedRoute) { 
    if (!authService.isLoggedInUser()) {
      router.navigate(['/login']);
    }else{
      this.isLoggedInUser = true;
      this.role = authService.getRole();
      if(this.authService.getRole() != "admin"){
        router.navigate(['/login']);
      }
    }
  }

  displayedColumns: string[] = ['id', 'customer', 'totalPrice', 'status', 'date', 'actions'];
  searchText: string = '';
  
  get filteredOrders() {
    return this.collectionItems.filter(order =>
      order.id && order.id.toString().includes(this.searchText.toLowerCase())
    );
  }

  
}