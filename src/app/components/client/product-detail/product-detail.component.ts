import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faBars, faHeart, faPhone, faRetweet, faShoppingBag, faStar, faStarHalf,faEye } from '@fortawesome/free-solid-svg-icons';
import { MessageService } from 'primeng/api';
import { CartService } from 'src/app/_service/cart.service';
import { ProductService } from 'src/app/_service/product.service';
import { WishlistService } from 'src/app/_service/wishlist.service';

import { ProductcolorService } from 'src/app/_service/productcolor.service';
import { ProductroomService } from 'src/app/_service/productroom.service';
import { ProductsizeService } from 'src/app/_service/productsize.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
  providers: [MessageService]

})
export class ProductDetailComponent implements OnInit {
  selectedColor: any;
  colorsave:any;

  selectedSize: any;
  sizesave:any;

  selectedRoom: any;
  roomsave:any;

  listProductcolor : any;
  listProductroom : any[] =[];
  listProductsize : any[] =[];
  heart = faHeart;
  bag = faShoppingBag;
  phone = faPhone;
  bars = faBars;
  star = faStar;
  star_half = faStarHalf;
  retweet = faRetweet;
  eye=faEye;

  showDepartment = false;

  id: number = 0;
  
  product : any;
  listRelatedProduct: any[] =[];
  quantity : number = 1;

  // Khai báo biến boolean để kiểm tra xem có vượt quá giới hạn không
exceedLimit: boolean = false;



  constructor(private productService: ProductService,    
    private productroomService: ProductroomService,
    private productsizeService: ProductsizeService,
    private productcolorService: ProductcolorService,
    private router: Router,
    private route: ActivatedRoute,
    public cartService: CartService,
    public wishlistService: WishlistService,
    private messageService: MessageService){
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;

  }
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.getProduct();    
    this.getListProductcolor();
    this.getListProductroom();
    this.getListProductsize();
  }

  showDepartmentClick(){
    this.showDepartment = !this.showDepartment;
  }
  getListProductcolor(){
    this.productcolorService.getList().subscribe({
      next: res=>{
        this.listProductcolor = res;
        
      },error: err =>{
        console.log(err);
      }
    })
  }
  getListProductsize(){
    this.productsizeService.getList().subscribe({
      next: res=>{
        this.listProductsize = res;
      },error: err =>{
        console.log(err);
      }
    })
  }
  getListProductroom(){
    this.productroomService.getList().subscribe({
      next: res=>{
        this.listProductroom = res;
      },error: err =>{
        console.log(err);
      }
    })
  }
  
  getProduct(){
    this.productService.getProdct(this.id).subscribe({
      next: res =>{
        this.product = res;
   
        this.getListRelatedProduct();
      },error: err=>{
        console.log(err);
      }
    })
  }
 


  getListRelatedProduct(){
    this.productService.getListRelatedProduct(this.product.category.id).subscribe({
      next: res =>{
        this.listRelatedProduct= res;
      },error: err=>{
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
 
 
  addCart(item:any){
   
   item.color=this.colorsave;
   item.size=this.sizesave;
   item.room=this.roomsave;
    // Kiểm tra số lượng sản phẩm
    if (item.quantity <= 0) {
      // Hiển thị thông báo sản phẩm đã hết hàng
      this.showError("Sản phẩm đã hết hàng!");
    } else {
    this.cartService.getItems();
    this.cartService.addToCart(item,this.quantity);
    this.showSuccess("Thêm giỏ hàng thành công!");}
  }
// Phương thức để tăng số lượng sản phẩm
plusQuantity() {
  if (this.quantity < this.product.quantity) {
    this.quantity++;
  } else {
    this.exceedLimit = true; // Đặt biến exceedLimit thành true nếu vượt quá giới hạn
    this.showWarn("Số lượng đã vượt quá giới hạn!")
  }
}
validateQuantity() {
  if (this.quantity > this.product.quantity) {
    this.quantity = this.product.quantity;
  }
}

// Phương thức để giảm số lượng sản phẩm
subtractQuantity() {
  if (this.quantity > 1) {
    this.quantity--;
    this.exceedLimit = false; // Đặt biến exceedLimit thành false khi giảm số lượng
  }
}
  addToWishList(item: any){
    if(!this.wishlistService.productInWishList(item)){
      this.wishlistService.addToWishList(item);
      this.showSuccess("Thêm yêu thích thành công!")
    }
  }

  // plusQuantity(){
  //   this.quantity += 1;
  // }
  // subtractQuantity(){
  //   if(this.quantity > 1){
  //     this.quantity -= 1;
  //   }
  // }
  changeColor(colorName: any): void {
    this.selectedColor = colorName; 
   this.colorsave=colorName;
  }
  changeSize(sizeName: any): void {
    this.selectedSize = sizeName; 
    this.sizesave=sizeName;
  }
  changeRoom(roomName: any): void {
    this.selectedRoom = roomName;   
  this.roomsave=roomName;
  }

  showSuccess(text: string) {
    this.messageService.add({severity:'success', summary: 'Thông báo', detail: text});
  }
  showError(text: string) {
    this.messageService.add({severity:'error', summary: 'Error', detail: text});
  }

  showWarn(text: string) {
    this.messageService.add({severity:'warn', summary: 'Warn', detail: text});
  }
}
