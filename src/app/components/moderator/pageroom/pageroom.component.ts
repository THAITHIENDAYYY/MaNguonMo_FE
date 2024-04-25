import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ProductroomService } from 'src/app/_service/productroom.service';
import { StorageService } from 'src/app/_service/storage.service';

@Component({
  selector: 'app-pageroom',
  templateUrl: './pageroom.component.html',
  styleUrls: ['./pageroom.component.css'],
  providers: [MessageService]
})
export class PageroomComponent implements OnInit {
  
  listProductroom : any;

  displayForm: boolean = false;

  deleteForm : boolean = false;

  onUpdate : boolean = false;

  productroomForm : any ={
    id: null,
    name : null
  }
  username : any;
  id:number;
  constructor(
    private productroomService: ProductroomService,
    private messageService:MessageService,
    private storageService: StorageService){
      this.id = this.storageService.getUser().id;
  }
  ngOnInit(): void {
    this.getList();
    this.username = this.storageService.getUser().username;
    // this.id=this.storageService.getUser().id;
  }
  getList(){
    this.productroomService.getListroomByUser(this.id).subscribe({
      next : res =>{
        this.listProductroom = res;
      },error: err =>{
        console.log(err);
      }
    })
  }
  showForm(){
    this.onUpdate = false;
    this.productroomForm ={
      id : null,
      name : null
    }
    this.displayForm = true;
  }
  onUpdateForm(id: number,name : string){
    this.onUpdate = true;
    this.displayForm =true;
    this.productroomForm.id = id;
    this.productroomForm.name = name;
  }
  onDelete(id:number,name : string){
    this.deleteForm = true;
    this.productroomForm.id = id;
    this.productroomForm.name = name;
  }
  create(){
    const {name} = this.productroomForm;
    this.productroomService.createProductroom(name,this.username).subscribe({
      next: res =>{
        this.getList();
        this.showSuccess("Thêm thành công!");
        this.displayForm = false;
      },error: err=>{
        this.showError(err.message);
      }
    })
  }
  update(){
    const {id,name} = this.productroomForm;
    this.productroomService.updateProductroom(id,name).subscribe({
      next: res =>{
        this.getList();
        this.showSuccess("Cập nhật thành công!");
        this.displayForm = false;
      },error: err =>{
        this.showError(err.message);
      }
    })
  } 
  delete(){
    const {id} = this.productroomForm;
    this.productroomService.deleteProductroom(id).subscribe({
      next: res =>{
        this.getList();
        this.showWarn("Xóa thành công!!");
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
