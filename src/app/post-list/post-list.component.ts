import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { PostService } from '../services/post.service';
import { Post } from '../models/post.model';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {

  posts: Post[];
  postSubscription: Subscription;

  constructor(private postService: PostService,
  			  private route: Router) { }

  ngOnInit() {
  	this.postSubscription = this.postService.postSubject.subscribe(
  		(posts: Post[]) => {
  			this.posts = posts;
  		}
  	);
  	this.postService.emitPost();
  }

  onNewPost(){
  	this.route.navigate(['/posts', 'new']);
  }

  onLoveIt(post: Post){
  	this.postService.loveItPost(post);
  }

  onNotLoveIt(id: number){
  	this.postService.notLoveItPost(id);
  }

  onDeletePost(post: Post){
  	this.postService.removePost(post);
  }
  
  ngOnDestroy() {
    this.postSubscription.unsubscribe();
  }

}
