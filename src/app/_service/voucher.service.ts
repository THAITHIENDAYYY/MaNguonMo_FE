import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SERVER_DOMAIN } from './domain.service';

// const VOUCHER_API = "http://localhost:8080/api/voucher/";
const VOUCHER_API = SERVER_DOMAIN + "/api/voucher/";
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class VoucherService {
  // products : any[] =[];
 
  constructor(private http:HttpClient) { }

  getList():Observable<any>{
    return this.http.get(VOUCHER_API,httpOptions);
  }


  getListVoucher(id: number):Observable<any>{
    return this.http.get(VOUCHER_API + 'uservoucher/' + id,httpOptions);
  }
  enableVoucher(id: number){
    return this.http.put(VOUCHER_API + 'enable/'+ id,httpOptions);
  }
  

  

  createVoucher(id:number,name:string,count:number,money: string):Observable<any>{
    return this.http.post(VOUCHER_API +'create',{id,name,count,money},httpOptions);
  }

  updateVoucher(id:number,name:string,count:number,money: string):Observable<any>{
    return this.http.put(VOUCHER_API + 'update/'+id,{name,count,money},httpOptions);
  }

  updateVouchercount(id:number,count:number):Observable<any>{
    return this.http.put(VOUCHER_API + 'updatecount/'+id,{count},httpOptions);
  }

  deleteVoucher(id:number):Observable<any>{
    return this.http.delete(VOUCHER_API + 'delete/' + id,httpOptions);
  }



}
