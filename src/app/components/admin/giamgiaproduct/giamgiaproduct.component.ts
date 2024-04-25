import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CategoryService } from 'src/app/_service/category.service';
import { ImageService } from 'src/app/_service/image.service';
import { ProductService } from 'src/app/_service/product.service';
import { StorageService } from 'src/app/_service/storage.service';

@Component({
  selector: 'app-giamgiaproduct',
  templateUrl: './giamgiaproduct.component.html',
  styleUrls: ['./giamgiaproduct.component.css'],
  providers: [MessageService,ConfirmationService]
})
export class GiamgiaproductComponent  implements OnInit {
  username : any;
  listProduct: any;
  listCategory: any;
  listImage: any;

  disabled : boolean = true;



  selectedFiles ?: FileList;
  currentFile ?: File;

  listImageChoosen : any = [];
  imageChoosen : any;

  onUpdate : boolean =false;
  showForm : boolean = false;
  showImage: boolean = false;
  showDelete: boolean = false;

  productForm: any ={
    
    pricesale: null,
  };

  

  constructor(private messageService: MessageService,private storageService: StorageService,private productService: ProductService,private imageService: ImageService,private categoryService:CategoryService){

  }

  ngOnInit(): void {
    this.username = this.storageService.getUser().username;
    this.getListProduct();
  }


  openNew() {
    this.onUpdate = false;
    this.showForm = true;
    this.listImageChoosen = [];
    this.productForm ={
      id:null,
      pricesale: null,
    }
  }

  openUpdate(data : any){
    this.listImageChoosen = [];
      this.onUpdate = true;
      this.showForm =true;
      this.productForm.id = data.id;
      this.productForm.pricesale = data.pricesale;
  }


 


  getListProduct(){
    this.productService.getListProduct().subscribe({
      next: res =>{
        this.listProduct =res;
        console.log(this.listProduct)
      },error: err=>{
        console.log(err);
      }
    })
  }
  
  




  updateProduct(){
    const {id,pricesale} = this.productForm;
    console.log(this.productForm);
    this.productService.updateProductgiamgia(id,pricesale).subscribe({
      next: res =>{
        this.getListProduct();
        this.showForm = false;
        this.showSuccess("Giảm giá thành công");
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
