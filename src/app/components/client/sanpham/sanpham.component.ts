
import { Component, OnInit } from '@angular/core';
import { faBars, faHeart, faPhone, faRetweet, faShoppingBag ,faEye} from '@fortawesome/free-solid-svg-icons';
import { MessageService } from 'primeng/api';
import { CartService } from 'src/app/_service/cart.service';
import { ProductService } from 'src/app/_service/product.service';
import { WishlistService } from 'src/app/_service/wishlist.service';
@Component({
  selector: 'app-sanpham',
  templateUrl: './sanpham.component.html',
  styleUrls: ['./sanpham.component.css']
})
export class SanphamComponent {
  heart = faHeart;
  bag = faShoppingBag;
  retweet = faRetweet;
  eye=faEye;

  listProductNewest : any;

constructor(private productSerive:ProductService,private cartService: CartService, private wishlistService: WishlistService,private messageService: MessageService){}

ngOnInit(): void {
  this.getListProduct(); 

}


getListProduct(){
  this.productSerive.getListProduct().subscribe({
    next: res =>{
      this.listProductNewest = res;
    },error: err =>{
      console.log(err);
    }
  })
}

addToCart(product: any) {
  // Kiểm tra số lượng sản phẩm có sẵn
  if (product.quantity <= 0) {
    this.showError("Sản phẩm đã hết hàng!");
  } else if (this.cartService.getProductQuantityInCart(product.id) > product.quantity) {
    // Kiểm tra nếu số lượng sản phẩm trong giỏ hàng cộng với số lượng muốn thêm vào lớn hơn số lượng có sẵn
    this.showError("Số lượng sản phẩm đã hết!");
  } else {
    // Nếu không có vấn đề gì, thêm sản phẩm vào giỏ hàng
    this.cartService.addToCart(product, 1);
    this.showSuccess("Thêm giỏ hàng thành công!");
  }
}
addToWishList(item: any){
  if(!this.wishlistService.productInWishList(item)){
    this.showSuccess("Thêm yêu thích thành công!")
    this.wishlistService.addToWishList(item);
  }
}

showSuccess(text: string) {
  this.messageService.add({severity:'success', summary: 'Thông Báo', detail: text});
}
showError(text: string) {
  this.messageService.add({severity:'error', summary: 'Error', detail: text});
}

showWarn(text: string) {
  this.messageService.add({severity:'warn', summary: 'Cảnh Báo', detail: text});
}

}
