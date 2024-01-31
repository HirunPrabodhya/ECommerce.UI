import { Component, OnInit } from '@angular/core';
import { Product } from '../Common/Product';
import { CookieService } from 'ngx-cookie-service';
import { ProductService } from 'src/app/Services/Product/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/Services/Category/category.service';
import { UserService } from 'src/app/Services/User/user.service';



@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  cart : Product[] = [];
  id : number;
  categoryList: any[] = [];
  products : Product[] = [];
  errorMessage : string = "";
  productForm : FormGroup;
  imageFile : File;
  categoryOptionValue : string;
  constructor(
              private cookieService : CookieService,
              private service : ProductService,
              private categoryService : CategoryService,
              private userService : UserService,
              private router : Router,
              private route : ActivatedRoute,
              private fb : FormBuilder
              ) {
      this.productForm = fb.group({
        name : ['',Validators.required],
        price : ['',Validators.required],
        category:['',Validators.required]
  })

  }
  //get products from the api
  ngOnInit(): void {
      
      this.service.getAllProduct()
                  .subscribe(
                    {
                      next: res=>{
                         this.products = res;
                         this.products.forEach((a : Product) =>{
                              Object.assign(a,{Quentity : 1});
                         });
                      },
                      error: (err : Response)=>{
                          console.log(err);
                      }
                    }
                  );
        this.categoryService.getCategoryNameId()
                            .subscribe(
                              {
                                next: res=>{
                                  console.log(res);
                                    this.categoryList = res;
                                    console.log(this.categoryList);
                                }
                              }
                            )
                  
  }

 //increase and decrease quantity
 plusMinusButtons(value : string, product : Product){
  
  console.log(value);
          if(value === "fa-plus"){
            if(product.Quentity === 5)
                  return;
            product.Quentity += 1;   
          }
         if(value === "fa-minus"){
            if(product.Quentity === 1)
                return;
          product.Quentity -= 1;
        }
 }
 changeImage(e : any){
    const fileList : FileList = e.target.files;
    this.imageFile = fileList[0] as File;

 }

 changeOption(e : any){
    this.categoryOptionValue = e.target.value;
 }

  addProduct(){
      if(this.productForm.valid){
          const formData = new FormData();
          formData.append("Name",this.productForm.value.name);
          formData.append("UnitPrice",this.productForm.value.price);
          formData.append("ImageFile",this.imageFile,this.imageFile.name);
          formData.append("CategoryId",this.categoryOptionValue);

          this.service.addProduct(formData)
                      .subscribe(
                        {
                          next: res=>{
                            alert(res.message);
                            
                          },
                          error:err=>{
                            console.log(err);
                          }
                        }
                      )
      }
  }
  // add to cart 
  addToCart(product : Product){
    if(this.userService.isLogin()){
              //let totalPrice = product.UnitPrice * product.Quentity;
              
              if (!this.cookieService.get('cart')) {
                this.cart.push(product);
              }
              else {
                this.cart = [];
                let products = JSON.parse(this.cookieService.get('cart'));
                products.forEach((product: Product) => {
                  this.cart.push(product);
                });
                
                this.cookieService.delete('cart');
                this.cart.push(product);
              }
                // this.cart.forEach((a : Product)=>{
                //     Object.assign(a,{TotalPrice : totalPrice});
                // })

              this.cookieService.set('cart', JSON.stringify(this.cart));
    }
    else{
        alert("Please login first");
          this.router.navigate(["login"])
    }
    
    
      
  }
  searchProduct(input : string){
        console.log(input);
        this.service.searchProduct(input)
                    .subscribe(
                      {
                        next: res=>{
                          this.products = res;
                          this.products.forEach((a : Product) =>{
                            Object.assign(a,{Quentity : 1});
                          })
                          this.errorMessage = '';
                        },
                        error:(err)=>{
                    
                          if(err.status === 400){
                             this.errorMessage = err?.error.message;
                             
                          }
                      }
                        
                      }
                    )
  }
  closeForm(){
    window.location.reload();
  }
}
