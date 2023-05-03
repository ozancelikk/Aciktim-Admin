import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Order } from 'src/app/models/order/order';
import { OrderService } from 'src/app/services/order/order.service';

@Component({
  selector: 'app-orderdetail',
  templateUrl: './orderdetail.component.html',
  styleUrls: ['./orderdetail.component.css']
})
export class OrderdetailComponent implements OnInit {
  orders:Order[];
  restaurantId:any;
  constructor(private toastrService:ToastrService , private orderService:OrderService,private route:ActivatedRoute){}
  ngOnInit(): void {
    this.getRestaurantId();
    this.getActiveOrdersByRestaurantId();
  }

  getRestaurantId() {
    this.restaurantId = this.route.snapshot.paramMap.get('id');
  }

  getActiveOrdersByRestaurantId() {
    this.orderService.getActiveOrderDetailsByRestaurantId(this.restaurantId).subscribe(response=>{
      response.success ? this.orders = response.data :  null;
      console.log(this.orders);
      
    })

  }

}
