import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { userDetails } from 'src/app/models/admin-manager/userDetails';
import { Claim, UserClaim } from 'src/app/models/claim/claim';
import { UserService } from 'src/app/services/admin-manager/user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  user: userDetails
  userId: any;
  claims: Claim[];
  userClaims: UserClaim[];
  form: FormGroup
  constructor(private toastrService: ToastrService, private userService: UserService, private route: ActivatedRoute, private formBuilder: FormBuilder) { }
  ngOnInit(): void {
    this.getUserId();
    this.getUserDetails();
    this.getUserClaimsByUserId();
    this.getAllClaims();
    this.createForm();
  }

  getUserDetails() {
    this.userService.getbyid(this.userId).subscribe(response => {
      response.success ? this.user = response.data : this.toastrService.error("Bir hata meydana geldi", "HATA")
      console.log(this.user);

    })
  }

  getUserId() {
    this.userId = this.route.snapshot.paramMap.get('id');
  }

  getUserClaimsByUserId() {
    this.userService.getUserClaimsByUserId(this.userId).subscribe(response => {
      response.success ? this.userClaims = response.data : this.toastrService.error("Bir hata meydana geldi", "HATA")

    })
  }

  getAllClaims() {
    this.userService.getAllClaims().subscribe(response => {
      response.success ? this.claims = response.data : this.toastrService.error("Bir hata meydana geldi", "HATA");

    })
  }

  addClaim() {
    let model = Object.assign({}, this.form.value)
    console.log(model);
    let isAlready = false;
    for (let i = 0; i < this.userClaims.length; i++) {
      if(this.userClaims[i].operationClaimId === model.operationClaimId) {
        isAlready = true;
        break;
      }
    }
    if(isAlready == false) {
      this.userService.addClaimToUser(model).subscribe(response => {
         response.success ? this.toastrService.success("Rol Başarıyla Eklendi") : this.toastrService.error("Bir hata meydana geldi", "HATA");
         this.getUserClaimsByUserId();
      })
    }
    else {
      this.toastrService.info("Eklemek istediğiniz rol kullanıcıda zaten mevcut","HATA")
    }
  }

  deleteClaim(model:UserClaim) {
    if(confirm("emin misin")) {
      this.userService.deleteClaimFromUser(model.id).subscribe(response=>{
        response.success ? this.toastrService.success("Rol başarıyla silindi.","BAŞARILI")
         : this.toastrService.error("Bir hata meydana geldi", "HATA");
         this.getUserClaimsByUserId();
      })
    }
   

  }
  createForm() {
    this.form = this.formBuilder.group({
      userId: [this.userId, Validators.required],
      operationClaimId: ["", Validators.required]
    })
  }

}
