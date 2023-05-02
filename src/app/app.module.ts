import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { RestaurantComponent } from './components/restaurant/restaurant.component';
import { Chart1Component } from './components/chart/chart1/chart1.component';
import { PieComponent } from './components/chart/pie/pie.component';
import { CustomerListComponent } from './components/customer/customer-list/customer-list.component';
import { CustomerEditComponent } from './components/customer/customer-edit/customer-edit.component';
import { ToastrModule } from 'ngx-toastr';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { CustomerPipePipe } from './pipes/customer-pipe.pipe';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RestaurantComponent,
    Chart1Component,
    PieComponent,
    CustomerListComponent,
    CustomerEditComponent,
    CustomerPipePipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 1000,
      preventDuplicates: false,
      closeButton: true,
      countDuplicates: true,
      positionClass: "toast-bottom-right",
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
