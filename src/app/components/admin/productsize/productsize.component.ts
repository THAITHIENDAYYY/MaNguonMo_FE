import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ProductsizeService } from 'src/app/_service/productsize.service';
import { StorageService } from 'src/app/_service/storage.service';

@Component({
  selector: 'app-productsize',
  templateUrl: './productsize.component.html',
  styleUrls: ['./productsize.component.css'],
  providers: [MessageService]
})
export class ProductsizeComponent implements OnInit {
  
  listProductsize : any;

  displayForm: boolean = false;

  deleteForm : boolean = false;

  onUpdate : boolean = false;

  productsizeForm : any ={
    id: null,
    name : null
  }
  username : any;

  constructor(
    private productsizeService: ProductsizeService,
    private messageService:MessageService,
    private storageService: StorageService){
  }
  ngOnInit(): void {
    this.getList();
    this.username = this.storageService.getUser().username;
  }
  getList(){
    this.productsizeService.getList().subscribe({
      next : res =>{
        this.listProductsize = res;
      },error: err =>{
        console.log(err);
      }
    })
  }
  showForm(){
    this.onUpdate = false;
    this.productsizeForm ={
      id : null,
      name : null
    }
    this.displayForm = true;
  }
  onUpdateForm(id: number,name : string){
    this.onUpdate = true;
    this.displayForm =true;
    this.productsizeForm.id = id;
    this.productsizeForm.name = name;
  }
  onDelete(id:number,name : string){
    this.deleteForm = true;
    this.productsizeForm.id = id;
    this.productsizeForm.name = name;
  }
  create(){
    const {name} = this.productsizeForm;
    this.productsizeService.createProductsize(name,this.username).subscribe({
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
    const {id,name} = this.productsizeForm;
    this.productsizeService.updateProductsize(id,name).subscribe({
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
    const {id} = this.productsizeForm;
    this.productsizeService.deleteProductsize(id).subscribe({
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

