

import { OrderService } from 'src/app/_service/order.service';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
@Component({
  selector: 'app-statusorder',
  templateUrl: './statusorder.component.html',
  styleUrls: ['./statusorder.component.css'],
  providers: [MessageService,ConfirmationService]
})
export class StatusorderComponent implements OnInit {
  onUpdate : boolean =false;
  liststatus: any;
  showForm : boolean = false;
  productForm: any ={
    // name : null,
    status : null
  };
  listOrder : any;
  // transform(status: number): string {
  //   switch (status) {
  //     case 0: return 'Chờ Xác Nhận';
  //     case 1: return 'Chờ Lấy Hàng';
  //     case 2: return 'Chờ Giao Hàng';
  //     case 3: return 'Đã Giao';
  //     case 4: return 'Đã Hủy';
  //     case 5: return 'Trả Hàng';
  //     default: return 'Lỗi Hệ Thống';
  //   }
  // }
  transform1(status: number): string {
    switch (status) {
      case 0: return 'Thanh toán khi nhận hàng';
      case 1: return 'Ví VNPAY';
      default: return '';
    }
  }
  constructor(private orderService: OrderService,private messageService: MessageService){

  }

  ngOnInit(): void {
    this.getListOrder();
    this.getListStatus();
  }
  getListStatus(){
    this.orderService.getListstatus().subscribe({
      next: res =>{
        this.liststatus = res;
      },error : err=>{
        console.log(err);
      }
    })
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
  openUpdate(data : any){
      this.onUpdate = true;
      this.showForm =true;
      this.productForm.id = data.id;
      this.productForm.status = data.orderstatus.id;
      
  }
  updateProduct(){
    const {id,status} = this.productForm;
    console.log(this.productForm);
    this.orderService.updateOrder(id,status).subscribe({
      next: res =>{
        this.getListOrder();
        this.showForm = false;
        this.showSuccess("Cập nhật thành công");
      },error: err =>{
        this.showError(err.message);
      }
    })

  }

  showSuccess(text: string) {
    this.messageService.add({severity:'success', summary: 'Success', detail: text});
  }
  showError(text: string) {
    this.messageService.add({severity:'error', summary: 'Error', detail: text});
  }
  
  showWarn(text : string) {
    this.messageService.add({severity:'warn', summary: 'Warn', detail: text});
  }

}
