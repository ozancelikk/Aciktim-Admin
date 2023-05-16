import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/models/category/Category';
import { Order } from 'src/app/models/order/order';
import { Restaurant } from 'src/app/models/restaurant/Restaurant';
import { CategoryService } from 'src/app/services/category/category.service';
import { OrderService } from 'src/app/services/order/order.service';
import { RestaurantService } from 'src/app/services/restaurant/restaurant.service';

@Component({
  selector: 'app-editpage',
  templateUrl: './editpage.component.html',
  styleUrls: ['./editpage.component.css']
})
export class EditpageComponent implements OnInit {
  restaurant: Restaurant;
  restaurantId: any;
  categories: Category[];
  orders:Order[];
  filter:string;
  start:string;
  end:string;
  updateRestaurantForm: FormGroup;
  constructor(private restaurantService: RestaurantService, private toastrService: ToastrService
    , private route: ActivatedRoute, private formBuilder: FormBuilder
    , private categoryService: CategoryService, private router: Router,private orderService:OrderService) { }
  ngOnInit(): void {
    this.getRestaurantId();
    this.getRestaurantDetails();
    this.createFormGroup();
    this.getCategories();
    this.getOrdersByRestaurantId();
  }

  getRestaurantDetails() {
    this.restaurantService.getRestaurantDetailsByRestaurantId(this.restaurantId).subscribe(response => {
      response.success ? this.restaurant = response.data : null;
      this.updateRestaurantForm.patchValue(response.data);
    })
  }

  getCategories() {
    this.categoryService.getAllCategories().subscribe(response => {
      response.success ? this.categories = response.data : null
    })
  }

  createFormGroup() {
    this.updateRestaurantForm = this.formBuilder.group
      (
        {
          id: ["", Validators.required],
          restaurantName: ["", Validators.required],
          restaurantAddress: ["", Validators.required],
          mailAddress: ["", Validators.required],
          openingTime: ["", Validators.required],
          closingTime: ["", Validators.required],
          categoryId: ["", Validators.required],
          minCartPrice: ["", Validators.required], //+
          restaurantRate: ["", Validators.required],
          phoneNumber: ["", Validators.required],
          taxNumber: ["", Validators.required],
          imagePath: ["", Validators.required]
        }
      );
  }

  updateRestaurant() {
    let model = Object.assign({}, this.updateRestaurantForm.value);
    if (confirm("Restoranı güncellemek istediğinizeemin misiniz ? ")) {
      this.restaurantService.updateRestaurant(model).subscribe(response => {
        response.success ? this.toastrService.success("Restoran başarıyla güncellendi.", "BAŞARILI") : null
        setTimeout(() => {
          this.router.navigate(["/restaurant/list"])
        }, 1000)
      })
    }
  }

  getRestaurantId() {
    this.restaurantId = this.route.snapshot.paramMap.get('id');
  }

  getImagePath(restaurant: Restaurant): string {
    let url: string;
    restaurant.imagePath == null ? url = "http://127.0.0.1:4200/Restaurant/noImage.png"
      : url = "http://127.0.0.1:4200/Restaurant/" + restaurant.id + "/" + restaurant.imagePath;
    return url;
  }

  getRestaurantOrderDetailsByDate(start:string,end:string) {
    const startDate = new Date(start);
    start= startDate.toLocaleDateString("tr-TR").toString();
    const endDate = new Date(end);
    end= endDate.toLocaleDateString("tr-TR").toString();
    console.log(start);
    console.log(end);
  
    if(isNaN(startDate.getTime()) || isNaN(endDate.getTime()) ) {
      this.toastrService.error("Lütfen ilgili tarih aralığını giriniz","HATA");
    }
    else {
      this.orderService.getRestaurantOrderDetailsByDate(start,end,this.restaurantId).subscribe(response=>{
        response.success ? this.orders = response.data : this.toastrService.error("Bir Hata Meydana Geldi","HATA");
        console.log(this.orders);   
      })
    }
  }

  getOrdersByRestaurantId() {
    this.orderService.GetOrdersByRestaurantId(this.restaurantId).subscribe(response=>{      
      response.success ? this.orders = response.data : this.toastrService.error("Bir Hata Meydana Geldi","HATA");
      console.log(this.orders);
    })
  }

  calculatePrice(order: Order) {
    let totalPrice = 0;
    for (let i = 0; i < order.menus.length; i++) {
      totalPrice+=order.menus[i].orderPrice  * order.menus[i].quantity
    }
    return totalPrice
  }

}
