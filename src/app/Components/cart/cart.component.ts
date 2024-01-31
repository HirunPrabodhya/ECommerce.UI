import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../Common/Product';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{
    cartItems : any[] = [];
    cookieStorage : Product[] = [];
    itemTotalPrice : number = 0;
    userId : number;
    
   tableHeader : String[] = ["Item","Name","Total Price(Rs:)","Action"];
  constructor(private cookieService : CookieService,private route : ActivatedRoute){
   
    
  }
    
    ngOnInit(): void {
        this.route.paramMap.subscribe(
            params=>{
                this.userId = Number(params.get('id'));
            }
        )
      const cartCookie = this.cookieService.get('cart');
      if(cartCookie){
       this.cookieStorage = JSON.parse(cartCookie);
      
       
         this.cookieStorage.forEach((a : Product) =>{
            Object.assign(a,{TotalPrice : a.Quentity * a.UnitPrice});
           
         })
         this.cartItems.push(...this.cookieStorage);
      }
        this.cartItems.forEach(a=>{
            this.itemTotalPrice += a.TotalPrice
        });


    }
   
    deleteCart(id : number){
       this.cartItems.splice(id,1);
       this.cookieService.set('cart',JSON.stringify(this.cartItems));
    }
    
    
}
