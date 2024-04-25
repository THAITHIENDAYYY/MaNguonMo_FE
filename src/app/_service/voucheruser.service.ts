import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SERVER_DOMAIN } from './domain.service';

// const VOUCHERUSER_API = "http://localhost:8080/api/voucheruser/";
const VOUCHERUSER_API = SERVER_DOMAIN + "/api/voucheruser/";
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class VoucherUserService {
  
 
  constructor(private http:HttpClient) { } 

  createVoucheruser(voucherId:number,userId:number):Observable<any>{
    
    return this.http.post(VOUCHERUSER_API +'create',{voucherId,userId},httpOptions);
  }

}
