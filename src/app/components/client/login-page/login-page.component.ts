import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/_service/auth.service';
import { StorageService } from 'src/app/_service/storage.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
  providers: [MessageService]

})
export class LoginPageComponent implements OnInit {


  isSuccessful = false;
  isSignUpFailed = false;
  isLoggedIn = false;
  isLoginFailed = false;
  roles: string[] = [];
  errorMessage = '';

  loginForm : any = {
    username : null,
    password : null
  }

  registerForm : any = {
    username: null,
    email: null,
    password: null
  }

  constructor(private authService:AuthService,private storageService: StorageService,private messageService:MessageService,private router:Router){}

  ngOnInit(): void {
  }

  // login():void{
  //   const {username,password} = this.loginForm;
  //   if (!username || !password) {
  //     this.showWarn("Vui lòng nhập tên người dùng và mật khẩu."); 
  //     return;
  //   }
  //   console.log(this.loginForm);
  //   this.authService.login(username,password).subscribe({
  //     next: res =>{
  //       this.storageService.saveUser(res);
  //       this.isLoggedIn = true;
  //       this.isLoginFailed = false;
  //       this.roles = this.storageService.getUser().roles;
  //       this.showSuccess("Đăng nhập thành công!!");
  //       this.router.navigate(['/admin']);
  //     },error: err =>{
  //       console.log(err);
  //       this.isLoggedIn = false;
  //       this.isLoginFailed = true;
  //     }
  //   })
  // }
  login(): void {
    const { username, password } = this.loginForm;
    if (!username || !password) {
      this.showWarn("Vui lòng nhập tên người dùng và mật khẩu.");
      return;
    }
    
    this.authService.login(username, password).subscribe({
      next: res => {
        this.storageService.saveUser(res);
        this.isLoggedIn = true;
        this.isLoginFailed = false;
        this.roles = this.storageService.getUser().roles;
        this.showSuccess("Đăng nhập thành công!!");
        // this.router.navigate(['/admin/charts']);
        // Kiểm tra quyền và chuyển hướng tùy thuộc vào quyền
    if (this.roles.includes("ROLE_ADMIN")) {
      this.router.navigate(['/admin/charts']); // Chuyển hướng đến trang dành cho quản trị viên
    } else if (this.roles.includes("ROLE_MODERATOR")) {
      this.router.navigate(['/moderator']); // Chuyển hướng đến trang dành cho người quản lý
    } else {
      this.router.navigate(['']); // Chuyển hướng đến trang chính sau khi đăng nhập
    }
      },
      error: err => {
        console.log(err);
        this.isLoggedIn = false;
        this.isLoginFailed = true;
        this.showError("Đăng nhập thất bại. Vui lòng kiểm tra tên đăng nhập và mật khẩu.");
      }
    });
  }
  

  register():void{
    const {username,email,password} = this.registerForm;
    console.log(this.registerForm);
    this.authService.register(username,email,password).subscribe({
      next: res =>{
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.showSuccess("Đăng ký thành công")
        this.loginForm.username = username;
        this.loginForm.password = password;
        this.login();
      },error: err =>{
        this.showError(err.message);
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    })
  }

  loginFormChange(){
    document.getElementById('container')?.classList.remove("right-panel-active");
  }
  registerFormChange(){
    document.getElementById('container')?.classList.add("right-panel-active");
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

}
