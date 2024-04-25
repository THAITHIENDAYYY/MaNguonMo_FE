import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { StorageService } from './storage.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SERVER_DOMAIN } from './domain.service';
// const CATEGORY_API = "http://localhost:8080/api/role/";
const CATEGORY_API = SERVER_DOMAIN + "/api/role/";
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class RoleGuardService implements CanActivate {

  isloggedIn : boolean = false;

  roles: any[] = [];

  constructor(private storageService:StorageService,private router: Router,private http: HttpClient) { }
// kiểm tra quuyen ng dùng
  canActivate(route: ActivatedRouteSnapshot):boolean{
    const expectedRole = route.data['expectedRole'];
    this.isloggedIn = this.storageService.isLoggedIn();
    this.roles = this.storageService.getUser().roles
  //   console.log('Role Guard - Is Logged In:', this.isloggedIn);
  // console.log('Role Guard - User Roles:', this.roles);
  //   if (this.isloggedIn && this.roles.includes('ROLE_ADMIN')) {
  //     // Nếu có quyền admin, chuyển hướng trực tiếp đến trang admin
  //     this.router.navigate(['/admin']);
  //     return false; // Ngăn chặn hiển thị trang hiện tại (ví dụ: /)
  //   }
    if( this.isloggedIn == false || !this.roles.includes(expectedRole)){
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
  

  getListrole():Observable<any>{
    return this.http.get(CATEGORY_API,httpOptions);
  }
}
