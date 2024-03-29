import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RestaurantComponent } from './components/restaurant/restaurant.component';
import { CustomerListComponent } from './components/customer/customer-list/customer-list.component';
import { CustomerEditComponent } from './components/customer/customer-edit/customer-edit.component';
import { ListrestaurantComponent } from './components/restaurant/restaurant-list/confirm-restaurant/listrestaurant.component';
import { EditrestaurantComponent } from './components/restaurant/restaurant-edit/editrestaurant/editrestaurant.component';
import { EditpageComponent } from './components/restaurant/edit-page/editpage/editpage.component';
import { OrderlistComponent } from './components/order/orderlist/orderlist.component';
import { RestaurantorderComponent } from './components/order/restaurant-order/restaurantorder/restaurantorder.component';
import { OrderdetailComponent } from './components/order/order-detail/orderdetail/orderdetail.component';
import { DenemeComponent } from './components/chart/deneme/deneme.component';
import { MailsComponent } from './components/mails/mails.component';
import { MailDetailComponent } from './components/mail-detail/mail-detail.component';

import { LoginComponent } from './components/auth/login/login.component';
import { LoginGuardGuard } from './guards/login-guard.guard';

import { AdminManagerComponent } from './components/admin-manager/admin-manager.component';
import { UserEditComponent } from './components/admin-manager/user-edit/user-edit.component';
import { SuserGuardGuard } from './guards/suser-guard.guard';
import { ActiveCommentsComponent } from './components/comments/active-comments/active-comments.component';
import { PassiveCommentsComponent } from './components/comments/passive-comments/passive-comments.component';
import { RestaurantsupportComponent } from './components/restaurantsupport/restaurantsupport.component';
import { RestaurantmaildetailComponent } from './components/restaurantmaildetail/restaurantmaildetail.component';


const routes: Routes = [{
  path: "", component: HomeComponent, canActivate:[LoginGuardGuard], children: 
  [

    {path:"" ,canActivate:[LoginGuardGuard], component:DenemeComponent},
    {path:"mails" , canActivate:[LoginGuardGuard],component:MailsComponent},
    {path: "restaurant",canActivate:[LoginGuardGuard], component: RestaurantComponent },
    {path: "customer/list",canActivate:[LoginGuardGuard], component: CustomerListComponent },
    {path: "customer/edit/:id",canActivate:[LoginGuardGuard], component: CustomerEditComponent },
    {path: "customer/edit",canActivate:[LoginGuardGuard], component: CustomerEditComponent },
    {path: "restaurant",canActivate:[LoginGuardGuard], component: RestaurantComponent},
    {path: "restaurant/confirm",canActivate:[LoginGuardGuard], component: ListrestaurantComponent},
    {path: "restaurant/list",canActivate:[LoginGuardGuard], component: EditrestaurantComponent},
    {path: "restaurant/edit/:id",canActivate:[LoginGuardGuard], component: EditpageComponent},
    {path: "order/orderlist",canActivate:[LoginGuardGuard], component: OrderlistComponent},
    {path: "order/restaurantorder", canActivate:[LoginGuardGuard],component: RestaurantorderComponent},
    {path: "order/orderdetails/:id",canActivate:[LoginGuardGuard], component: OrderdetailComponent},
    {path: "mails/mail/:id",canActivate:[LoginGuardGuard], component: MailDetailComponent},
    {path: "admin/adminmanager", component:AdminManagerComponent,canActivate:[LoginGuardGuard,SuserGuardGuard]},
    {path: "admin/user/:id", component:UserEditComponent,canActivate:[LoginGuardGuard,SuserGuardGuard]},
    {path: "comments/activecomments", component:ActiveCommentsComponent,canActivate:[LoginGuardGuard]},
    {path: "comments/passivecomments", component:PassiveCommentsComponent,canActivate:[LoginGuardGuard]},
    {path: "mails/restaurantmails", component:RestaurantsupportComponent,canActivate:[LoginGuardGuard]},
    {path: "mails/restaurantmails/:id", component:RestaurantmaildetailComponent,canActivate:[LoginGuardGuard]},
  ]
},
{path:"auth/login" , component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
