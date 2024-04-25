import { Component, OnInit } from '@angular/core';
import { faBars, faHeart, faPhone, faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import { MessageService } from 'primeng/api';
import { Order } from 'src/app/_class/order';
import { OrderDetail } from 'src/app/_class/order-detail';

import { CartService } from 'src/app/_service/cart.service';
import { OrderService } from 'src/app/_service/order.service';
import { StorageService } from 'src/app/_service/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkpay',
  templateUrl: './checkpay.component.html',
  styleUrls: ['./checkpay.component.css'],
  providers: [MessageService]

})
export class CheckPayComponent implements OnInit {
  username !: string;

  constructor(public cartService: CartService, private orderService: OrderService, private storageService: StorageService,private router:Router) {

  }
  ngOnInit(): void {

    this.username = this.storageService.getUser().username;
    const searchParams = new URLSearchParams(window.location.search);
   console.log(searchParams);
    if (searchParams.get('vnp_ResponseCode') == '00') {
      if (searchParams.get('vnp_TxnRef')) {
        this.orderService.checkoutOrder(searchParams.get('vnp_TxnRef')).subscribe({
          next: () => {
            this.cartService.clearCart();
            alert('Đặt hàng thành công');
            
          }
        });
      }
    } else {
      // const defaultStatus = 4;
      // this.orderService.updateOrder(id, defaultStatus).subscribe({
      //     next: res =>{
      //         // this.getListOrder(); // Bạn cần định nghĩa getListOrder() để làm mới danh sách đơn hàng
      //     }
      // });
      
      this.router.navigate(['/enrro-pay']);
    }
  }
  
  
  

}
