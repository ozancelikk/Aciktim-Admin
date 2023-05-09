import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login } from 'src/app/models/auth/login';
import { User } from 'src/app/models/loginManager/user';
import { UserDetails } from 'src/app/models/loginManager/userDetails';
import { ResponseModel } from 'src/app/models/responseModel';
import { SingleResponseModel } from 'src/app/models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiURL:string = "https://localhost:44388/api/User"
  apiURL2:string = "https://localhost:44388/api/Auth"

  constructor(private httpClient:HttpClient) { }

  getUserDetailsByMailAddress(mail:string):Observable<SingleResponseModel<UserDetails>> {
    return this.httpClient.get<SingleResponseModel<UserDetails>>(this.apiURL +"/GetClaimAndUserDetails?mail=" + mail);
  }

  login(login:Login):Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiURL2 +"/login" , login);
  }

}
