import { Component, inject, signal } from '@angular/core';
import { User } from '../services/user';
import { toSignal } from '@angular/core/rxjs-interop';

export interface Post {
  id?: string,
  title: string,
  views: string | number
}

@Component({
  selector: 'app-user-list',
  imports: [],
  templateUrl: './user-list.html',
  styleUrl: './user-list.css',
})

export class UserList {

  title = signal('');
  views = signal<string | number>('');
  isEdit = signal(false);
  editPostId = signal<string>('');

  userService = inject(User);
  users: any = toSignal(this.userService.getUsers() || [])
  //posts: any = toSignal(this.userService.getPosts() || [])
  posts = signal<Post[]>([]);
  constructor() {
  }

  ngOnInit() {
    this.getAllPost();
  }

  getAllPost() {
    this.userService.getPosts().subscribe((data: Post[]) => {
      this.posts.set(data);
    });
  }
  deleteUser(id: number) {
    console.log(id);
  }
  editUser(user: any) {
    console.log(user);
  }

  editPost(post: Post) {
    this.title.set(post.title);
    this.views.set(post.views);
    this.isEdit.set(true);
    if (post.id)
      this.editPostId.set(post.id);
  }
  deletePost(post: Post) {
    const confirmDelete = confirm(`Are you sure want to delete: " ${post.title}" ?"`);
    if (confirmDelete) {
      this.userService.deletePost(post).subscribe(data => {
        this.posts.update( list=>list.filter(p=>p.id !==post.id));
      });
    }
  }
  addPost() {
    if (this.editPostId() === '') {
      const payload = {
        title: this.title(),
        views: this.views()
      }
      this.userService.addPost(payload).subscribe(() => {
        alert(" Post added successfuly ..");
        this.forRefressList();
      });
    }
    else {
      const payload = {
        id: this.editPostId(),
        title: this.title(),
        views: this.views()
      }
      this.userService.updatePost(payload).subscribe(data => {
        this.forRefressList();
      })
    }
  }

  forRefressList() {
    this.title.set('');
    this.views.set('');
    this.isEdit.set(false);
    this.editPostId.set('');
    this.getAllPost();
  }

  // loadUsers() {
  //   this.userService.getUsers().subscribe((data) => {
  //     this.users.set(data);
  //   })
  // }

}
