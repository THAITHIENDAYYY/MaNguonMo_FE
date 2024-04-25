import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SERVER_DOMAIN } from './domain.service';


const PRODUCTroom_API = SERVER_DOMAIN + "/api/productroom/";
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ProductroomService {
  products : any[] =[];
 
  constructor(private http:HttpClient) { }
    // tất cả
  getList():Observable<any>{
    return this.http.get(PRODUCTroom_API,httpOptions);
  }
  // theo user
  getListroomByUser(id: number):Observable<any>{
    return this.http.get(PRODUCTroom_API + id,httpOptions);
  }  
  //tạo
  createProductroom(name:string,username: string):Observable<any>{
    return this.http.post(PRODUCTroom_API +'create',{name,username},httpOptions);
  }
  //update
  updateProductroom(id: number,name: string):Observable<any>{
    return this.http.put(PRODUCTroom_API + 'update/' + id,{name},httpOptions);
  }
  // xóa
  deleteProductroom(id:number):Observable<any>{
    return this.http.delete(PRODUCTroom_API + 'delete/' + id,httpOptions);
  } 

}
