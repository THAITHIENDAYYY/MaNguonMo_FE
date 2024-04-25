import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/_service/storage.service';
import { UserService } from 'src/app/_service/user.service';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

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

  constructor(private storageService: StorageService,private userService: UserService ,private messageService:MessageService,){}

  ngOnInit(): void {
    this.username = this.storageService.getUser().username;
    // console.log(this.storageService.getUser())
    this.getUser();
    console.log(this.getUser);
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
        // alert("Cập nhật thông tin thành công")
        this.showSuccess("Cập nhật thông tin thành công");
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
        this.showSuccess("Thay đổi mật khẩu thành công !");
      },error: err =>{
        console.log(err);
      }
    })
  }


  showChangePassword(){
    this.changePassword =true;
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
