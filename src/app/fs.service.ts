import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as firebase from 'firebase';
import firestore from 'firebase/firestore';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserServiceService } from '../app/user-service.service';
import { useAnimation } from '@angular/animations';
@Injectable({
  providedIn: 'root'
})
export class FsService {

  ref = firebase.firestore().collection('boards');
  refUser = firebase.firestore().collection('users');

  constructor(private db: AngularFirestore, private us: UserServiceService) { }

  getBoards(): Observable<any> {
    return new Observable((observer) => {
      this.ref.onSnapshot((querySnapshot) => {
        let boards = [];
        querySnapshot.forEach((doc) => {
          let data = doc.data();
          boards.push({
            key: doc.id,
            question: data.question,
            answers: data.answers,
            answer: data.answer
          });
        });
        observer.next(boards);
      });
    });
  }

  getBoard(id: string): Observable<any> {
    return new Observable((observer) => {
      this.ref.doc(id).get().then((doc) => {
        let data = doc.data();
        observer.next({
          key: doc.id,
          title: data.title,
          description: data.description,
          author: data.author
        });
      });
    });
  }

  getBoardActive(): Observable<any> {
    const query = this.db.collection('boards').ref.where('active', '==', true).limit(1);
    return this.db.collection('boards', ref => query).snapshotChanges()
    .pipe(map(actions => actions.map((obj: any) => {
        const object = obj.payload.doc.data();
        object.id = obj.payload.doc.id;
        return object;
    })));
  }

  login(data): Observable<any> {
    return this.db.collection('/users').snapshotChanges()
    .pipe(map(actions => actions.map((obj: any) => {
      const object = obj.payload.doc.data();
      object.id = obj.payload.doc.id;
      return object;
    })));
  }
  addUser(data: object): Promise<any> {
    return this.db
    .collection('users')
    .add(JSON.parse(JSON.stringify(data)));
  }

  getAllUsers(): Observable<any> {
    const query = this.db.collection('users').ref.orderBy('points', 'desc');
    return this.db.collection('users', ref => query).snapshotChanges()
    .pipe(map(actions => actions.map((obj: any) => {
        const object = obj.payload.doc.data();
        return {
          'username': object['username'],
          'points': object['points']
        };
    })));
  }

  postBoards(data): Observable<any> {
    return new Observable((observer) => {
      this.ref.add(data).then((doc) => {
        observer.next({
          key: doc.id,
        });
      });
    });
  }

  postAnswer(id: string, data: object): Promise<any> {
    return this.db
    .collection('users')
    .doc(id)
    .update(JSON.parse(JSON.stringify(data)));
  }

  updateBoards(id: string, data): Observable<any> {
    return new Observable((observer) => {
      this.ref.doc(id).set(data).then(() => {
        observer.next();
      });
    });
  }

  deleteBoards(id: string): Observable<{}> {
    return new Observable((observer) => {
      this.ref.doc(id).delete().then(() => {
        observer.next();
      });
    });
  }
}
