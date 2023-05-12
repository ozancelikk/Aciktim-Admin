import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { ResponseModel } from 'src/app/models/responseModel';
import { RestaurantSupport } from 'src/app/models/restaurant-support/restaurantSupport';
import { SingleResponseModel } from 'src/app/models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class RestaurantsupportService {
  apiUrl="https://localhost:44388/api/RestaurantSupport"
  constructor(private httpClient:HttpClient) { }


  getAll():Observable<ListResponseModel<RestaurantSupport>>{
    return this.httpClient.get<ListResponseModel<RestaurantSupport>>(this.apiUrl + "/GetMailDetails")
  }
  getMailsByRestaurantId(restaurantId:string):Observable<SingleResponseModel<RestaurantSupport>>{
    return this.httpClient.get<SingleResponseModel<RestaurantSupport>>(this.apiUrl + "/GetMailDetailsByRestaurantId?id=" + restaurantId)
  }
  delete(id:string):Observable<ResponseModel>{
    return this.httpClient.get<ResponseModel>(this.apiUrl + "/delete?id=" + id)
  }

}

