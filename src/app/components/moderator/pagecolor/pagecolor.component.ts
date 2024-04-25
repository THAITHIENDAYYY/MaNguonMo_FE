import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ProductcolorService } from 'src/app/_service/productcolor.service';
import { StorageService } from 'src/app/_service/storage.service';

@Component({
  selector: 'app-pagecolor',
  templateUrl: './pagecolor.component.html',
  styleUrls: ['./pagecolor.component.css'],
  providers: [MessageService]
})
export class PagecolorComponent implements OnInit {
  
  listProductcolor : any;

  displayForm: boolean = false;

  deleteForm : boolean = false;

  onUpdate : boolean = false;
  
  productcolorForm : any ={
    id: null,
    name : null
  }
  username : any;
  id: number;

  constructor(
    private productcolorService: ProductcolorService,
    private messageService:MessageService,
    private storageService: StorageService){
      this.id = this.storageService.getUser().id;
  }
  ngOnInit(): void {
    this.getList();
    this.username = this.storageService.getUser().username;
    this.id =this.storageService.getUser().id; 
  }
  getList(){
    this.productcolorService.getListcolorByUser(this.id).subscribe({
      next : res =>{
        this.listProductcolor = res;
      },error: err =>{
        console.log(err);
      }
    })
  }
  showForm(){
    this.onUpdate = false;
    this.productcolorForm ={
      id : null,
      name : null
    }
    this.displayForm = true;
  }
  onUpdateForm(id: number,name : string){
    this.onUpdate = true;
    this.displayForm =true;
    this.productcolorForm.id = id;
    this.productcolorForm.name = name;
  }
  onDelete(id:number,name : string){
    this.deleteForm = true;
    this.productcolorForm.id = id;
    this.productcolorForm.name = name;
  }
  create(){
    const {name} = this.productcolorForm;
    this.productcolorService.createProductcolor(name,this.username).subscribe({
      next: res =>{
        this.getList();
        this.showSuccess("Thêm màu sắc thành công!");
        this.displayForm = false;
      },error: err=>{
        this.showError(err.message);
      }
    })
  }
  update(){
    const {id,name} = this.productcolorForm;
    this.productcolorService.updateProductcolor(id,name).subscribe({
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
    const {id} = this.productcolorForm;
    this.productcolorService.deleteProductcolor(id).subscribe({
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

