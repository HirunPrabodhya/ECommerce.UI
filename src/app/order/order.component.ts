import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../Services/User/user.service';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Product } from '../Components/Common/Product';
import { Order } from '../Components/Common/Order';
import { OrderService } from '../Services/Order/order.service';
import { CartData } from '../Components/Common/CartData';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent {
  options: string = '';
  orderForm : FormGroup;
  orderForm2 : FormGroup;
  name : string = "";
  address : string = "";
  phoneNumber : string = "";
  userId : number;
  splittedName : string[] = [];
  cartItems : any[] = [];
  cookieStorage : Product[] = [];
  itemTotalPrice : number = 0
  constructor(private fb : FormBuilder,private userService : UserService,private service : OrderService,private route : ActivatedRoute,private cookieService : CookieService){

  } 
  ngOnInit(): void {
    this.route.paramMap.subscribe(
      params=>{
          this.userId = Number(params.get('id'));
      }
  )
      this.orderForm = this.fb.group({
          card: ['',[Validators.required,Validators.minLength(16),Validators.maxLength(16)]],
          date: ['',Validators.required],
          security:['',[Validators.required,Validators.minLength(4),Validators.maxLength(4)]]
        });

      this.orderForm2 = this.fb.group({
          card2: ['',[Validators.required,Validators.minLength(16),Validators.maxLength(16)]]
      });

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
  get cardValue(){
      return this.orderForm.get("card");
  }
  get dataValue(){
      return this.orderForm.get("date");
  }
  get security(){
      return this.orderForm.get("security");
  }
  get card2Value(){
      return this.orderForm2.get("card2");
  }
  getOption(e : any){
    if(e.target.value == 'p1')
        this.options = e.target.value;
     if(e.target.value == 'p2')   
        this.options = e.target.value;
       
  }

  getOrder(){
    
    let cart : CartData[] = [];

      for(let i in this.cartItems){
          const cartData : CartData= {
            ProductId : this.cartItems[i].Id,
            Quentity : this.cartItems[i].Quentity,
            TotalPrice : this.cartItems[i].TotalPrice
          };
          cart.push(cartData);
      };

      console.log("cart: ",cart); 


      const order : Order = {
            UserId : this.userId,
            SubTotalPrice : this.itemTotalPrice,
            cartData : cart
      };
      console.log("order: ",order);
      this.service.addOrderToDB(order)
          .subscribe({
              next: res=>{
                  alert(res.message);
              },
              error:err=>{
                  console.log(err);
              }
              
          })
  }
}
