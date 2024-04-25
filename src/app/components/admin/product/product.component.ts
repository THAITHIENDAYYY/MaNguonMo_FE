import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CategoryService } from 'src/app/_service/category.service';
import { ImageService } from 'src/app/_service/image.service';
import { ProductService } from 'src/app/_service/product.service';
import { StorageService } from 'src/app/_service/storage.service';
import { ProductcolorService } from 'src/app/_service/productcolor.service';
import { ProductroomService } from 'src/app/_service/productroom.service';
import { ProductsizeService } from 'src/app/_service/productsize.service';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  providers: [MessageService,ConfirmationService]

})
export class ProductComponent implements OnInit {
  listProductcolor : any[] =[];
  selectedProductcolors: any[] =[];
  listProductroom : any[] =[];
  selectedProductrooms: any[] =[];
  listProductsize : any[] =[];
  selectedProductsizes: any[] =[];
  id:any;
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
    name : null,
    description : null,
    mota : null,
    price: null,
    quantity: null,
    categoryId: null,
    imageIds: [],
    productcolors: [],
    productsizes: [],
    productrooms: []
  };

  // NgxSummernote
  config = {
    placeholder: '',
    tabsize: 2,
    height: 200, // Change the type from string to number
    uploadImagePath: '/api/upload',
    toolbar: [
      ['misc', ['codeview', 'undo', 'redo']],
      ['style', ['bold', 'italic', 'underline', 'clear']],
      ['font', ['bold', 'italic', 'underline', 'strikethrough', 'superscript', 'subscript', 'clear']],
      ['fontsize', ['fontname', 'fontsize', 'color']],
      ['para', ['style', 'ul', 'ol', 'paragraph', 'height']],
      ['insert', ['table', 'picture', 'link', 'video', 'hr']]
    ],
    fontNames: ['Helvetica', 'Arial', 'Arial Black', 'Comic Sans MS', 'Courier New', 'Roboto', 'Times']
  };

  constructor(private messageService: MessageService,
    private storageService: StorageService,
    private productroomService: ProductroomService,
    private productsizeService: ProductsizeService,
    private productcolorService: ProductcolorService,
    private productService: ProductService,
    private imageService: ImageService,
    private categoryService:CategoryService){

  }

  ngOnInit(): void {
    this.username = this.storageService.getUser().username;
    this.id = this.storageService.getUser().id;
    this.getListProduct();
    this.getListCategoryEnabled();
    this.getListImage();
    this.getListProductcolor();
    this.getListProductroom();
    this.getListProductsize();
  }


  openNew() {
    this.onUpdate = false;
    this.showForm = true;
    this.listImageChoosen = [];
    this.productForm ={
      id:null,
      name: null,
      description : null,
      mota : null,
      price: null,
      quantity: null,
      categoryId: null,
      imageIds: [],
      productcolors: [],
      productsizes: [],
      productrooms: [],
    }
  }

  openUpdate(data : any){
    this.selectedProductcolors = [];
    this.selectedProductsizes = [];
    this.selectedProductrooms = [];
    this.listImageChoosen = [];
    this.onUpdate = true;
    this.showForm =true;
    this.productForm.id = data.id;
    this.productForm.name = data.name;
    this.productForm.description = data.description;
      
    this.productForm.mota = data.mota;
    this.productForm.price = data.price;
    this.productForm.quantity = data.quantity;
    this.productForm.categoryId = data.category.id;
    data.images.forEach((res : any) =>{
      this.listImageChoosen.push(res);
    })
    data.productcolors.forEach( (res: any) =>{
      this.selectedProductcolors.push(res.id);
    })
    data.productsizes.forEach( (res: any) =>{
      this.selectedProductsizes.push(res.id);
    })
    data.productrooms.forEach( (res: any) =>{
      this.selectedProductrooms.push(res.id);
    })
  }


  onChooseImage(){
    this.showImage =true;
    this.disabled = true;
    let data = document.querySelectorAll('.list-image img');
      data.forEach(i =>{
        i.classList.remove('choosen');
    })
  }

  getListProductcolor(){
    this.productcolorService.getListcolorByUser(this.id).subscribe({
      next: res=>{
        this.listProductcolor = res;
      },error: err =>{
        console.log(err);
      }
    })
  }
  getListProductsize(){
    this.productsizeService.getListsizeByUser(this.id).subscribe({
      next: res=>{
        this.listProductsize = res;
      },error: err =>{
        console.log(err);
      }
    })
  }
  getListProductroom(){
    this.productroomService.getListroomByUser(this.id).subscribe({
      next: res=>{
        this.listProductroom = res;
      },error: err =>{
        console.log(err);
      }
    })
  }

  getListProduct(){
    this.productService.getListProduct().subscribe({
      next: res =>{
        this.listProduct =res;
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

  getListImage(){
    this.imageService.getList().subscribe({
      next:res=>{
        this.listImage =res;
      },error: err=>{
        console.log(err);
      }
    })
  }

  uploadFile(event: any){
    this.selectedFiles = event.target.files;
    if(this.selectedFiles){
      const file: File | null = this.selectedFiles.item(0);
      if(file){
        this.currentFile = file;
        this.imageService.upload(this.currentFile).subscribe({
          next: res =>{
            this.currentFile = undefined;
            this.getListImage();
          },error: err=>{
          }
        })
      }
      this.currentFile = undefined;
    }
  }



  createProduct(){
    this.productForm.productcolors = this.selectedProductcolors;
    this.productForm.productsizes = this.selectedProductsizes;
    this.productForm.productrooms = this.selectedProductrooms;
    let data = this.listImageChoosen;
    data.forEach((res: any)=>{
      this.productForm.imageIds.push(res.id);
    }) 
    const {name,description,price,quantity,categoryId,mota,imageIds,productcolors,productsizes,productrooms} = this.productForm;
    console.log(this.productForm);
    this.productService.createProduct(name,description,price,quantity,categoryId,mota,imageIds,productcolors,productsizes,productrooms,this.username).subscribe({
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
    this.productForm.productcolors = this.selectedProductcolors;
    this.productForm.productsizes = this.selectedProductsizes;
    this.productForm.productrooms = this.selectedProductrooms;
    let data = this.listImageChoosen;
    data.forEach((res: any)=>{
      this.productForm.imageIds.push(res.id);
    })
    const {id,name,description,price,quantity,categoryId,mota,imageIds,productcolors,productsizes,productrooms} = this.productForm;
    console.log(this.productForm);
    this.productService.updateProduct(id,name,description,price,quantity,categoryId,mota,imageIds,productcolors,productsizes,productrooms).subscribe({
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
    this.productService.deleteProduct(this.productForm.id).subscribe({
      next: res =>{
        this.getListProduct();
        this.showWarn("Xóa thành công");
        this.showDelete = false;
      },error: err =>{
        this.showError(err.message);
      }
    })
  }

  chooseImage(){
    this.listImageChoosen.push(this.imageChoosen);
    console.log(this.listImageChoosen);
    this.showImage = false;
  }

  selectImage(event : any,res: any){
    let data = document.querySelectorAll('.list-image img');
    data.forEach(i =>{
      i.classList.remove('choosen');
    })
    event.target.classList.toggle("choosen");
    this.imageChoosen = res;
    this.disabled = false;
  }
  downloadExcel() {
    this.productService.downloadExcel().subscribe(
      (response: Blob) => {
        // Tạo một URL tạm thời cho file blob
        const url = window.URL.createObjectURL(new Blob([response]));
        // Tạo một link tải xuống và kích hoạt nó
        const link = document.createElement('a');
        link.href = url;
        link.download = 'products.xlsx';
        link.click();

        // Giải phóng URL tạm thời
        window.URL.revokeObjectURL(url);
      },
      error => {
        console.error('Error downloading Excel:', error);
      }
    );
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
