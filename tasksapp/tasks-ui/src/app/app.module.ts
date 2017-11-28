import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { TasksListComponent } from './components/tasks/tasks-list/tasks-list.component';
import { AddTaskComponent } from './components/tasks/add-task/add-task.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { EditTaskComponent } from './components/tasks/edit-task/edit-task.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ViewProfileComponent } from './components/profile/view-profile/view-profile.component';
import { EditProfileComponent } from './components/profile/edit-profile/edit-profile.component';
import { appRoutes } from './routes/main.route';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    TasksComponent,
    TasksListComponent,
    AddTaskComponent,
    LoginComponent,
    RegisterComponent,
    EditTaskComponent,
    ProfileComponent,
    ViewProfileComponent,
    EditProfileComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
