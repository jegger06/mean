import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastModule, ToastOptions } from 'ng2-toastr/ng2-toastr';
import { CustomOption } from './shared/toast/custom.options';

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
import { ViewTaskComponent } from './components/tasks/view-task/view-task.component';
import { TodayComponent } from './components/tasks/tasks-list/today/today.component';
import { LatestComponent } from './components/tasks/tasks-list/latest/latest.component';
import { OverdueComponent } from './components/tasks/tasks-list/overdue/overdue.component';
import { DoneComponent } from './components/tasks/tasks-list/done/done.component';

import { appRoutes } from './routes/main.route';

import { AuthService } from './services/auth.service';
import { AuthGuard } from './guards/auth.guard';
import { AnonymousGuard } from './guards/anonymous.guard';

import { InterceptorService } from './services/interceptor.service';

import { Daterangepicker } from 'ng2-daterangepicker';

import { TaskService } from './services/task.service';

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
    EditProfileComponent,
    ViewTaskComponent,
    TodayComponent,
    LatestComponent,
    OverdueComponent,
    DoneComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    Daterangepicker,
    ToastModule.forRoot(),
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    {
      provide: ToastOptions,
      useClass: CustomOption
    },
    AuthService,
    AuthGuard,
    AnonymousGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    },
    TaskService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
