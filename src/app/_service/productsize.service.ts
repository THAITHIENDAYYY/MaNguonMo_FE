import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SERVER_DOMAIN } from './domain.service';


const PRODUCTsize_API = SERVER_DOMAIN + "/api/productsize/";
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ProductsizeService {
  products : any[] =[];
 
  constructor(private http:HttpClient) { }
    // tất cả
  getList():Observable<any>{
    return this.http.get(PRODUCTsize_API,httpOptions);
  }
  // theo user
  getListsizeByUser(id: number):Observable<any>{
    return this.http.get(PRODUCTsize_API + id,httpOptions);
  }  
  //tạo
  createProductsize(name:string,username: string):Observable<any>{
    return this.http.post(PRODUCTsize_API +'create',{name,username},httpOptions);
  }
  //update
  updateProductsize(id: number,name: string):Observable<any>{
    return this.http.put(PRODUCTsize_API + 'update/' + id,{name},httpOptions);
  }
  // xóa
  deleteProductsize(id:number):Observable<any>{
    return this.http.delete(PRODUCTsize_API + 'delete/' + id,httpOptions);
  } 

}
