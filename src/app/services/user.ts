import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Post } from '../user-list/user-list';

@Injectable({
  providedIn: 'root',
})
export class User {
  http= inject(HttpClient);
  apiURL="https://jsonplaceholder.typicode.com/users";
  apiURLforPosts="http://localhost:3000/posts/";

  constructor(){    
  }
  getPosts() :Observable<Post[]>{
   return this.http.get<Post[]>(this.apiURLforPosts);
  }
  addPost(post:Post):Observable<Post>{
    return this.http.post<Post>(this.apiURLforPosts,post);
  }
  updatePost(post:Post):Observable<Post>{
    return this.http.put<Post>(this.apiURLforPosts+post.id,post);
  }
  deletePost(post:Post):Observable<void>{
    return this.http.delete<void>(this.apiURLforPosts+post.id);
  }
  getUsers(){
   return this.http.get(this.apiURL).pipe(
    map((userlist:any)=>userlist.map((user:any)=>{
     return {"id":user.id,"name":user.name,"email":user.email}
    }))
   );
  }

  
}
