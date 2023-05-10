import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { userDetails } from 'src/app/models/admin-manager/userDetails';
import { SingleResponseModel } from 'src/app/models/singleResponseModel';
import { Claim, UserClaim } from 'src/app/models/claim/claim';
import { AddClaim } from 'src/app/models/claim/addClaim';
import { ResponseModel } from 'src/app/models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiURL:string = "https://localhost:44388/api/User"
  apiURL2:string = "https://localhost:44388/api/OperationClaim"
  apiURL3:string = "https://localhost:44388/api/UserOperationClaim"

  constructor(private httpClient:HttpClient) { }

  getbyid(userId:string):Observable<SingleResponseModel<userDetails>> {
    return this.httpClient.get<SingleResponseModel<userDetails>>(this.apiURL +"/getbyid?id=" + userId);
  }
  getAllClaims():Observable<ListResponseModel<Claim>> {
    return this.httpClient.get<ListResponseModel<Claim>>(this.apiURL2 + "/getall")
  }

  addClaimToUser(model:AddClaim):Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiURL3 +"/add" , model)
  }

  getAllUsers():Observable<ListResponseModel<userDetails>>{
    return this.httpClient.get<ListResponseModel<userDetails>>(this.apiURL  + "/getall")
  }

  getUserClaimsByUserId(userId:string) :Observable<ListResponseModel<UserClaim>>{
    return this.httpClient.get<ListResponseModel<UserClaim>>(this.apiURL3 + "/GetClaimDetailsByUserId?userId=" + userId);
  }

  deleteClaimFromUser(id:string):Observable<ResponseModel> {
    return this.httpClient.get<ResponseModel>(this.apiURL3 +"/delete?id="  + id)
  }
}
