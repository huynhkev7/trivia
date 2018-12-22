import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatInputModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatSortModule,
  MatTableModule,
  MatIconModule,
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatRadioModule,
  MatRadioButton,
  MatMenuModule
} from '@angular/material';

// For MDB Angular Free
import { ChartsModule, WavesModule } from 'angular-bootstrap-md';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { BoardsComponent } from './boards/boards.component';
import { BoardsDetailComponent } from './boards-detail/boards-detail.component';
import { BoardsCreateComponent } from './boards-create/boards-create.component';
import { BoardsEditComponent } from './boards-edit/boards-edit.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SignInComponent } from './sign-in/sign-in.component';
import { StatsComponent } from './stats/stats.component';

const appRoutes: Routes = [
  {
    path: 'boards',
    component: BoardsComponent,
    data: { title: 'Boards List' }
  },
  {
    path: 'boards-details/:id',
    component: BoardsDetailComponent,
    data: { title: 'Boards Details' }
  },
  {
    path: 'boards-create',
    component: BoardsCreateComponent,
    data: { title: 'Create Boards' }
  },
  {
    path: 'boards-edit/:id',
    component: BoardsEditComponent,
    data: { title: 'Edit Boards' }
  },
  { path: '',
    redirectTo: '/sign-in',
    pathMatch: 'full'
  },
  {
    path: 'sign-in',
    component: SignInComponent
  },
  {
    path: 'stats',
    component: StatsComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    BoardsComponent,
    BoardsDetailComponent,
    BoardsCreateComponent,
    BoardsEditComponent,
    SignInComponent,
    StatsComponent
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatRadioModule,
    MatMenuModule,
    ChartsModule, WavesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
