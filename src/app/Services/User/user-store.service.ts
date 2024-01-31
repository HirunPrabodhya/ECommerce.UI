import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserStoreService {
  private firstName = new BehaviorSubject<string>("");
  private userId = new BehaviorSubject<string>("");
  private role = new BehaviorSubject<string>("");
  
  constructor() { }

  setUserId(id : string){
      this.userId.next(id);
  }
  setFirstName(firstName : string){
      this.firstName.next(firstName);
  }
  setRole(role : string){
      this.role.next(role);
  }

  getFirstName(){
    return this.firstName.asObservable();
  }
  getUserId(){
    return this.userId.asObservable();
  }
  getRole(){
    return this.role.asObservable();
  }

  
  


}
