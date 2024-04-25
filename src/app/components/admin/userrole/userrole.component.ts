
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ImageService } from 'src/app/_service/image.service';
import { StorageService } from 'src/app/_service/storage.service';
import { UserService } from 'src/app/_service/user.service';
import { RoleGuardService } from 'src/app/_service/role-guard.service';
@Component({
  selector: 'app-userrole',
  templateUrl: './userrole.component.html',
  styleUrls: ['./userrole.component.css'],
  providers: [MessageService]
})
export class UserroleComponent implements OnInit {

  listBlog : any;
  listTag : any[] =[];
  listImage: any;
  username : any;
  selectedTags: any[] =[];  
  onUpdate : boolean =false;
  showForm : boolean = false; 
  onDelete: boolean = false; 
  image: any;
  disabled : boolean = true;
  selectedFiles ?: FileList;
  currentFile ?: File;
  blogForm : any = {
    
    id: null,
      username: null,
      firstname: null,
      lastname: null,
      email: null,
      country: null,
      state: null,
      address: null,
      phone: null,
      roles: [],
  }  

  constructor(private userService: UserService,private storageService: StorageService,private roleGuardService: RoleGuardService,private messageService: MessageService){

  }
  ngOnInit(): void {
    this.username = this.storageService.getUser().username;
    this.getList();
    this.getListTag();
  }
  
  showUpdate(data: any){
    this.selectedTags = [];
    this.onUpdate = true;
    this.showForm = true;
    // username,firstname,lastname,email,country,state,address,phone
    this.blogForm.id = data.id;
    this.blogForm.username = data.username;
    this.blogForm.firstname = data.firstname;
    this.blogForm.lastname = data.lastname;
    this.blogForm.email = data.email;
    this.blogForm.country = data.country;
    this.blogForm.state = data.state;
    this.blogForm.address = data.address;
    this.blogForm.phone = data.phone;
    data.roles.forEach( (res: any) =>{
      this.selectedTags.push(res.id);
    })
  }
  
  getList(){
    this.userService.getListuser().subscribe({
      next: res =>{
        this.listBlog =res;
      },error: err =>{
        console.log(err);
      }
    })
  }
  getListTag(){
    this.roleGuardService.getListrole().subscribe({
      next: res=>{
        this.listTag = res;
      },error: err =>{
        console.log(err);
      }
    })
  }
  updateBlog(){
    this.blogForm.roles = this.selectedTags;
      const {id,username,firstname,lastname,email,country,state,address,phone,roles} = this.blogForm;
      console.log(this.blogForm);
      this.userService.updateUser(id,username,firstname,lastname,email,country,state,address,phone,roles).subscribe({
        next: res =>{
          this.getList();
          this.showSuccess("Cập nhật thành công");
          this.showForm=false;
          
        },error: err =>{
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
  
  showWarn(text : string) {
    this.messageService.add({severity:'warn', summary: 'Warn', detail: text});
  }
}
