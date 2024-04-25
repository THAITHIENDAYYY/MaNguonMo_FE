import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../_class/order';
import { OrderDetail } from '../_class/order-detail';
import { SERVER_DOMAIN } from './domain.service';

import { map } from 'rxjs/operators';

// const ORDER_API = "http://localhost:8080/api/order/";
const ORDER_API = SERVER_DOMAIN + "/api/order/";
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(private http: HttpClient) { }


  getListOrder():Observable<any>{
    return this.http.get(ORDER_API,httpOptions);
  }
  getListstatus():Observable<any>{
    return this.http.get(ORDER_API + 'status',httpOptions);
  }

  getListOrderByUser(username: string):Observable<any>{
    let params = new HttpParams();
    params = params.append('username',username);
    return this.http.get(ORDER_API + 'user',{params: params});

  }

  placeOrder(firstname: string,lastname:string,country:string,address: string,town: string,state:string,totalPrice:number,postCode: string,phone:string,email:string,note:string,status: number,bank:number,sale:number,orderDetails: OrderDetail[],username: string):Observable<any>{
    return this.http.post(ORDER_API +'create',{firstname,lastname,country,address,town,state,totalPrice,postCode,phone,email,note,status,bank,sale,orderDetails,username},httpOptions);
  }
// thống kê
  getTotalRevenue(): Observable<number> {
    // Gọi API để lấy giá trị total_price từ bảng order
    return this.http.get<Order[]>(ORDER_API, httpOptions).pipe(
      map((orders: Order[]) => {
        // Tính toán tổng giá trị total_price từ danh sách order
        return orders.reduce((total, order) => total + order.totalPrice, 0);
      })
    );
  }
  getOders(): Observable<number> {
    return this.getListOrder().pipe(
      map(order => order.length)
    );
  }
  checkoutOrder(orderCode: string | null) {
    return this.http.get(ORDER_API + `checkOrder/${orderCode}`, httpOptions);
  }
  removeOrder(orderCode: string | null) {
    return this.http.delete(ORDER_API + "removeOrder/" + orderCode, httpOptions);
  }
  updateOrder(id: number,status:string):Observable<any>{
    return this.http.put(ORDER_API + 'update/'+id,{status},httpOptions);
  }
  downloadExcel(id:number): Observable<any> {
    const url = `${ORDER_API}excelorder/${id}`;
    return this.http.get(url, { ...httpOptions, responseType: 'blob' });
  }


}
