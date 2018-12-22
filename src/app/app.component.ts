import { Component } from '@angular/core';
import * as firebase from 'firebase';
import firestore from 'firebase/firestore';

const settings = {timestampsInSnapshots: true};
const config = {
  apiKey: 'AIzaSyB4Vy-3nGM6KyKvEemtvDOtc8hlcSVaKxI',
  authDomain: 'trivia-poll-game.firebaseapp.com',
  databaseURL: 'https://trivia-poll-game.firebaseio.com',
  projectId: 'trivia-poll-game',
  storageBucket: 'trivia-poll-game.appspot.com',
  messagingSenderId: '356882557715'
};

// const config = {
//   apiKey: 'YOUR_APIKEY',
//   authDomain: 'YOUR_AUTH_DOMAIN',
//   databaseURL: 'YOUR_DATABASE_URL',
//   projectId: 'YOUR_PROJECT_ID',
//   storageBucket: 'YOUR_STORAGE_BUCKET',
// };

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular6-firestore';

  ngOnInit() {
    //firebase.initializeApp(config);
    //firebase.firestore().settings(settings);
  }
}
