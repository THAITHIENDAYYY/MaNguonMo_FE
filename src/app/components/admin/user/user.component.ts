import { Component, OnInit} from '@angular/core';
import { MessageService } from 'primeng/api';
import { UserService } from 'src/app/_service/user.service';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers: [MessageService]
})
export class UserComponent implements OnInit {

  listTag : any;

  displayForm: boolean = false;

  deleteForm : boolean = false;

  onUpdate : boolean = false;

  tagForm : any ={
    id: null,
    name : null
  }
 
  constructor(private userService: UserService,private messageService:MessageService){
    

  }

  ngOnInit(): void {
    this.getList();
  }
  // đặt chuỗi thành ...
  truncateContent(content: string, maxLength: number): string {
    if (content.length <= maxLength) {
        return content;
    } else {
        return content.substring(0, maxLength) + '(....)';
    }
  }

  getList(){
    this.userService.getListuser().subscribe({
      next : res =>{
        this.listTag = res;
      },error: err =>{
        console.log(err);
      }
    })
  }

  showForm(){
    this.onUpdate = false;
    this.tagForm ={
      id : null,
      name : null
    }
    this.displayForm = true;
  }

 
  onDelete(id:number,name : string){
    this.deleteForm = true;
    this.tagForm.id = id;
    this.tagForm.name = name;
  }


  // xóa user
  deleteTag(){
    const {id} = this.tagForm;
    this.userService.deleteUser(id).subscribe({
      next: res =>{
        this.getList();
        this.showSuccess("Xóa người dùng thành công!!");
        this.deleteForm = false;
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

  showWarn(text : string) {
    this.messageService.add({severity:'warn', summary: 'Warn', detail: text});
  }

}
