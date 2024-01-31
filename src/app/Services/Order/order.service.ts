import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiAddress } from 'src/app/Components/Common/ApiAddress';
import { Order } from 'src/app/Components/Common/Order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http : HttpClient) { }
  
  addOrderToDB(myOrder : Order) : Observable<any>{
      return this.http.post(apiAddress.baseUrl+"Orders",myOrder);
      
  }
}
