import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiAddress } from 'src/app/Components/Common/ApiAddress';
import { Product } from 'src/app/Components/Common/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
//https://localhost:7047/api/Products/SearchProduct?letter=x
  constructor(private http : HttpClient) { }

  getAllProduct(): Observable<Product[]>{
    return this.http.get<Product[]>(apiAddress.baseUrl + "Products");
   }
   addProduct(productValue : FormData) : Observable<any>{
      return this.http.post<any>(apiAddress.baseUrl + "Products",productValue)
   }
   searchProduct(searchValue : string) : Observable<Product[]> {
      return this.http.get<Product[]>(apiAddress.baseUrl + "Products/SearchProduct?letter=" + searchValue)
   }
}
