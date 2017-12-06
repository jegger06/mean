import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from './../models/task';
import { AddTask } from './../models/task.response';

@Injectable()
export class TaskService {

  constructor(private http: HttpClient) { }

  addTask(task: Task) {
    return this.http.post<AddTask>('http://localhost:3000/api/task/add', task);
  }

  getAllTask() {
    return this.http.get('http://localhost:3000/api/task/all');
  }

}
