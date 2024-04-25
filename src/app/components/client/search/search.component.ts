import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { faHeart, faRetweet, faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import { MessageService } from 'primeng/api';
import { CartService } from 'src/app/_service/cart.service';
import { CategoryService } from 'src/app/_service/category.service';
import { ProductService } from 'src/app/_service/product.service';
import { WishlistService } from 'src/app/_service/wishlist.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [MessageService]

})
export class SearchComponent implements OnInit {


  heart = faHeart;
  bag = faShoppingBag;
  retweet = faRetweet;

  keyword: any;
  listProduct:any;
  listProductNewest:any;
  listCategory :any;
  rangeValues = [0,100];

  constructor(
    private router: Router,
    private categoryService:CategoryService,
    private route:ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private messageService:MessageService,
    private wishlistService:WishlistService){
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {
    this.keyword = this.route.snapshot.params['keyword'];
    this.getListProduct();
    this.getListCategoryEnabled();
    this.getNewestProduct();
  }

  getListProduct(){
    this.productService.searchProduct(this.keyword).subscribe({
      next:res =>{
        this.listProduct = res;
        console.log(this.listProduct);
      },error: err =>{
        console.log(err);
      }
    })
  }

  getListCategoryEnabled(){
    this.categoryService.getListCategoryEnabled().subscribe({
      next: res =>{
        this.listCategory = res;
      },error: err=>{
        console.log(err);
      }
    })
  }

  getNewestProduct(){
    this.productService.getListProductNewest(4).subscribe({
      next:res =>{
        this.listProductNewest = res;
      },error: err =>{
        console.log(err);
      }
    })
  }


  // addToCart(item: any){
  //   this.cartService.getItems();
  //   this.cartService.addToCart(item,1);
  // }
  
  // addToWishList(item: any){
  //   if(!this.wishlistService.productInWishList(item)){
  //     this.wishlistService.addToWishList(item);
  //   }
  // }
  addToCart(product: any) {
    // Kiểm tra số lượng sản phẩm có sẵn
    if (product.quantity <= 0) {
      this.showError("Sản phẩm đã hết hàng!");
    } else {
      // Nếu không có vấn đề gì, thêm sản phẩm vào giỏ hàng
      this.cartService.addToCart(product,1);
      this.showSuccess("Thêm giỏ hàng thành công!");
    }
    console.log(product)
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
