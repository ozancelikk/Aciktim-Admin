import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Comment } from 'src/app/models/comment/comment';
import { CommentService } from 'src/app/services/comment/comment.service';

@Component({
  selector: 'app-passive-comments',
  templateUrl: './passive-comments.component.html',
  styleUrls: ['./passive-comments.component.css']
})
export class PassiveCommentsComponent  implements OnInit{
  filter:string;
  comments:Comment[]
  constructor(private toastrService:ToastrService,private commentService:CommentService){}
  ngOnInit(): void {
    this.getPassiveComments();
  }

  getPassiveComments() {
    this.commentService.getAllPassiveComments().subscribe(response=>{
      response.success ? this.comments = response.data : this.toastrService.error("Bir hata meydana geldi","HATA")
      console.log(this.comments);
      
    })
  }

  deleteComment(id:string) {
    if(confirm("Yorumu silmek istediğinizden emin misiniz ? ")) {
      this.commentService.deleteComment(id).subscribe(response=>{
        response.success ? this.toastrService.success("Yorum başarıyla silindi","BAŞARILI") : this.toastrService.error("Bir hata meydana geldi","HATA")
        this.getPassiveComments();
      })
    }
  }

  passiveCommentToActiveComment(comment:Comment) {
    if(confirm("Yorumu onaylamak  istediğinizden emin misiniz ? ")) {
      this.commentService.PassiveCommentToActiveComment(comment).subscribe(response=>{
        response.success ? this.toastrService.success("Yorum başarıyla aktif edildi","BAŞARILI") : this.toastrService.error("Bir hata meydana geldi","HATA")
        this.getPassiveComments();
      })
    }
    
  }


}
