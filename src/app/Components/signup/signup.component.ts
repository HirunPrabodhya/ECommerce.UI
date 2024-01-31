import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {  Router } from '@angular/router';
import { UserService } from 'src/app/Services/User/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{
 userForm : FormGroup;
 passwordType : string = "password";
 eye : string = "fa-eye-slash";
 show:boolean = false;
 constructor(private fb : FormBuilder, private service : UserService,private router : Router) {
   

 }
 ngOnInit(): void {
      this.userForm = this.fb.group({
        firstName : ["",Validators.required],
        lastName : ["",Validators.required],
        gender:["Male",Validators.required],
        address:["",Validators.required],
        contactNumber:["",[Validators.required,Validators.pattern('[0-9]{10}')]],
        email: ["",[Validators.required,Validators.email]],
        password:["",Validators.required]
    });
 }
 get firstNameValue(){
    return this.userForm.get("firstName");
 }
 get lastNameValue(){
    return this.userForm.get("lastName");
 }
 get genderValue(){
    return this.userForm.get("gender");
 }
 get addressValue(){
  return this.userForm.get("address");
 }
 get contactNumberValue(){
    return this.userForm.get("contactNumber");
 }
 get emailValue(){
    return this.userForm.get("email");
 }
 get passwordValue(){
    return this.userForm.get("password");
 }
 
  signUp(){
      if(this.userForm.valid){
        
          this.service.registerUser(this.userForm.value)
                      .subscribe(
                        {
                          next: res=>{
                            alert(res.message);
                            this.userForm.reset();
                            this.router.navigate(["/login"]);

                          },
                          error:(err : Response)=>{
                            console.log(err);
                            
                          }
                        }
                      )
      }
      else{
        alert("Form is invalid");
      }
  }
  passwordHideShow(){
    this.show = !this.show;
    (this.show) ? this.passwordType = "text" : this.passwordType = "password";
    (this.show) ? this.eye = "fa-eye" : this.eye = "fa-eye-slash";
  }
}
