import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { ProductComponent } from './Components/product/product.component';
import { SignupComponent } from './Components/signup/signup.component';
import { LoginComponent } from './Components/login/login.component';
import { CartComponent } from './Components/cart/cart.component';
import { AuthGuard } from './Guards/auth.guard';
import { OrderComponent } from './order/order.component';

const routes: Routes = [
  {
    path: "",component : HomeComponent
  },
  {
    path: "product/:id",component: ProductComponent
  },
  {
    path: "product",component: ProductComponent
  },
  {
    path: "signup", component: SignupComponent
  },
  {
    path: "login" , component: LoginComponent
  },
  {
    path: "cart/:id" , component: CartComponent,canActivate:[AuthGuard]
  },
  {
    path: "order/:id" , component: OrderComponent 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
