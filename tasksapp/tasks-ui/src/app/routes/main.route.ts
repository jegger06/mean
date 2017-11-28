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

export const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'task',
    component: TasksComponent,
    children: [
      {
        path: '',
        redirectTo: 'all',
        pathMatch: 'full'
      },
      {
        path: 'all',
        component: TasksListComponent
      },
      {
        path: 'add',
        component: AddTaskComponent
      },
      {
        path: 'edit/:id',
        component: EditTaskComponent
      }
    ]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    children: [
      {
        path: '',
        redirectTo: 'view',
        pathMatch: 'full'
      },
      {
        path: 'view',
        component: ViewProfileComponent
      },
      {
        path: 'edit',
        component: EditProfileComponent
      }
    ]
  },
];