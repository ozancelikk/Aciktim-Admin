import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { Order } from 'src/app/models/order/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  apiURL:string = "https://localhost:44388/api/Order"

  constructor(private httpClient:HttpClient) { }

  getActiveOrderDetailsByRestaurantId(restaurantId:string):Observable<ListResponseModel<Order>> {
    return this.httpClient.get<ListResponseModel<Order>>(this.apiURL +"/GetActiveOrdersByRestaurantId?restaurantId=" + restaurantId)
  }
}
