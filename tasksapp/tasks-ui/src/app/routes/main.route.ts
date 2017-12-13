import { Routes } from '@angular/router';

import { HomeComponent } from '../components/home/home.component';
import { LoginComponent } from '../components/login/login.component';
import { RegisterComponent } from '../components/register/register.component';
import { TasksComponent } from '../components/tasks/tasks.component';
import { TasksListComponent } from '../components/tasks/tasks-list/tasks-list.component';
import { AddTaskComponent } from '../components/tasks/add-task/add-task.component';
import { EditTaskComponent } from '../components/tasks/edit-task/edit-task.component';
import { ProfileComponent } from '../components/profile/profile.component';
import { ViewProfileComponent } from '../components/profile/view-profile/view-profile.component';
import { EditProfileComponent } from '../components/profile/edit-profile/edit-profile.component';
import { ViewTaskComponent } from '../components/tasks/view-task/view-task.component';
import { TodayComponent } from '../components/tasks/tasks-list/today/today.component';
import { LatestComponent } from '../components/tasks/tasks-list/latest/latest.component';
import { OverdueComponent } from '../components/tasks/tasks-list/overdue/overdue.component';
import { DoneComponent } from '../components/tasks/tasks-list/done/done.component';

import { AuthGuard } from './../guards/auth.guard';
import { AnonymousGuard } from './../guards/anonymous.guard';

export const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AnonymousGuard]
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [AnonymousGuard]
  },
  {
    path: 'task',
    component: TasksComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'all',
        pathMatch: 'full'
      },
      {
        path: 'all',
        component: TasksListComponent,
        canActivate: [AuthGuard],
        children: [
          {
            path: '',
            redirectTo: 'today',
            pathMatch: 'full'
          },
          {
            path: 'today',
            component: TodayComponent,
            canActivate: [AuthGuard]
          },
          {
            path: 'latest',
            component: LatestComponent,
            canActivate: [AuthGuard]
          },
          {
            path: 'overdue',
            component: OverdueComponent,
            canActivate: [AuthGuard]
          },
          {
            path: 'done',
            component: DoneComponent,
            canActivate: [AuthGuard]
          }
        ]
      },
      {
        path: 'add',
        component: AddTaskComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'view/:id',
        component: ViewTaskComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'edit/:id',
        component: EditTaskComponent,
        canActivate: [AuthGuard]
      }
    ]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'view',
        pathMatch: 'full'
      },
      {
        path: 'view',
        component: ViewProfileComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'edit',
        component: EditProfileComponent,
        canActivate: [AuthGuard]
      }
    ]
  },
];
