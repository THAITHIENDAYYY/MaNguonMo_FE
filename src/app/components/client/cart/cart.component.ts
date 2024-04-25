import { Component } from '@angular/core';
import {
  faBars,
  faHeart,
  faPhone,
  faShoppingBag,
} from '@fortawesome/free-solid-svg-icons';
import { CartService } from 'src/app/_service/cart.service';
import { VoucherService } from 'src/app/_service/voucher.service';
import { StorageService } from 'src/app/_service/storage.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  providers: [MessageService],
})
export class CartComponent {

  appliedItem: any = null;

    toggleApply(item: any) {
        if (this.appliedItem !== null) {

            // Nếu đã có voucher được áp dụng, hủy áp dụng voucher đó
            localStorage.removeItem('magg');
            this.appliedItem = null;      
        }
        else{
          this.applyVoucher(item)
        }
        this.totalDiscount();
    }
    clearAppliedItem(){
      localStorage.removeItem('magg');
    }

    getMaGiamGia(){
      return JSON.parse(localStorage.getItem('magg') as any)
    }
   

    // Phương thức này trả về văn bản dựa trên việc item đã được áp dụng hay chưa
    getApplyButtonText(item: any): string {
      
        return this.appliedItem === item ? 'Hủy' : 'Áp dụng';
        
    }

    
  
  totalFinal: number = 0;
  //
  listVoucher: any;
  id: any;
  voucher: any;
  heart = faHeart;
  bag = faShoppingBag;
  phone = faPhone;
  bars = faBars;
  totalsale = 0;
  showDepartment = false;
  

  constructor(
    public cartService: CartService,
    public voucherService: VoucherService,
    public storageService: StorageService,
    private messageService: MessageService
  ) {}
  ngOnInit(): void {
    this.id = this.storageService.getUser().id;
    this.getListVoucher();
    this.totalDiscount();
  }

  showDepartmentClick() {
    this.showDepartment = !this.showDepartment;
  }

  removeFromCart(item: any) {
    this.cartService.remove(item);
    this.totalDiscount();  
  }

  updateQuantity(item: any, event: any) {
    let quantity: number = event.target.value;
    this.cartService.updateCart(item, quantity);
  }

  plusQuantity(item: any) {
    let quantity = Number(item.soluong);
    this.cartService.updateCart(item, (quantity += 1));
    this.totalDiscount();  
  }
  subtractQuantity(item: any) {
    if (item.quantity > 1) {
      let quantity = Number(item.soluong);
      this.cartService.updateCart(item, (quantity -= 1));
    }
    this.totalDiscount();  
  }
  getListVoucher() {
    this.voucherService.getListVoucher(this.id).subscribe({
      next: (res) => {
        this.listVoucher = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  applyVoucher(magg: any) {
    this.appliedItem = magg;
    this.cartService.setMaGiamGia(magg);
    // this.getVoucher();
    this.totalDiscount();   
  }
  
  getVoucher() {
    this.voucher = this.cartService.getMaGiamGia();
    console.log(this.voucher);
  }
  
  totalDiscount() {
    this.getVoucher();
    if (this.voucher) {      
      this.totalFinal = this.cartService.total - this.voucher.money;
    } else {
      this.totalFinal = this.cartService.total;
    }
    // Kiểm tra nếu totalFinal nhỏ hơn 0, gán nó bằng 0
    if (this.totalFinal < 0) {
      this.totalFinal = 0;
  }
  }
  showSuccess(text: string) {
    this.messageService.add({
      severity: 'success',
      summary: 'Thông Báo',
      detail: text,
    });
  }
  showError(text: string) {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: text,
    });
  }

  showWarn(text: string) {
    this.messageService.add({
      severity: 'warn',
      summary: 'Cảnh Báo',
      detail: text,
    });
  }
}
