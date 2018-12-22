import { Component, OnInit } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { FsService } from '../fs.service';
import { UserServiceService } from '../user-service.service';
import { Observable, of } from 'rxjs';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { useAnimation } from '@angular/animations';
import { e } from '@angular/core/src/render3';
@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.css']
})
export class BoardsComponent implements OnInit {
  boardsForm: FormGroup;
  displayedColumns = ['username', 'points'];
  dataSource: Array<Object>;
  dataObject: Array<Object>;
  shouldDisable: boolean;
  users: Array<Object>;
  //dataSource = new BoardDataSource(this.fs);
  // dataObject = {
  //   question: 'is a water chestnut a nut?',
  //   answers: ['Winter', 'Spring', 'Summer', 'Autumn'],
  //   answer: 1
  // };

  constructor(private fs: FsService, private formBuilder: FormBuilder, private us: UserServiceService) {
    // this.us.turnOff();
    // this.shouldDisable = this.us.getDisableFlag();
  }

  ngOnInit() {
    // this.shouldDisable = this.us.getDisableFlag();
    this.boardsForm = this.formBuilder.group({
      'chosenAnswer' : [null, Validators.required]
    });
    this.fs.getBoardActive().subscribe(portfolioData => {
      if (this.us.getBackStatus()) {
        this.us.setBackToFalse();
      } else {
        this.us.setToTrue();
      }
      this.dataSource = portfolioData;
    });

    this.fs.getAllUsers().subscribe(userData => {
      this.users = userData;
    });
  // this.dataSource = [{
  //   question: 'is a water chestnut a nut?',
  //   answers: ['Winter', 'Spring', 'Summer', 'Autumn'],
  //   answer: 1
  // }];
  }

  getStatus(): void {
    this.us.getStatus().subscribe(value => this.shouldDisable = value);
  }

  onFormSubmit(form: NgForm) {
    const user = this.us.getUser();
    if (user !== null) {
      if (form['chosenAnswer'] === this.dataSource[0]['answers'][this.dataSource[0]['answer']]) {
        if (user !== null) {
          user['points'] = Number(user['points']) + Number(this.dataSource[0]['points']);
          this.fs.postAnswer(user['id'], user);
          alert('correct!');
          this.us.setToFalse();
        } else {
          alert('Please sign in');
        }
      } else if (form['chosenAnswer'] !== null) {
        alert('wrong!');
        this.us.setToFalse();
      } else {
        alert('Please select an option');
      }
    } else {
      alert('Please sign in');
    }

    // this.fs.postBoards(form)
    //   .subscribe(res => {
    //       let id = res['key'];
    //       this.router.navigate(['/boards-details', id]);
    //     }, (err) => {
    //       console.log(err);
    //     });
  }

}
