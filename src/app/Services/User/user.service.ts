import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { apiAddress } from 'src/app/Components/Common/ApiAddress';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userPayload : any;
  constructor(private http : HttpClient,private router : Router) { 
    this.userPayload = this.decodeToken();
  }

  //register user
  registerUser(userValue : HTMLInputElement) : Observable<any>{
    return this.http.post(apiAddress.baseUrl+"Users/Signup",userValue)
  }
  //login user
  LoginUser(userValue : HTMLInputElement) : Observable<any>{
      return this.http.post(apiAddress.baseUrl + "Users/Login",userValue);
  }
 
  //store Token
  storeToken(tokenValue : string){
      localStorage.setItem("token",tokenValue);
  }
  //get token
  getToken() : string | null{
    return localStorage.getItem("token");
  }
  //decrypt token values 
  decodeToken(){
    const jwtHelper = new JwtHelperService(); 
    const token = this.getToken()!;
    return jwtHelper.decodeToken(token);
  }
  isLogin() : boolean{
    return !! localStorage.getItem("token");
  }
  logout(){
    localStorage.clear();
    this.router.navigate([""])
    .then(()=>{
          location.reload();
    })
  }



  //get firstName from the token
  getFirstNameFromToken(){
    if(this.userPayload)
        return this.userPayload.unique_name;
 }
 //get Role from the token
 getRoleFromToken(){
    if(this.userPayload)
      return this.userPayload.role;
 }
 //get UserId from the token
 getUserIdFromToken(){
  if(this.userPayload)
      return this.userPayload.nameid;
 }
 
}
