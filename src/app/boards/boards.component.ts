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

  public chartType: String = 'horizontalBar';

  public chartDatasets: Array<any> = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Ranking' }
  ];

  public chartLabels: Array<any> = [];

  public chartColors: Array<any> = [
    {
      // backgroundColor: [
      //   'rgba(255, 99, 132, 0.2)',
      //   'rgba(54, 162, 235, 0.2)',
      //   'rgba(255, 206, 86, 0.2)',
      //   'rgba(75, 192, 192, 0.2)',
      //   'rgba(153, 102, 255, 0.2)',
      //   'rgba(255, 159, 64, 0.2)'
      // ],
      // borderColor: [
      //   'rgba(255,99,132,1)',
      //   'rgba(54, 162, 235, 1)',
      //   'rgba(255, 206, 86, 1)',
      //   'rgba(75, 192, 192, 1)',
      //   'rgba(153, 102, 255, 1)',
      //   'rgba(255, 159, 64, 1)'
      // ],
      borderWidth: 2
    }
  ];

  public chartOptions: any = {
    responsive: true
  };

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
      const tempArrayStats = [];
      const tempUsers = [];
      for (let i = 0; i < this.users.length; i++) {
        tempArrayStats.push(Number(this.users[i]['points']));
        tempUsers.push(this.users[i]['username']);
      }
      this.chartDatasets[0]['data'] = tempArrayStats;
      this.chartLabels = tempUsers;
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
          //alert('correct!');
          this.us.setToFalse();
        } else {
          alert('Please sign in');
        }
      } else if (form['chosenAnswer'] !== null) {
        //alert('wrong!');
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

  public chartClicked(e: any): void { }

  public chartHovered(e: any): void { }

}
