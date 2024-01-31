import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiAddress } from 'src/app/Components/Common/ApiAddress';
import { Category } from 'src/app/Components/Common/Category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http : HttpClient) { }

  getAllCategory() : Observable<Category[]>{
    return this.http.get<Category[]>(apiAddress.baseUrl + "Categories");
  }
  addCategory(categoryValue : FormData) : Observable<any>{
      return this.http.post<any>(apiAddress.baseUrl + "Categories",categoryValue);
  }
  getCategoryNameId() : Observable<any>{
      return this.http.get<any>(apiAddress.baseUrl + "Categories/GetCategoryIdName")
  }
}
