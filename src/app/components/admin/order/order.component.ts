import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/_service/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  listOrder : any;
  transform(status: number): string {
    switch (status) {
      case 0: return 'Chờ Xác Nhận';
      case 1: return 'Chờ Lấy Hàng';
      case 2: return 'Chờ Giao Hàng';
      case 3: return 'Đã Giao';
      case 4: return 'Đã Hủy';
      case 5: return 'Trả Hàng';
      default: return 'Lỗi Hệ Thống';
    }
  }
  transform1(status: number): string {
    switch (status) {
      case 0: return 'Thanh toán khi nhận hàng';
      case 1: return 'Ví VNPAY';
      default: return '';
    }
  }
  constructor(private orderService: OrderService){

  }

  ngOnInit(): void {
    this.getListOrder();
  }


  getListOrder(){
    this.orderService.getListOrder().subscribe({
      next: res=>{
        this.listOrder = res;
        console.log(this.listOrder);
      },error: err =>{
        console.log(err);
      }
    })
  }

  downloadExcel(id : number) {
    this.orderService.downloadExcel(id).subscribe(
      (response: Blob) => {
        // Tạo một URL tạm thời cho file blob
        const url = window.URL.createObjectURL(new Blob([response]));
        // Tạo một link tải xuống và kích hoạt nó
        const link = document.createElement('a');
        link.href = url;
        link.download = 'orders.xlsx';
        link.click();

        // Giải phóng URL tạm thời
        window.URL.revokeObjectURL(url);
      },
      error => {
        console.error('Error downloading Excel:', error);
      }
    );
  }

}
