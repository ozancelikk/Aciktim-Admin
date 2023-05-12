import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RestaurantSupport } from 'src/app/models/restaurant-support/restaurantSupport';
import { RestaurantsupportService } from 'src/app/services/restaurant-support/restaurantsupport.service';

@Component({
  selector: 'app-restaurantmaildetail',
  templateUrl: './restaurantmaildetail.component.html',
  styleUrls: ['./restaurantmaildetail.component.css']
})
export class RestaurantmaildetailComponent implements OnInit {
  constructor(private toastrSerivce:ToastrService, private restaurantSupportService:RestaurantsupportService, private router:ActivatedRoute){}
  mail:RestaurantSupport
  id:string
  ngOnInit(): void {
    this.getRestaurantId()
    this.getMailDetailsByRestaurantId()
    
  }
  getMailDetailsByRestaurantId(){
    this.restaurantSupportService.getMailsByRestaurantId(this.id).subscribe(response=>{
      response.success ? this.mail= response.data : this.toastrSerivce.error("Bir Hata Meydana Geldi", "HATA")
      console.log(this.mail)
    })
  }
  getRestaurantId(){
    this.id = this.router.snapshot.paramMap.get("id")
  }

}
