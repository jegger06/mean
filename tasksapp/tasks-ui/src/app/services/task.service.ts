import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from './../models/task';
import { TaskSchema } from './../models/task.response';

@Injectable()
export class TaskService {

  constructor(private http: HttpClient) { }

  addTask(task: Task) {
    return this.http.post<TaskSchema>('http://localhost:3000/api/task/add', task);
  }

  // getAllTask() {
  //   return this.http.get<AllTask>('http://localhost:3000/api/task/all');
  // }

  getTodaysTasks() {
    return this.http.get<TaskSchema>('http://localhost:3000/api/task/today');
  }

}
