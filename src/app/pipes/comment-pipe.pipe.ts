import { Pipe, PipeTransform } from '@angular/core';
import { Comment } from '../models/comment/comment';

@Pipe({
  name: 'commentPipe'
})
export class CommentPipePipe implements PipeTransform {

  transform(value: Comment[], filter:string):  Comment[] {
    return filter  ? value.filter(x=>x.customerId.toLowerCase().indexOf(filter.toLowerCase())!==-1) : value
  }

}
