import { Component, OnInit } from '@angular/core';
import { faBars, faHeart, faPhone, faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import { MessageService } from 'primeng/api';
import { Order } from 'src/app/_class/order';
import { OrderDetail } from 'src/app/_class/order-detail';
import { UserService } from 'src/app/_service/user.service';
import { CartService } from 'src/app/_service/cart.service';
import { OrderService } from 'src/app/_service/order.service';
import { StorageService } from 'src/app/_service/storage.service';
import { ProductService } from 'src/app/_service/product.service';
import { Router } from '@angular/router'; // Import Router
import { count, forkJoin } from 'rxjs';
import { VoucherUserService } from 'src/app/_service/voucheruser.service';
import { VoucherService } from 'src/app/_service/voucher.service';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
  providers: [MessageService]

})
export class CheckoutComponent implements OnInit {
  voucher: any;
  totalFinal: number = 0;
  //
  heart = faHeart;
  bag = faShoppingBag;
  phone = faPhone;
  bars = faBars;
  showDepartment = false;
  order = new Order();
  listOrderDetail: any[] =[];
  username !: string;

  orderForm :any ={
    firstname: null,
    lastname : null,
    country : null,
    addrest : null,
    town : null,
    state : null,
    postCode: null,
    email: null,
    phone: null,
    note: null
  }
  bank: number = 0; // Mặc định là 0 (thanh toán khi nhận hàng)

  updateBank(event: any) {
    const isChecked = event.target.checked;
    const id = event.target.id;
  
    // Nếu checkbox Thanh Toán VNPay được chọn
    if (id === 'vnpay') {
      // Nếu checkbox được chọn, cập nhật bank = 1, ngược lại cập nhật bank = 0
      this.orderForm.bank = isChecked ? 1 : 0;
      this.isVNPaySelected = isChecked;

    }
  
    // Nếu checkbox Thanh Toán Khi Nhận Hàng được chọn
    if (id === 'payment') {
      // Nếu checkbox được chọn, cập nhật bank = 0, ngược lại cập nhật bank = 1
      this.orderForm.bank = isChecked ? 0 : 1;
      this.isPaymentSelected = isChecked;
      
    }
   }
   isPaymentSelected: boolean = false;
  isVNPaySelected: boolean = false;
   

  
  constructor(private userService: UserService,
    private voucherService:VoucherService,
    private voucherUserService:VoucherUserService,
    public cartService: CartService,
    private orderService:OrderService,
    private storageService: StorageService,
    private router: Router,
    private productService:ProductService
    ){
  }
  ngOnInit(): void {
    // console.log(this.username);
    // Lấy tên người dùng từ dịch vụ lưu trữ
    this.username = this.storageService.getUser().username;
    this.totalDiscount();

    // Lấy thông tin người dùng từ API và cập nhật orderForm
    this.userService.getUser(this.username).subscribe(
      (userDetails: any) => {
        this.orderForm.firstname = userDetails.firstname;
        this.orderForm.lastname = userDetails.lastname;
        this.orderForm.country = userDetails.country;
        this.orderForm.address = userDetails.address;
        this.orderForm.town = userDetails.town;
        this.orderForm.state = userDetails.state;
        this.orderForm.postCode = userDetails.postCode;
        this.orderForm.email = userDetails.email;
        this.orderForm.phone = userDetails.phone;
        // Gọi service để đặt hàng
      },
      (error) => {
        console.error('Lỗi khi lấy thông tin người dùng:', error);
      }
    );
    // Lấy danh sách sản phẩm từ giỏ hàng
    this.cartService.getItems();
    // console.log(this.cartService.getItems())
  }


  //voucher
  getVoucher() {
    this.voucher = this.cartService.getMaGiamGia();
  }
  
