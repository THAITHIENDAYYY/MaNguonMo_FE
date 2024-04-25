import { HttpHeaders,HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SERVER_DOMAIN } from './domain.service';
// const USER_API = "http://localhost:8080/api/user/";
const USER_API = SERVER_DOMAIN + "/api/user/";
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(private http: HttpClient) { }
  ngOnInit(): void {
          
  }

  getUser(username: string):Observable<any>{
    let params = new HttpParams();
    params = params.append('username',username);
    return this.http.get(USER_API,{params: params})
  }

  updateProfile(username: string,firstname: string,lastname:string,email:string,country:string,state:string,address: string,phone: string):Observable<any>{
    return this.http.put(USER_API +'update',{username,firstname,lastname,email,country,state,address,phone},httpOptions);
  }


  
  updateUser(id:number,username: string,firstname: string,lastname:string,email:string,country:string,state:string,address: string,phone: string,roles: number[]):Observable<any>{
    return this.http.put(USER_API +'update/'+ id,{id,username,firstname,lastname,email,country,state,address,phone,roles},httpOptions);
  }


  changePassword(username: string, oldPassword: string,newPassword: string):Observable<any>{
    return this.http.put(USER_API + 'password',{username,oldPassword,newPassword},httpOptions);
  }

  getListuser():Observable<any>{
    return this.http.get(USER_API+ 'alluser',httpOptions);
  }
  getListuserid(id: number):Observable<any>{
    return this.http.get(USER_API + id,httpOptions);
  }
  // xóa user theo id người dùng
  deleteUser(id:number):Observable<any>{
    return this.http.delete(USER_API + 'delete/' + id,httpOptions);
  }

}
