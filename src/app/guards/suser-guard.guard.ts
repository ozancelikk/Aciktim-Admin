import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SuserGuardGuard implements CanActivate {
  constructor(private router:Router,private toastrService:ToastrService){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const storedList = localStorage.getItem("myList");
      const parsedList = JSON.parse(storedList);
      if (parsedList == null) {
        this.router.navigate(["/auth/login"])
        this.toastrService.error("Giriş Yapmalısınız", "HATA")
        return false;
      }
      for (let i = 0; i < parsedList.length; i++) {
        if (parsedList[i] === "suser") {
          return true;
        }
      }
      this.router.navigate([this.router.url])
      this.toastrService.error("Bu sayfaya girmek için yetkiye sahip değilsiniz", "HATA")
      return false;
  }
  
}
