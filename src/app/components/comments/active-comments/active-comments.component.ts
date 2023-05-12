import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Comment } from 'src/app/models/comment/comment';
import { CommentService } from 'src/app/services/comment/comment.service';

@Component({
  selector: 'app-active-comments',
  templateUrl: './active-comments.component.html',
  styleUrls: ['./active-comments.component.css']
})
export class ActiveCommentsComponent implements OnInit {
  activeComments:Comment[];
  filter:string;
  constructor(private commentService:CommentService,private toastrService:ToastrService){}
  ngOnInit(): void {7
    this.getAllActiveComments();
  }

  getAllActiveComments() {
    this.commentService.getAllActiveComments().subscribe(response=>{
      response.success ? this.activeComments = response.data : this.toastrService.error("Bir hata meydana geldi","HATA")
      console.log(this.activeComments);
    })
  }

  deleteComment(id:string) {
    if(confirm("Yorumu silmek istediğinizden emin misiniz ? ")) {
      this.commentService.deleteComment(id).subscribe(response=>{
        response.success ? this.toastrService.success("Yorum başarıyla silindi","BAŞARILI") : this.toastrService.error("Bir hata meydana geldi","HATA")
        this.getAllActiveComments();
      })
    }
  }

}
