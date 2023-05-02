import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ChartComponent } from './components/chart/chart.component';
import { RestaurantComponent } from './components/restaurant/restaurant.component';

const routes: Routes = [{
  path:"",component:HomeComponent,children:[{path:"restaurant",component:RestaurantComponent}]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
