import { Component, OnInit } from '@angular/core';
import { BlogService } from 'src/app/_service/blog.service';
import { TagService } from 'src/app/_service/tag.service';

@Component({
  selector: 'app-blog-client',
  templateUrl: './blog-client.component.html',
  styleUrls: ['./blog-client.component.css']
})
export class BlogClientComponent implements OnInit {


  listTag : any;
  listBlog : any;
  listBlogNewest: any;

  constructor(private tagService: TagService,private blogService: BlogService){

  }

  ngOnInit(): void {
    this.getListBlog();
    this.getListTag();
    this.getListNewest();
  }

  getListTag(){
    this.tagService.getListTag().subscribe({
      next: res =>{
        this.listTag = res;
      },error: err =>{
        console.log(err);
      }
    })
  }

  getListBlog(){
    this.blogService.getList().subscribe({
      next: res =>{
        this.listBlog = res;
        console.log(this.listBlog)
      },error: err =>{
        console.log(err);
      }
    })
  }
  scrollToTop() {
    const scrollDuration = 1000; // Thời gian để cuộn lên (1 giây)
    const scrollStep = -window.scrollY / (scrollDuration / 15);
  
    const scrollInterval = setInterval(function() {
        if (window.scrollY != 0) {
            window.scrollBy(0, scrollStep);
        } else {
            clearInterval(scrollInterval);
        }
    }, 15);
  }
  getListNewest(){
    this.blogService.getListNewest(3).subscribe({
      next: res=>{
        this.listBlogNewest = res;
      },error: err =>{
        console.log(err);
      }
    })
  }


}
