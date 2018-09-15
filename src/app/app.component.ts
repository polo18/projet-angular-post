import { Component } from '@angular/core';
import * as firebase from 'firebase';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

	constructor(){
	    // Initialize Firebase
		const config = {
		    apiKey: "AIzaSyC3cIK2o0qUUtJjk43C3mmrZWlVaeuHIoc",
		    authDomain: "http-client-post.firebaseapp.com",
		    databaseURL: "https://http-client-post.firebaseio.com",
		    projectId: "http-client-post",
		    storageBucket: "",
		    messagingSenderId: "819396985927"
		};
		firebase.initializeApp(config);
	}
}
