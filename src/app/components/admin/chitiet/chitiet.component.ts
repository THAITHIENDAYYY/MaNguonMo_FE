import { Component, OnInit } from '@angular/core';
import { OrderChiTietService } from 'src/app/_service/orderchitiet.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-chitiet',
  templateUrl: './chitiet.component.html',
  styleUrls: ['./chitiet.component.css']
})
export class ChitietComponent implements OnInit {

  listOrderCT: any;
  id: number = 0;

  constructor(private orderchitietService: OrderChiTietService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    if (this.id) {
      this.getOrderDetails(); 
    }
  }
  
  getOrderDetails() {
    this.orderchitietService.getOrderDetailsByOrderId(this.id).subscribe({
      next: res => {
        console.log(this.id);
        this.listOrderCT = res;
        console.log(this.listOrderCT);
      }, error: err => {
        console.log(err);
      }
    });
  }
  //tổng tiền
  calculateTotalSum(): number {
    let totalSum = 0;

    // Iterate through the listOrderCT array and sum up the 'subTotal' values
    for (const order of this.listOrderCT) {
      totalSum += order.subTotal || 0; // Make sure subTotal is a valid number
    }

    return totalSum;
  }

  downloadExcel() {
    this.orderchitietService.downloadExcel().subscribe(
      (response: Blob) => {
        // Tạo một URL tạm thời cho file blob
        const url = window.URL.createObjectURL(new Blob([response]));
        // Tạo một link tải xuống và kích hoạt nó
        const link = document.createElement('a');
        link.href = url;
        link.download = 'order_details.xlsx';
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
