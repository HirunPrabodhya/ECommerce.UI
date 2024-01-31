import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../Services/User/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard{
  
  constructor(private userService : UserService, private router : Router) {
   
    
  }
  canActivate() : boolean{
    if(this.userService.isLogin())
          return true;
    else{
      alert("Please login first");
      this.router.navigate(["login"])
      return false;
    }
  }
  
}
