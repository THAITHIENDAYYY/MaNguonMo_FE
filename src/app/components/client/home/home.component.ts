import { Component, OnInit } from '@angular/core';
import { faBars, faHeart, faPhone, faRetweet, faShoppingBag ,faEye} from '@fortawesome/free-solid-svg-icons';
import { MessageService } from 'primeng/api';
import { CartService } from 'src/app/_service/cart.service';
import { ProductService } from 'src/app/_service/product.service';
import { WishlistService } from 'src/app/_service/wishlist.service';
import { CategoryService } from 'src/app/_service/category.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [MessageService]

})
export class HomeComponent implements OnInit {
  
  listCategoryEnabled : any;
  heart = faHeart;
  bag = faShoppingBag;
  retweet = faRetweet;
  eye=faEye;

  listProductNewest : any;
  listProductPrice: any;

  showDepartment = true;


  category_items_response= [

    {
      breakpoint: '1024px',
      numVisible: 3,
      numScroll: 3
  },
  {
      breakpoint: '768px',
      numVisible: 2,
      numScroll: 2
  },
  {
      breakpoint: '560px',
      numVisible: 1,
      numScroll: 1
  }

]
responsiveOptions: any[] = [
  {
      breakpoint: '1024px',
      numVisible: 3,
      numScroll: 3
  },
  {
      breakpoint: '768px',
      numVisible: 2,
      numScroll: 2
  },
  {
      breakpoint: '560px',
      numVisible: 1,
      numScroll: 1
  }
];

category_items = [
  {
    id: 1,
    src: 'assets/image/slide.jpg',
    alt: '',
    // title: 'NEW'
  },
  {
    id: 2,
    src: 'assets/image/slide1.jpg',
    alt: '',
    // title: 'HOT'
  },
  {
    id: 3,
    src: 'assets/image/slide2.jpg',
    alt: '',
    // title: 'NEW'
  },
  {
    id: 4,
    src: 'assets/image/slide3.jpg',
    alt: '',
    // title: 'HOT'
  },
  {
    id: 5,
    src: 'assets/image/slide4.jpg',
    alt: '',
    // title: 'NEW'
  }
] ;
slides: any[] = new Array(6).fill({id: -1, src: '', title: '', subtitle: ''});
constructor(
  private categoryService: CategoryService,
  private productSerive:ProductService,
  private cartService: CartService, 
  private wishlistService: WishlistService,
  private messageService: MessageService){}

ngOnInit(): void {
  this.getCategoryEnbled();
  this.getListProduct();
  this.slides[0] = {
    src: 'assets/image/slide.jpg',
  };
  this.slides[1] = {
    src: 'assets/image/slide1.jpg',
  }
  this.slides[2] = {
    src: 'assets/image/slide2.jpg',
  }
  this.slides[3] = {
    src: 'assets/image/slide3.jpg',
  };
  this.slides[4] = {
    src: 'assets/image/slide4.jpg',
  }
  this.slides[5] = {
    src: 'assets/image/slide1.jpg',
  }

  

}


getListProduct(){
  this.productSerive.getListProductNewest(12).subscribe({
    next: res =>{
      this.listProductNewest = res;
    },error: err =>{
      console.log(err);
    }
  })
  this.productSerive.getListProductByPrice().subscribe({
    next:res =>{
      this.listProductPrice =res;
    },error: err=>{
      console.log(err);
    }
  })
}

// addToCart(item: any){
//   this.cartService.getItems();
//   this.showSuccess("Thêm giỏ hàng thành công!")
//   this.cartService.addToCart(item,1);
// }
// addToCart(item: any) {
//   // Kiểm tra số lượng sản phẩm
//   if (item.quantity <= 0) {
//     // Hiển thị thông báo sản phẩm đã hết hàng
//     this.showError("Sản phẩm đã hết hàng!");
//   } else {
//     // Nếu số lượng sản phẩm còn lớn hơn 0, thêm vào giỏ hàng
//     this.cartService.getItems();
//     this.showSuccess("Thêm giỏ hàng thành công!");
//     this.cartService.addToCart(item, 1);
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


getCategoryEnbled(){
  this.categoryService.getListCategoryEnabled().subscribe({
    next: res =>{
      this.listCategoryEnabled = res;
    },error: err =>{
      console.log(err);
    }
  })
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
scrollToTop() {
  const scrollDuration = 1000; // Thời gian để cuộn lên (1 giây)
  const scrollStep = -window.scrollY / (scrollDuration / 15);

  const scrollInterval = setInterval(function() {
    if (window.scrollY != 0) {
      window.scrollBy(0, scrollStep);
    } else {
      clearInterval(scrollInterval);
    }
  }, 15);
}
}
