import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faFaceLaughWink, faTag } from '@fortawesome/free-solid-svg-icons';
import {faSearch} from '@fortawesome/free-solid-svg-icons'
import {faBell} from '@fortawesome/free-solid-svg-icons'
import {faEnvelope} from '@fortawesome/free-solid-svg-icons'
import {faTachometerAlt} from '@fortawesome/free-solid-svg-icons'
import {faBookmark} from '@fortawesome/free-solid-svg-icons'
import {faReceipt} from '@fortawesome/free-solid-svg-icons'
import {faCartShopping} from '@fortawesome/free-solid-svg-icons'
import {faRocket} from '@fortawesome/free-solid-svg-icons'
import {faUser,faRunning,faCaretSquareDown,faChevronDown} from '@fortawesome/free-solid-svg-icons'
import {faBars} from '@fortawesome/free-solid-svg-icons'
import {faPaperPlane} from '@fortawesome/free-solid-svg-icons'
import {faGear} from '@fortawesome/free-solid-svg-icons'
import {faRightFromBracket} from '@fortawesome/free-solid-svg-icons'
import { AuthService } from 'src/app/_service/auth.service';
import { StorageService } from 'src/app/_service/storage.service';
import { UserService } from 'src/app/_service/user.service';

import { MenuItem } from 'primeng/api';
@Component({
  selector: 'app-pagemanagement',
  templateUrl: './pagemanagement.component.html',
  styleUrls: ['./pagemanagement.component.css']
})
export class PagemanagementComponent implements OnInit{
  faceLaugh = faFaceLaughWink;
  search = faSearch
  bell = faBell;
  evelope =faEnvelope;
  tachometer = faTachometerAlt;
  bookmark = faBookmark;
  receipt = faReceipt;
  cart= faCartShopping;
  rocket = faRocket;
  userIcon = faUser;
  userrun=faRunning;
  icontai=faChevronDown;
  paperPlane = faPaperPlane;
  bars = faBars;
  gear = faGear;
  logoutIcon = faRightFromBracket;
  tag = faTag;
  loggedInUser: any;
  userList: any[] = [];
  showSubMenuProduct: boolean = false;
    showSubMenuOrder: boolean = false;
    showSubMenuUser: boolean = false;

    toggleSubMenuProduct() {
        this.showSubMenuProduct = !this.showSubMenuProduct;
        this.showSubMenuOrder = false; // Ẩn submenu của mục "Quản lý Đơn hàng" khi bạn nhấp vào mục "Quản lý Sản phẩm"
        this.showSubMenuUser = false;
    }

    toggleSubMenuOrder() {
        this.showSubMenuOrder = !this.showSubMenuOrder;
        this.showSubMenuProduct = false;
        this.showSubMenuUser = false;
    }
    toggleSubUser() {
      this.showSubMenuUser = !this.showSubMenuUser;
      this.showSubMenuProduct = false; 
      this.showSubMenuOrder = false;
  }

  constructor(private storageService:StorageService,private authService:AuthService,private router: Router, private userService: UserService){}
  items: MenuItem[] | undefined;

  activeItem: MenuItem | undefined;
  ngOnInit(): void {

    this.username = this.storageService.getUser().username;
    // console.log(this.storageService.getUser())
    this.getUser();
    console.log(this.getUser);
    this.items = [
      { label: 'Home', icon: 'pi pi-fw pi-home' },
      { label: 'Calendar', icon: 'pi pi-fw pi-calendar' },
      { label: 'Edit', icon: 'pi pi-fw pi-pencil' },
      { label: 'Documentation', icon: 'pi pi-fw pi-file' },
      { label: 'Settings', icon: 'pi pi-fw pi-cog' }
  ];

  this.activeItem = this.items[0];

  }
  onActiveItemChange(event: MenuItem) {
    this.activeItem = event;
}

activateLast() {
    this.activeItem = (this.items as MenuItem[])[(this.items as MenuItem[]).length - 1];
}

  logout(){
    this.authService.logout().subscribe({
      next: res =>{
        this.storageService.clean();
        this.router.navigate(['/']);
      }
    })
  }


  username: any;
  user :any;

  changePassword : boolean = false;

  updateForm: any ={
    firstname: null,
    lastname: null,
    email: null,
    country: null,
    state:null,
    address: null,
    phone: null
  }

  changePasswordForm: any= {
    oldPassword : null,
    newPassword: null
  }


  getUser(){
    this.userService.getUser(this.username).subscribe({
      next: res=>{
        this.user = res;
        this.updateForm.firstname = res.firstname;
        this.updateForm.lastname = res.lastname;
        this.updateForm.email = res.email;
        this.updateForm.country = res.country;
        this.updateForm.state = res.state;
        this.updateForm.address = res.address;
        this.updateForm.phone = res.phone;
      },error : err =>{
        console.log(err);
      }
    })
  }

  updateProfile(){
    const{firstname,lastname,email,country,state,address,phone} = this.updateForm;
    this.userService.updateProfile(this.username,firstname,lastname,email,country,state,address,phone).subscribe({
      next: res =>{
        this.getUser();

      },error: err=>{
        console.log(err);
      }
    })
  }

  changePasswordFunc(){
    const{oldPassword,newPassword} = this.changePasswordForm;
    this.userService.changePassword(this.username,oldPassword,newPassword).subscribe({
      next: res =>{
        this.getUser();
      },error: err =>{
        console.log(err);
      }
    })
  }


  showChangePassword(){
    this.changePassword =true;
  }
}
