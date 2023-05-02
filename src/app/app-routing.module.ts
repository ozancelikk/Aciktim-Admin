import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RestaurantComponent } from './components/restaurant/restaurant.component';
import { Chart1Component } from './components/chart/chart1/chart1.component';
import { PieComponent } from './components/chart/pie/pie.component';
import { CustomerListComponent } from './components/customer/customer-list/customer-list.component';
import { CustomerEditComponent } from './components/customer/customer-edit/customer-edit.component';
import { ListrestaurantComponent } from './components/restaurant/restaurant-list/confirm-restaurant/listrestaurant.component';
import { EditrestaurantComponent } from './components/restaurant/restaurant-edit/editrestaurant/editrestaurant.component';
import { EditpageComponent } from './components/restaurant/edit-page/editpage/editpage.component';

const routes: Routes = [{
  path: "", component: HomeComponent, children: 
  [
    {path:"",component:Chart1Component},
    {path:"",component:PieComponent},
    {path: "restaurant", component: RestaurantComponent },
    {path: "customer/list", component: CustomerListComponent },
    {path: "customer/edit/:id", component: CustomerEditComponent },
    {path: "customer/edit", component: CustomerEditComponent },
    {path: "restaurant", component: RestaurantComponent},
    {path: "restaurant/confirm", component: ListrestaurantComponent},
    {path: "restaurant/list", component: EditrestaurantComponent},
    {path: "restaurant/edit", component: EditpageComponent}

  ]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
