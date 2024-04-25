import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SERVER_DOMAIN } from './domain.service';


const PRODUCTCOLOR_API = SERVER_DOMAIN + "/api/productcolor/";
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ProductcolorService {
  products : any[] =[];
 
  constructor(private http:HttpClient) { }
    // tất cả
  getList():Observable<any>{
    return this.http.get(PRODUCTCOLOR_API,httpOptions);
  }
  // theo user
  getListcolorByUser(id: number):Observable<any>{
    return this.http.get(PRODUCTCOLOR_API + id,httpOptions);
  }  
  //tạo
  createProductcolor(name:string,username: string):Observable<any>{
    return this.http.post(PRODUCTCOLOR_API +'create',{name,username},httpOptions);
  }
  //update
  updateProductcolor(id: number,name: string):Observable<any>{
    return this.http.put(PRODUCTCOLOR_API + 'update/' + id,{name},httpOptions);
  }
  // xóa
  deleteProductcolor(id:number):Observable<any>{
    return this.http.delete(PRODUCTCOLOR_API + 'delete/' + id,httpOptions);
  } 

}
