import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CustomerDetails } from 'src/app/models/customer/customerDetails';
import { Order } from 'src/app/models/order/order';
import { CustomerService } from 'src/app/services/customer/customer.service';
import { OrderService } from 'src/app/services/order/order.service';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.css']
})
export class CustomerEditComponent implements OnInit{
  customerId:string;
  customer:CustomerDetails;
  updateForm:FormGroup;
  nationalityId:any;
  orders:Order[];
  end:any;
  filter:string;
  start:any
 
  constructor(private route: ActivatedRoute,private customerService:CustomerService,
    private toastrService:ToastrService,private formBuilder:FormBuilder,private orderService:OrderService,
    private router:Router){}
  ngOnInit(): void {
    this.getCustomerId();
    this.createUpdateForm();
    this.getCustomerDetailsByCustomerId(this.customerId);
    this.getOrdersByCustomerId();

  }
  getCustomerId() 
  {
    this.customerId = this.route.snapshot.paramMap.get('id');
  }
  getCustomerDetailsByCustomerId(customerId:string) {
    this.customerService.getCustomerDetailsByCustomerId(customerId).subscribe(response=>{
      response.success ? this.customer = response.data : null
      this.nationalityId = response.data.nationalityId
      this.updateForm.patchValue(response.data)     
       
    })
  }

  createUpdateForm() {
    this.updateForm = this.formBuilder.group({
      mailAddress:["",Validators.required],
      id:["",Validators.required],
      firstName:["",Validators.required],
      lastName:["",Validators.required],
      phoneNumber:["",Validators.required],
      registerDate:["",Validators.required],
      nationalityId:[this.nationalityId,Validators.required],
      birthDay:["",Validators.required]
    })
  }

  updateUser() {
    let model = Object.assign({},this.updateForm.value)
    this.customerService.updateCustomer(model).subscribe(response=>{
      response.success ? this.toastrService.success("Kullanıcı Başarıyla Güncellendi!","BAŞARILI")  : null
      setTimeout(()=>{
        this.router.navigate(["/customer/list"])
      },1000)
    })
  }

  getOrdersByCustomerId() {
    this.orderService.getOrderDetailsByCustomerId(this.customerId).subscribe(response=>{
      response.success ? this.orders = response.data : this.toastrService.error("Bir Hata Meydana Geldi","HATA");
      console.log(this.orders);
      
    })
  }

  getCustomerOrderDetailsByDate(start:string,end:string) {
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
      this.orderService.getCustomerOrderDetailsByDate(start,end,this.customerId).subscribe(response=>{
        response.success ? this.orders = response.data : this.toastrService.error("Bir Hata Meydana Geldi","HATA");
        console.log(this.orders);   
      })
    }
    
  }

  calculatePrice(order: Order) {
    let totalPrice = 0;
    for (let i = 0; i < order.menus.length; i++) {
      totalPrice+=order.menus[i].orderPrice  * order.menus[i].quantity
    }
    return totalPrice
  }

}
