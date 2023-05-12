import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comment } from 'src/app/models/comment/comment';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { Order } from 'src/app/models/order/order';
import { ResponseModel } from 'src/app/models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
apiURL:string = "https://localhost:44388/api/RestaurantComment"
  constructor(private httpClient:HttpClient) { }


  getAllActiveComments():Observable<ListResponseModel<Comment>> {
    return this.httpClient.get<ListResponseModel<Comment>>(this.apiURL +"/GetAllActiveComments")
  }

  deleteComment(id:string):Observable<ResponseModel>{
    return this.httpClient.get<ResponseModel>(this.apiURL + "/Delete?id=" + id)
  }

  getAllPassiveComments():Observable<ListResponseModel<Comment>> {
    return this.httpClient.get<ListResponseModel<Comment>>(this.apiURL +"/GetAllPassiveComments")
  }
  PassiveCommentToActiveComment(comment:Comment):Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiURL + "/PassiveCommentToActiveComment" , comment);
  }
}
