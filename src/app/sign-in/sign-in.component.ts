import { Component, OnInit, Input } from '@angular/core';

import {Router} from '@angular/router';
import {MatDialog} from '@angular/material';
import { FsService } from '../fs.service';
import { UserServiceService } from '../user-service.service';
import { database } from 'firebase';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  loggedIn: boolean;
  @Input() username: String;
  constructor(private fs: FsService, private us: UserServiceService) {
    this.loggedIn = false;
  }

  ngOnInit() {
  }

  public back() {
    this.us.setBackToTrue();
  }

  public login(username) {
    if (username !== undefined  && username !== null && username.replace(/\s/g, '').length > 0) {
      let data = {
        username: username.toLowerCase()
      };
      this.fs.login(data).subscribe(users => {
        let found = false;
        for (let i = 0; i < users.length; i++) {
          if (users[i]['username'] === data['username']) {
            found = true;
            data = users[i];
          }
        }
        if (found === true) {
          this.us.setUser(data);
          this.loggedIn = true;
        } else {
          data['points'] = 0;
          this.fs.addUser(data);
          this.us.setUser(data);
          this.loggedIn = true;
        }
        // for (const user in users) {
        //   if (user['username'] === data['username']) {
        //     found = true;
        //     this.us.setUser(user);
        //     return;
        //   }
        // }
        // if (found === false) {
        //   data['points'] = 0;
        //   this.fs.addUser(data);
        //   this.us.setUser(data);
        // }
      }, () => {});
    } else {
      alert('cannot be empty');
    }

  }
}
