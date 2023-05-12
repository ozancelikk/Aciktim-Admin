import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { RestaurantSupport } from 'src/app/models/restaurant-support/restaurantSupport';
import { RestaurantsupportService } from 'src/app/services/restaurant-support/restaurantsupport.service';


@Component({
  selector: 'app-restaurantsupport',
  templateUrl: './restaurantsupport.component.html',
  styleUrls: ['./restaurantsupport.component.css']
})
export class RestaurantsupportComponent implements OnInit {
  constructor(private toastrService:ToastrService,private restaurantSupportService:RestaurantsupportService){}
  mails:RestaurantSupport[]
  ngOnInit(): void {
    this.getMails();
  }
  getMails(){
  this.restaurantSupportService.getAll().subscribe(response=>{
    response.success ? this.mails= response.data :this.toastrService.error("Bir Hata Meydana Geldi", "HATA")   
  })
  }
  delete(id:string){
    if(confirm("Maili Silmek İstediğinize Emin Misiniz?")){
      this.restaurantSupportService.delete(id).subscribe(response=>{
        response.success ? this.toastrService.success("Silme İşlemi Başarılı","BAŞARILI") :this.toastrService.error("Bir Hata Meydana Geldi", "HATA")   
      this.getMails();
      })
    }
   
  }
}
