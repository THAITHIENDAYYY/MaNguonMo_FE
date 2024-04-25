import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SERVER_DOMAIN } from './domain.service';
// const CATEGORY_API = "http://localhost:8080/api/category/";
const CATEGORY_API = SERVER_DOMAIN + "/api/category/";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  getListCategory():Observable<any>{
    return this.http.get(CATEGORY_API,httpOptions);
  }

  getListCategoryEnabled(){
    return this.http.get(CATEGORY_API + 'enabled',httpOptions);
  }

  createCategory(name: string,link:string){
    return this.http.post(CATEGORY_API + 'create',{name,link},httpOptions);
  }

  updateCategory(id: number, name: string,link:string){
    return  this.http.put(CATEGORY_API + 'update/' + id,{name,link},httpOptions);
  }

  enableCategory(id: number){
    return this.http.put(CATEGORY_API + 'enable/'+ id,httpOptions);
  }

  deleteCategory(id:number){
    return this.http.delete(CATEGORY_API + 'delete/'+ id,httpOptions);
  }


}
