import { Component, OnInit } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { FsService } from '../fs.service';
import { UserServiceService } from '../user-service.service';
import { Observable, of } from 'rxjs';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { useAnimation } from '@angular/animations';
import { e } from '@angular/core/src/render3';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})

export class StatsComponent implements OnInit {
  // dataSource: Array<Object>;

  displayedColumns = ['username', 'points'];

  dataSource: Array<Object>;

  constructor(private fs: FsService, private us: UserServiceService) { }

  ngOnInit() {
    this.fs.getAllUsers().subscribe(userData => {
      this.dataSource = userData;
    });
  }

  public back() {
    this.us.setBackToTrue();
  }

}
