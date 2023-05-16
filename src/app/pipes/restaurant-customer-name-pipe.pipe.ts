import { Pipe, PipeTransform } from '@angular/core';
import { Order } from '../models/order/order';

@Pipe({
  name: 'restaurantCustomerNamePipe'
})
export class RestaurantCustomerNamePipePipe implements PipeTransform {

  transform(value: Order[], filter:string):  Order[] {
    return filter ? value.filter(x=>x.firstName.toLowerCase().indexOf(filter.toLowerCase())!== -1) : value 
  }

}
