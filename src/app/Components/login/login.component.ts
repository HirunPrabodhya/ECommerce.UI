import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserStoreService } from 'src/app/Services/User/user-store.service';
import { UserService } from 'src/app/Services/User/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  show:boolean = false;
  passwordType: string = "password";
  eye : string = "fa-eye-slash";
  
  constructor(private fb : FormBuilder,private service : UserService,private userStoreService : UserStoreService, private router : Router) {
    this.loginForm = fb.group({
      email:["",[Validators.required,Validators.email]],
      password:["",Validators.required]
    })

  }
  passwordHideShow(){
    this.show = !this.show;
    (this.show) ? this.passwordType = "text" : this.passwordType = "password";
    (this.show) ? this.eye = "fa-eye" : this.eye = "fa-eye-slash";
  }
  loginUp(){
      if(this.loginForm.valid){
          this.service.LoginUser(this.loginForm.value)
              .subscribe(
                {
                  next: res=>{
                    alert(res.message);
                    this.loginForm.reset();
                    this.getTokenFromLogin(res.token);
                      this.router.navigate([""])
                      .then(()=>{
                          location.reload();
                      });
                  },
                  error: err=>{
                      alert(err?.error.message);
                      console.log(err);
                  }
                }
              )
      }
      else{
        alert("Form is invalid")
      }
  }

   getTokenFromLogin(dbToken : string){
    this.service.storeToken(dbToken);
    const tokenPayload = this.service.decodeToken();
    this.userStoreService.setFirstName(tokenPayload.unique_name);
    this.userStoreService.setUserId(tokenPayload.nameid);
    this.userStoreService.setRole(tokenPayload.role);
  }
}
