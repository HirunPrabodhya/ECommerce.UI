import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Product } from '../Common/Product';
import { UserService } from 'src/app/Services/User/user.service';
import { UserStoreService } from 'src/app/Services/User/user-store.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  cartItemCount: number = 0;
  firstName = "";
  userId : number;
  cartItem : Product[] = [];
  isUserLogin : boolean;


    constructor(private cookieService : CookieService,private userService : UserService,private userStoreService : UserStoreService){
      const cartCookie = this.cookieService.get('cart');
      if(cartCookie){
        this.cartItem = JSON.parse(cartCookie);
        this.cartItemCount = this.cartItem.length;
      }
    }
  ngOnInit(): void {
      if(!this.userService.isLogin()){
          this.isUserLogin = false;
      }
      else{
        this.userStoreService.getFirstName()
        .subscribe(val =>{
          let firstNameFromToken = this.userService.getFirstNameFromToken();
          this.firstName = val || firstNameFromToken;
        });

        this.userStoreService.getUserId()
        .subscribe(
          res =>{
              let uIdFromToken = this.userService.getUserIdFromToken();
              this.userId = res|| uIdFromToken;
            }
          
        );
      }
      
  }
  signout(){
    this.userService.logout();
    this.firstName = "";
}
}
