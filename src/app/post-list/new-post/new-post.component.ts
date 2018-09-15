import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { PostService } from '../../services/post.service';
import { Post } from '../../models/post.model';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {

  postForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
  			  private postService: PostService,
  			  private route: Router) { }

  ngOnInit() {
  	this.initForm();
  }

  initForm(){
  	this.postForm = this.formBuilder.group({
  		title: ['', Validators.required],
  		content: ['', Validators.required]
  	});
  }

  onSavePost(){
  	const title = this.postForm.get('title').value;
  	const content = this.postForm.get('content').value;
  	const newPost = new Post(title, content);
  	newPost.created_at = new Date();
  	newPost.loveIts = 0;

  	this.postService.creatNewPost(newPost);
  	this.route.navigate(['/posts']);
  }
  
}

