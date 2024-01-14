import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccountListComponent } from './components/account-list/account-list.component';
import { AccountDetailsComponent } from './components/account-details/account-details.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './services/jwt.interceptor';
import { SidenavComponent } from './components/sidenav/sidenav.component';

import { MaterialModule } from './shared/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AuthService } from './services/auth/auth.service';
import { AdminMenuListComponent } from './components/admin-menu-list/admin-menu-list.component';
import { AdminOrderListComponent } from './components/admin-order-list/admin-order-list.component';
import { AdminMenuDetailsComponent } from './components/admin-menu-details/admin-menu-details.component';
import { AdminOrderDetailsComponent } from './components/admin-order-details/admin-order-details.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { OrderConfirmationComponent } from './components/order-confirmation/order-confirmation.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MenuListComponent } from './components/menu-list/menu-list.component';
import { OrderListComponent } from './components/order-list/order-list.component';
import { MenuDetailsComponent } from './components/menu-details/menu-details.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { MyCollectionsComponent } from './components/my-collections/my-collections.component';
import { MyCollectOrdersComponent } from './components/my-collect-orders/my-collect-orders.component';
import { MyCollectOrderDetailsComponent } from './components/my-collect-order-details/my-collect-order-details.component';

import { HttpClientModule } from '@angular/common/http';

import { CommonModule } from '@angular/common';

import { QRCodeModule } from 'angularx-qrcode';
//import { ZXingScannerModule } from '@zxing/ngx-scanner';



@NgModule({
  declarations: [
    AppComponent,
    AccountListComponent,
    AccountDetailsComponent,
    LoginComponent,
    RegistrationComponent,
    SidenavComponent,
    AdminMenuListComponent,
    AdminOrderListComponent,
    AdminMenuDetailsComponent,
    AdminOrderDetailsComponent,
    CartComponent,
    CheckoutComponent,
    OrderConfirmationComponent,
    MenuListComponent,
    OrderListComponent,
    MenuDetailsComponent,
    OrderDetailsComponent,
    MyCollectionsComponent,
    MyCollectOrdersComponent,
    MyCollectOrderDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NoopAnimationsModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    QRCodeModule,
    //ZXingScannerModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
