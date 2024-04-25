import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SERVER_DOMAIN } from './domain.service';
import { map } from 'rxjs/operators';

// const BLOG_API = "http://localhost:8080/api/blog/";
const BLOG_API = SERVER_DOMAIN + "/api/blog/";


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private http: HttpClient) { }

//lấy ra tất cả
  getList():Observable<any>{
    return this.http.get(BLOG_API,httpOptions);
  }

  getListNewest(limit: number):Observable<any>{
    let params = new HttpParams();
    params = params.append('limit',limit);
    return this.http.get(BLOG_API + 'newest',{params: params});
  }
// láy theo id
  getBlog(id: number):Observable<any>{
    return this.http.get(BLOG_API + id,httpOptions);
  }
  getListBlogByUser(id: number):Observable<any>{
    return this.http.get(BLOG_API + 'pageblog/' + id,httpOptions);
  }
  createBlog(title: string,description: string,content: string, imageId: number,tags: number[],username: string):Observable<any>{
    return  this.http.post(BLOG_API +'create',{title,description,content,imageId,tags,username},httpOptions);
  }

  updateBLog(id: number,title: string,description: string,content: string, imageId: number,tags: number[]):Observable<any>{
    return this.http.put(BLOG_API + 'update/' +id,{id,title,description,content,imageId,tags},httpOptions);
  }

  deleleBlog(id: number){
    return this.http.delete(BLOG_API + 'delete/' + id,httpOptions);
  }

  // thống kê
  getBlogtt(): Observable<number> {
    // Gọi API để lấy danh sách sản phẩm và sau đó tính toán tổng số sản phẩm
    return this.getList().pipe(
      map(blogs => blogs.length)
    );
  }

}
