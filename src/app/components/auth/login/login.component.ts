import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/loginManager/user';
import { UserDetails } from 'src/app/models/loginManager/userDetails';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: UserDetails; // mailini giren adamın bilgileri tutulacak
  mailAddress: string;
  loginForm: FormGroup;

  constructor(private toastrService: ToastrService, private authService: AuthService, private formBuilder: FormBuilder, private router: Router) { }
  ngOnInit(): void {
    this.createLoginForm();

  }

  getUserDetailsByMail(mail: string, successCallBack?: () => void) {
    this.authService.getUserDetailsByMailAddress(mail).subscribe(response => {
      if (response.success) {
        this.user = response.data
      }
      else {
        this.toastrService.error("Kullanıcı Bulunamadı")
      }
      if (successCallBack) {
        successCallBack();
      }
    })
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ["", Validators.required],
      password: ["", Validators.required]
    })
  }

  login(mail: string) {
    const myList: any = [];
    let model = Object.assign({}, this.loginForm.value);
    this.authService.login(model).subscribe(response => {
      if (response.success) {
        this.getUserDetailsByMail(mail, () => {
          console.log(this.user.operationClaims);
          
          if(this.user.operationClaims ===null) {
            this.toastrService.error("Yetkiniz Yok","HATA")
          }
          else {
            for (let i = 0; i < this.user.operationClaims.length; i++) {
              myList.push(this.user.operationClaims[i].name)
            }
            localStorage.setItem("myList", JSON.stringify(myList));
            let isAuthanticated = false;
            for (let i = 0; i < this.user.operationClaims.length; i++) {
              if (this.user.operationClaims[i].name === "admin" || this.user.operationClaims[i].name === "suser") {
                isAuthanticated = true;
                this.router.navigate(["/"]);
                this.toastrService.success("Giriş Başarılı", "BAŞARILI");
                break;
              }
            }
            if (!isAuthanticated) {
              this.toastrService.error("Giriş yapmak için yetkiniz yok!", "HATA");
            }
          }
        })
      }
    }, error => this.toastrService.error(error.error))

  }
}
