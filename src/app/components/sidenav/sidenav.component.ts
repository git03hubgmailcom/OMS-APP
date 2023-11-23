import { Component, OnInit, ViewChild } from '@angular/core';
import { Renderer2, ElementRef } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent {
  @ViewChild('sidenav') sidenav!: MatSidenav;

  isSidenavOpen: boolean = false;
  isLoggedInUser: boolean = false;
  role: string = '';

  constructor(private renderer: Renderer2, private el: ElementRef, public authService: AuthService) {
    if (this.authService.isLoggedInUser()) {
      this.isLoggedInUser = true;
      this.role = this.authService.getRole();
      console.log(this.role);
    }
  }


  toggleSidenav() {
    if (this.sidenav) {
      this.sidenav.toggle();
    }
  }

}
