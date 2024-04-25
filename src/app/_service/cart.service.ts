import { EventEmitter, Injectable } from '@angular/core';
import { InputText } from 'primeng/inputtext';
import { Observable, of, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  items : any[] =[];
  totalPrice =0;
  // totalsale = 0;
  total = 0;

  constructor() { }


  saveCart():void{
    localStorage.setItem('cart_items',JSON.stringify(this.items));
  }
  setMaGiamGia(discount: any) {
    const discountString = JSON.stringify(discount)
    localStorage.setItem('magg', discountString)
  }
  // addToCart(item: any,quantity: number){
  //   this.loadCart();
  //   if(!this.productInCart(item))
  //   {
  //     item.soluong = quantity;
  //     item.subTotal = item.soluong * item.price;
  //     this.items.push(item)
  //   }
  //   else
  //   {
  //     this.items.forEach(res => {
  //       if(res.id == item.id){
  //         res.soluong += quantity;
  //         res.subTotal = res.soluong * res.price;
  //       }
  //     });
  //   }
  //   item.soluong = quantity;
  //   this.saveCart();
  //   this.getTotalPrice();

  // }
  addToCart(item: any, quantity: number) {
    this.loadCart(); // Load cart items
    let found = false; // Variable to track if the item is found in the cart

    // Check if the product is already in the cart
    this.items.forEach(res => {
        if (res.id === item.id && res.color === item.color && res.size === item.size && res.room === item.room) {
            res.soluong += quantity; // Increase quantity if the same product with the same color exists
            res.subTotal = res.soluong * res.price; // Recalculate subtotal
            found = true; // Set found to true
        }
    });

    // If the product is not found in the cart or has a different color
    if (!found) {
        const newItem = { ...item }; // Create a new object to prevent mutating the original object
        newItem.soluong = quantity; // Set quantity for the new item
        newItem.subTotal = newItem.soluong * newItem.price; // Calculate subtotal for the new item
        this.items.push(newItem); // Add the new item to the cart
    }

    this.saveCart(); // Save the cart
    this.getTotalPrice(); // Update total price
}



  updateCart(item:any,quantity: number){
    this.items.forEach(res =>{
      if(res.id == item.id && res.color === item.color && res.size === item.size && res.room === item.room){
        res.soluong = quantity;
        res.subTotal = res.soluong * res.price;
      }
    })
    this.saveCart();
    this.getTotalPrice();
  }
  

  productInCart(item: any):boolean{
    return this.items.findIndex((x:any) => x.id == item.id) > -1;
  }
  loadCart():void{
    this.items = JSON.parse(localStorage.getItem('cart_items') as any) || [];
    this.getTotalPrice();

  }
  

  getItems() {
    return this.items;
    this.getTotalPrice();
  }



  getTotalPrice(){
    this.totalPrice = 0;
    this.total = 0;
    this.items.forEach(res =>{
      this.totalPrice += res.subTotal;
      this.total = this.totalPrice;
    })
    return this.totalPrice;
  }

  remove(item: any){
    const index = this.items.findIndex((o:any) => o.id == item.id);
    if(index > -1){
      this.items.splice(index,1);
      this.saveCart();
    }
    this.getTotalPrice();
  }

  clearCart(){
    this.items = [];
    this.getTotalPrice();
    localStorage.removeItem('cart_items');
    localStorage.removeItem('magg');
  }

  // kiểm tra giỏ hàng thêm ko đc vượt quá số lượng có sẵn
  getProductQuantityInCart(productId: number): number {
    const product = this.items.find(item => item.id === productId);
    return product ? product.quantity : 0;
  }

  getMaGiamGia(){
    return JSON.parse(localStorage.getItem('magg') as any)
  }

  
   
  
  

}
