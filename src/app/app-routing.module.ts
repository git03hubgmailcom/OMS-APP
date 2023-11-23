import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountListComponent } from './components/account-list/account-list.component';
import { AccountDetailsComponent } from './components/account-details/account-details.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { AdminMenuListComponent } from './components/admin-menu-list/admin-menu-list.component';
import { AdminOrderListComponent } from './components/admin-order-list/admin-order-list.component';
import { AdminMenuDetailsComponent } from './components/admin-menu-details/admin-menu-details.component';
import { AdminOrderDetailsComponent } from './components/admin-order-details/admin-order-details.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { OrderConfirmationComponent } from './components/order-confirmation/order-confirmation.component';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'accounts', component: AccountListComponent },
  { path: 'account-details/:id', component: AccountDetailsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'admin-menu-list', component: AdminMenuListComponent },
  { path: 'admin-order-list', component: AdminOrderListComponent },
  { path: 'admin-menu-details/:id', component: AdminMenuDetailsComponent },
  { path: 'admin-order-details/:id', component: AdminOrderDetailsComponent },
  { path: 'cart', component: CartComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'order-confirmation', component: OrderConfirmationComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