  totalDiscount() {
    this.getVoucher();
    if (this.voucher) {      
      this.totalFinal = this.cartService.total - this.voucher.money;   

      console.log(this.voucher.money);
    } else {
      this.totalFinal = this.cartService.total;
    }
    // Kiểm tra nếu totalFinal nhỏ hơn 0, gán nó bằng 0
    if (this.totalFinal < 0) {
      this.totalFinal = 0;
    }
  }
  //
  showDepartmentClick(){
    this.showDepartment = !this.showDepartment;
  }
  updateProductQuantitiesAndPlaceOrder() {
    const productIds: number[] = this.cartService.items.map(item => item.id);
    // Tạo một mảng chứa số lượng cần trừ cho mỗi sản phẩm
    let quantitiesToSubtract: number[] = [];
    let quantitiesToSubtract1: number[] = [];
  
    // Lặp qua từng sản phẩm trong giỏ hàng để tính toán số lượng cần trừ
    this.cartService.items.forEach(item => {
      // Lấy ra số lượng sản phẩm trong giỏ hàng (quantity)
      const productQuantity = item.soluong;
      const productQuantity1 = item.quantitybuy;
  
      // Lấy ra số lượng sản phẩm đã đặt hàng (orderDetail)
      const orderDetailQuantity = item.quantity;
  
      // Tính toán số lượng cần trừ cho sản phẩm
      const quantityToSubtract = orderDetailQuantity - productQuantity;
      // Tính toán số lượng cần thêm vào đã bán
      const quantityToSubtract1 = productQuantity + productQuantity1;
  
      // Thêm số lượng cần trừ vào mảng
      quantitiesToSubtract.push(quantityToSubtract);
       // Thêm số lượng cần cộng vào mảng
       quantitiesToSubtract1.push(quantityToSubtract1);
    });
  
    // Tạo một mảng các observable cho mỗi yêu cầu cập nhật số lượng sản phẩm
    const updateRequests = productIds.map((productId, index) => {
      return this.productService.updateProductQuantity(productId, quantitiesToSubtract[index],quantitiesToSubtract1[index]);
    });  
  
    // Sử dụng forkJoin để gửi các yêu cầu cập nhật số lượng sản phẩm một cách song song
    forkJoin(updateRequests).subscribe(
      responses => {
        console.log('Tất cả số lượng sản phẩm đã được cập nhật thành công!');
        // Thực hiện các hành động khác sau khi cập nhật thành công
      },
      error => {
        console.error('Lỗi khi cập nhật số lượng sản phẩm:', error);
      }
    );
  }
  

  
  
  
  placeOrder(){
    if (this.voucher === null || this.voucher === undefined) {
      this.voucher = { money: 0 }; // Khởi tạo this.voucher với một đối tượng mới có thuộc tính 'money' là 0
  }
  


    // order detail
    this.cartService.items.forEach(res =>{
      let orderDetail : OrderDetail = new OrderDetail;
      orderDetail.name = res.name;
      orderDetail.price = res.price;
      orderDetail.color = res.color;
      orderDetail.size = res.size;
      orderDetail.room = res.room;
      orderDetail.soluong = res.soluong;
      orderDetail.subTotal = res.subTotal;
      this.listOrderDetail.push(orderDetail);
    })
    // order
    const {firstname,lastname,country,address,town,state,postCcode,phone,email,note,status,bank} = this.orderForm;
    
    
    // if(bank === 0){
    //   this.orderForm.status = 1
    //   this.orderService.placeOrder(firstname,lastname,country,address,town,state,totalPrice,postCcode,phone,email,note,status,bank,this.listOrderDetail,this.username).subscribe({
    //       next: res => {
    //         console.log(res)
    //        // Nếu bank bằng 1 (tức là đang sử dụng 'vnpay') và code trả về là '00'
    //        if (bank === 0) {
    //         // Chuyển hướng tới trang 'check-vnpay'
    //         this.router.navigate(['/check-vnpay']);
    //       }
    
      
    this.orderService.placeOrder(firstname,lastname,country,address,town,state,this.totalFinal,postCcode,phone,email,note,status,bank,this.voucher.money,this.listOrderDetail,this.username).subscribe({
      next: res => {
        console.log(res)
      if (bank === 0) {
        // Chuyển hướng tới trang 'check-vnpay'
        this.router.navigate(['/check-vnpay']);
      }
      else if (bank === 1 && res?.code === '00') {
        // Chuyển hướng tới đường dẫn được trả về từ server
        window.location.assign(res.data);
      }          
        this.cartService.clearCart();//xóa giỏ hàng       
        
    },
    error: err => {
      console.log(err);
    }
    })
    this.updateProductQuantitiesAndPlaceOrder();
    // if(this.totalFinal>0)
    // {
    //   console.log(this.storageService.getUser().id);
    //   console.log(this.cartService.getMaGiamGia().id);
    //   this.voucherUserService.createVoucheruser(this.storageService.getUser().id,this.cartService.getMaGiamGia().id).subscribe({

    //   })
    // }
    if (this.totalFinal > 0) {
      const userId = this.storageService.getUser().id;
      const voucherId = this.cartService.getMaGiamGia().id;
      const count = this.cartService.getMaGiamGia().count-1;

      console.log(userId);
      console.log(voucherId);
    
      this.voucherUserService.createVoucheruser( voucherId,userId).subscribe({
        next: (response) => {
          // Xử lý phản hồi thành công
        },
        error: (error) => {
          // Xử lý lỗi
        }
      });
      this.voucherService.updateVouchercount(voucherId,count).subscribe({
        next: (response) => {
          // Xử lý phản hồi thành công
        },
        error: (error) => {
          // Xử lý lỗi
        }
      });
    }
  }
}