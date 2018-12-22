import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  currentUser: Object;
  public flag: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public backFlag: boolean;

  constructor() {
    this.currentUser = null;
    this.flag.next(true);
    this.backFlag = false;
  }

  getUser(): any {
    return this.currentUser;
  }

  setUser(user): void {
    this.currentUser = user;
  }

  public setToTrue() {
    this.flag.next(true);
  }
  public setToFalse() {
    this.flag.next(false);
  }
  public getStatus() {
    console.log(this.flag);
    return this.flag;
  }

  public setBackToTrue() {
    this.backFlag = true;
  }
  public setBackToFalse() {
    this.backFlag = false;
  }
  public getBackStatus() {
    console.log(this.backFlag);
    return this.backFlag;
  }

}
