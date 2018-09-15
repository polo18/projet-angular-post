import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import * as firebase from 'firebase';

import { Post } from '../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  posts: Post[] = [];
  postSubject = new Subject<Post[]>();

  constructor() {
    this.getPosts(); 
  }

  emitPost(){
  	this.postSubject.next(this.posts);
  }

  savePosts() {
    firebase.database().ref('/posts').set(this.posts);
  }

  getPosts() {
    firebase.database().ref('/posts')
      .on('value', (data) => {
          this.posts = data.val() ? data.val() : [];
          this.emitPost();
        }
      );
  }

  creatNewPost(newPost: Post){
  	this.posts.push(newPost);
    this.savePosts();
  	this.emitPost();
  }

  loveItPost(post: Post){
  	const postIndex = this.posts.findIndex(
      (postEl) => {
        if(postEl === post) {
          return true;
        }
      }
    );
    //console.log("loveIts: " + this.posts[postIndex].loveIts);
    this.posts[postIndex].loveIts++;
    this.savePosts(); 
    this.emitPost();
  }

  notLoveItPost(postIndex: number){
  	this.posts[postIndex].loveIts--;
    this.savePosts();
  	this.emitPost();
  }

  removePost(post: Post){
  	const postIndexToRemove = this.posts.findIndex(
      (postEl) => {
        if(postEl === post) {
          return true;
        }
      }
    );
    this.posts.splice(postIndexToRemove, 1);
    this.savePosts();
    this.emitPost();
  }

}
