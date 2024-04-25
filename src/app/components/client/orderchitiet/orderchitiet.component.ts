import { Component, OnInit } from '@angular/core';
import { OrderChiTietService } from 'src/app/_service/orderchitiet.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-orderchitiet',
  templateUrl: './orderchitiet.component.html',
  styleUrls: ['./orderchitiet.component.css']
})
export class OrderchitietComponent implements OnInit {

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
  

}
