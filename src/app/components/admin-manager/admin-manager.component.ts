import { Component, OnInit  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { userDetails } from 'src/app/models/admin-manager/userDetails';
import { Claim } from 'src/app/models/claim/claim';
import { CustomerDetails } from 'src/app/models/customer/customerDetails';
import { UserDetails } from 'src/app/models/loginManager/userDetails';
import { UserService } from 'src/app/services/admin-manager/user.service';
import { CustomerService } from 'src/app/services/customer/customer.service';

@Component({
  selector: 'app-admin-manager',
  templateUrl: './admin-manager.component.html',
  styleUrls: ['./admin-manager.component.css']
})
export class AdminManagerComponent implements OnInit{
  user:userDetails;
  filter:string;
  claims:Claim[];
  customers: CustomerDetails[];
  userId:any;
  suserId:any;
  users:userDetails[];
  constructor(private toastrService:ToastrService,private userService:UserService,private formBuilder:FormBuilder){}
  ngOnInit(): void {
    this.getAllUsers();
    this.getAllClaims();
  
    
  }
  getbyid(userId:string){
    this.userService.getbyid(userId).subscribe(response=>{
      response.success ? this.user = response.data : this.toastrService.error("Bir hata meydana geldi","HATA");
     
    })
  }

  getAllClaims() {
    this.userService.getAllClaims().subscribe(response=>{
      response.success ? this.claims = response.data : this.toastrService.error("Bir hata meydana geldi","HATA");
      
    })
  }
  getAllUsers() {
    this.userService.getAllUsers().subscribe(response=>{
      response.success ? this.users = response.data : this.toastrService.error("Bir hata meydana geldi","HATA");
      console.log(this.users);
      
    })
  }

}





