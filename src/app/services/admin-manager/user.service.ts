import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { userDetails } from 'src/app/models/admin-manager/userDetails';
import { SingleResponseModel } from 'src/app/models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiURL:string = "https://localhost:44388/api/User"

  constructor(private httpClient:HttpClient) { }

  

  getbyid(userId:string):Observable<SingleResponseModel<userDetails>> {
    return this.httpClient.get<SingleResponseModel<userDetails>>(this.apiURL +"/getbyid?id=" + userId);
  }
}
