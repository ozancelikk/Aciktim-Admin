import { Component, OnInit  } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { userDetails } from 'src/app/models/admin-manager/userDetails';
import { UserService } from 'src/app/services/admin-manager/user.service';

@Component({
  selector: 'app-admin-manager',
  templateUrl: './admin-manager.component.html',
  styleUrls: ['./admin-manager.component.css']
})
export class AdminManagerComponent implements OnInit{
  user:userDetails;
  filter:string;
  constructor(private toastrService:ToastrService,private userService:UserService){}
  ngOnInit(): void {
    
  }
  getbyid(userId:string){
    this.userService.getbyid(userId).subscribe(response=>{
      response.success ? this.user = response.data : null;
      console.log(this.user);
    })
  }
  

}





