import { Component, OnInit, ChangeDetectorRef, AfterContentChecked } from '@angular/core';
import { Router } from '@angular/router';
import {faBars, faHeart, faRightFromBracket, faUser,faAnglesUp} from '@fortawesome/free-solid-svg-icons'
import { faFacebook ,faInstagram,faYahoo,faYoutube,faTelegram} from '@fortawesome/free-brands-svg-icons';

import {faShoppingBag} from '@fortawesome/free-solid-svg-icons'
import {faPhone} from '@fortawesome/free-solid-svg-icons'
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/_service/auth.service';
import { CartService } from 'src/app/_service/cart.service';
import { CategoryService } from 'src/app/_service/category.service';
import { StorageService } from 'src/app/_service/storage.service';
import { WishlistService } from 'src/app/_service/wishlist.service';


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
  providers: [MessageService]

})
export class IndexComponent implements OnInit {
 
  listItemInCart: any[] = [];
  totalPrice = 0;
  heart = faHeart;
  bag = faShoppingBag;
  phone = faPhone;
  userIcon = faUser;
  logoutIcon = faRightFromBracket;
  bars = faBars;
  fb=faFacebook;
  youtube=faYoutube;
  tele=faTelegram;
  ins=faInstagram;
top=faAnglesUp;
  showDepartment = false;



  loginForm : any = {
    username : null,
    password : null
  }

  registerForm : any = {
    username: null,
    email: null,
    password: null
  }

  isSuccessful = false;
  isSignUpFailed = false;
  isLoggedIn = false;
  isLoginFailed = false;
  roles: string[] = [];
  errorMessage = '';
  authModal : boolean = false;
  listCategoryEnabled : any;


  keyword: any;
  isAdmin: boolean = false; // Khởi tạo isAdmin với giá trị mặc định là false

  constructor(
    public cartService:CartService,
    public wishlistService: WishlistService,
    private authService: AuthService,
    private storageService: StorageService,
    private messageService:MessageService,
    private categoryService: CategoryService,
    private router: Router){

  }

  ngOnInit(): void {
    this.getCategoryEnbled();
    this.isLoggedIn = this.storageService.isLoggedIn();
    this.wishlistService.loadWishList();
    this.cartService.loadCart();

   
  // Ví dụ: lấy vai trò từ dữ liệu đã đăng nhập
  this.roles = this.storageService.getUser().roles;
    // Kiểm tra vai trò của người dùng khi component được khởi tạo
    this.checkUserRole();
  }
  // Phương thức kiểm tra vai trò của người dùng
  checkUserRole(): void {
    // Kiểm tra xem vai trò của người dùng có phải là admin không
    this.isAdmin = this.roles.includes('ROLE_ADMIN'); // Thay 'admin' bằng vai trò admin thực tế trong ứng dụng của bạn
  }

  showDepartmentClick(){
    this.showDepartment = !this.showDepartment;
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

  removeFromCart(item:any){
    this.cartService.remove(item);
  }

  removeWishList(item: any){
    this.wishlistService.remove(item);
  }

  showAuthForm(){
    if(!this.isLoggedIn){
      this.authModal = true;
      this.loginForm = {username: null,password: null};
      this.registerForm = {username: null,email: null, password: null};
    }
  }

  login():void{
    const {username,password} = this.loginForm;
  if (!username || !password) {
    this.showWarn("Vui lòng nhập tên người dùng và mật khẩu."); 
    return;
  }
    console.log(this.loginForm);
    this.authService.login(username,password).subscribe({
      next: res =>{
        this.storageService.saveUser(res);
        this.isLoggedIn = true;
        this.isLoginFailed = false;
        this.roles = this.storageService.getUser().roles;
        this.showSuccess("Đăng nhập thành công!!");
        this.authModal = false;
        
      },error: err =>{
        console.log(err);
        this.isLoggedIn = false;
        this.isLoginFailed = true;
        // this.showError("Sai mật khẩu Or Chưa kích hoạt tài khoản");
        if (err.status === 400) {
          this.showError("Tài khoản hoặc mật khẩu không đúng.");
        } else if (err.status === 401) {
          this.showError("Tài khoản chưa kích hoạt.");
        } else {
          this.showError("Đã xảy ra lỗi. Vui lòng thử lại sau.");
        }
      }
    })
  }

  register():void{
    const {username,email,password} = this.registerForm;
    if (!username || !password ||!email) {
      this.showWarn("Vui lòng nhập đủ thông tin"); 
      return;
    }
    console.log(this.registerForm);
    this.authService.register(username,email,password).subscribe({
      next: res =>{
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.showSuccess("Đăng ký thành công")
        this.authModal = false;

         // Chuyển hướng đến trang xác minh (veri)
      this.router.navigate(['/email-verification']);
      },error: err =>{
        this.showError(err.message);
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    })
  }

  logout():void{
    this.authService.logout().subscribe({
      next:res =>{
        this.storageService.clean();
        this.isLoggedIn = false;
        this.authModal = false;
        this.showSuccess("Bạn đã đăng xuất!!");
      },error: err=>{
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

  showWarn(text: string) {
    this.messageService.add({severity:'warn', summary: 'Warn', detail: text});
  }
  
  getBackgroundColor(category: any): string {
    // Trả về màu nền tùy thuộc vào category hoặc id của category
    // Ví dụ: nếu category.id chẵn thì trả về màu xanh lá cây, nếu lẻ thì trả về màu xanh dương
    return category.id % 2 === 0 ? '#red' : '#blue';
}
 

}
