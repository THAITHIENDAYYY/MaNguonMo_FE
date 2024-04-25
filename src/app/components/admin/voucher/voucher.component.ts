import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CategoryService } from 'src/app/_service/category.service';
import { ImageService } from 'src/app/_service/image.service';
import { ProductService } from 'src/app/_service/product.service';
import { VoucherService } from 'src/app/_service/voucher.service';

@Component({
  selector: 'app-voucher',
  templateUrl: './voucher.component.html',
  styleUrls: ['./voucher.component.css'],
  providers: [MessageService,ConfirmationService]
})
export class VoucherComponent implements OnInit {

  listProduct: any;
  listCategory: any;

  disabled : boolean = true;



  selectedFiles ?: FileList;
  currentFile ?: File;



  onUpdate : boolean =false;
  showForm : boolean = false;
  showDelete: boolean = false;

  productForm: any ={
    name : null,
    count : null,
    money: null
  };

  

  constructor(private messageService: MessageService,private voucherService: VoucherService,private imageService: ImageService,private categoryService:CategoryService){

  }

  ngOnInit(): void {
    this.getListProduct();
    this.getListCategoryEnabled();
  }


  openNew() {
    this.onUpdate = false;
    this.showForm = true;
    this.productForm ={
      id:null,
      name: null,
    count : null,
    money: null
    }
  }


  openUpdate(data : any){
      this.onUpdate = true;
      this.showForm =true;
      this.productForm.id = data.id;
      this.productForm.name = data.name;      
      this.productForm.count = data.count;
      this.productForm.money = data.money;      
  }


  getListProduct(){
    this.voucherService.getList().subscribe({
      next: res =>{
        this.listProduct =res;
        console.log(this.listProduct)
      },error: err=>{
        console.log(err);
      }
    })
  }
  
  getListCategoryEnabled(){
    this.categoryService.getListCategoryEnabled().subscribe({
      next: res =>{
        this.listCategory = res;
      },error : err=>{
        console.log(err);
      }
    })
  }





  createProduct(){   
    
    const {id,name,count,money} = this.productForm;
    console.log(this.productForm);
    this.voucherService.createVoucher(id,name,count,money).subscribe({
      next: res =>{
        this.getListProduct();
        this.showForm = false;
        this.showSuccess("Thêm mới thành công");

      },error: err =>{
        this.showError(err.message);
      }
    })
  }

  updateProduct(){
    
    const {id,name,count,money} = this.productForm;
    console.log(this.productForm);
    this.voucherService.updateVoucher(id,name,count,money).subscribe({
      next: res =>{
        this.getListProduct();
        this.showForm = false;
        this.showSuccess("Cập nhật thành công");
      },error: err =>{
        this.showError(err.message);
      }
    })

  }

  onDelete(id: number,name: string){
    this.productForm.id = null;
    this.showDelete = true;
    this.productForm.id = id;
    this.productForm.name = name;
  }

  deleteProduct(){
    this.voucherService.deleteVoucher(this.productForm.id).subscribe({
      next: res =>{
        this.getListProduct();
        this.showWarn("Xóa thành công");
        this.showDelete = false;
      },error: err =>{
        this.showError(err.message);
      }
    })
  }

  enableVoucher(id : number){
    this.voucherService.enableVoucher(id).subscribe({
      next: res =>{
        this.getListProduct();
        this.showSuccess("Cập nhật thành công!!");
      },error: err=>{
        this.showError(err.message);
      }
    })
  }
  calculateRemainingDays(hsd: Date): string {
    if (!hsd) {
        return 'Không có thông tin về ngày hết hạn';
    }
    
    const hsdDate = new Date(hsd);
    const now = new Date();
    const timeDifference = hsdDate.getTime() - now.getTime();
    const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));

    if (daysDifference === 0) {
        return 'Voucher đã hết hạn';
    } else if (daysDifference < 0) {
        return 'Voucher đã hết hạn';
    } else {
        return `Còn ${daysDifference} ngày`;
    }
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
