import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogComponent } from './components/admin/blog/blog.component';
import { CategoryComponent } from './components/admin/category/category.component';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { OrderComponent } from './components/admin/order/order.component';
import { ProductComponent } from './components/admin/product/product.component';
import { TagComponent } from './components/admin/tag/tag.component';
import { BlogClientComponent } from './components/client/blog-client/blog-client.component';
import { BlogDetailComponent } from './components/client/blog-detail/blog-detail.component';
import { CartComponent } from './components/client/cart/cart.component';
import { CheckoutComponent } from './components/client/checkout/checkout.component';
import { HomeComponent } from './components/client/home/home.component';
import { IndexComponent } from './components/client/index/index.component';
import { LoginPageComponent } from './components/client/login-page/login-page.component';
import { MyOrderComponent } from './components/client/my-order/my-order.component';
import { ProductDetailComponent } from './components/client/product-detail/product-detail.component';
import { SearchComponent } from './components/client/search/search.component';
import { ShopComponent } from './components/client/shop/shop.component';
import { UserDetailComponent } from './components/client/user-detail/user-detail.component';
import { AuthGuardService } from './_service/auth-guard.service';
import { RoleGuardService } from './_service/role-guard.service';
import { ChartsComponent } from './components/admin/charts/charts.component';
import { EmailVerificationComponent } from './components/client/email-verification/email-verification.component';
import { ChitietComponent } from './components/admin/chitiet/chitiet.component';
import { OrderchitietComponent } from './components/client/orderchitiet/orderchitiet.component';
import { AccountComponent } from './components/admin/account/account.component';
import { ContactComponent } from './components/client/contact/contact.component';
import { CheckPayComponent } from './components/client/check-pay/checkpay.component';
import { CheckvnpayComponent } from './components/client/checkvnpay/checkvnpay.component';
import { ErrorMessageComponent } from './components/client/error-message/error-message.component';
import { SanphamComponent } from './components/client/sanpham/sanpham.component';
import { UserComponent } from './components/admin/user/user.component';
import { StatusorderComponent } from './components/admin/statusorder/statusorder.component';
import { UserroleComponent } from './components/admin/userrole/userrole.component';
import { VoucherComponent } from './components/admin/voucher/voucher.component';
import { PagemanagementComponent } from './components/moderator/pagemanagement/pagemanagement.component';
import { PagesanphamComponent } from './components/moderator/pagesanpham/pagesanpham.component';
import { PagebaivietComponent } from './components/moderator/pagebaiviet/pagebaiviet.component';
import { GiamgiaproductComponent } from './components/admin/giamgiaproduct/giamgiaproduct.component';
import { ProductcolorComponent } from './components/admin/productcolor/productcolor.component';
import { ProductsizeComponent } from './components/admin/productsize/productsize.component';
import { ProductroomComponent } from './components/admin/productroom/productroom.component';
import { ImageComponent } from './components/admin/image/image.component';
import { PagesizeComponent } from './components/moderator/pagesize/pagesize.component';
import { PageroomComponent } from './components/moderator/pageroom/pageroom.component';
import { PagecolorComponent } from './components/moderator/pagecolor/pagecolor.component';
const routes: Routes = [
  
  {
    path: 'admin',component:DashboardComponent,
    canActivate: [RoleGuardService],
    data: {expectedRole: "ROLE_ADMIN"},
    children:[
      {path:"category",component: CategoryComponent},
      {path:'product',component:ProductComponent},
      {path:'order',component:OrderComponent},
      {path:'blog',component:BlogComponent},
      {path:'tag',component:TagComponent},
      {path:'charts',component:ChartsComponent},
      {path:'chitiet/:id',component:ChitietComponent},
      {path:'thongtin',component:AccountComponent},
      {path:'qluser',component:UserComponent},
      {path:'role-user',component:UserroleComponent},
      {path:'status-order',component:StatusorderComponent},
      {path:'voucher',component:VoucherComponent},
      {path:'sale-product',component:GiamgiaproductComponent},
      {path:'color-product',component:ProductcolorComponent},
      {path:'size-product',component:ProductsizeComponent},
      {path:'room-product',component:ProductroomComponent},
      {path:'image',component:ImageComponent},
    ]
  },
  {
    path: 'moderator',component:PagemanagementComponent,
    canActivate: [RoleGuardService],
    data: {expectedRole: "ROLE_MODERATOR"},
    children:[
      {path:"pagesanpham",component: PagesanphamComponent},
      {path:"pagebaiviet",component: PagebaivietComponent},
      {path:"pagecolor",component:PagecolorComponent },
      {path:"pagesize",component: PagesizeComponent},
      {path:"pageroom",component: PageroomComponent},
    ]
  },
  {
    path:'',component: IndexComponent,
    children:[
      {path:'',component:HomeComponent},
      {path:'cart',component: CartComponent},
      {path:'checkout',component: CheckoutComponent,canActivate: [AuthGuardService]},
      {path:'category/:id',component: ShopComponent},
      {path:'product/:id',component:ProductDetailComponent},
      {path:'blog',component: BlogClientComponent},
      {path:'blog/:id',component:BlogDetailComponent},
      {path:'email-verification',component:EmailVerificationComponent},
      {path:'user',component:UserDetailComponent,canActivate: [AuthGuardService]},
      {path:'my-order',component:MyOrderComponent,canActivate: [AuthGuardService]},
      {path:'orderchitiet/:id',component:OrderchitietComponent,canActivate: [AuthGuardService]},
      {path:'search/:keyword',component:SearchComponent},
      {path:'contact',component:ContactComponent},
      { path: 'check-pay', component: CheckPayComponent },
      { path: 'check-vnpay', component: CheckvnpayComponent },
      { path: 'enrro-pay', component: ErrorMessageComponent },      
      { path: 'product', component: SanphamComponent }
      
    ]
  },
  {path:'login',component:LoginPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
