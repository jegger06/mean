import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task, TaskDelete } from './../models/task';
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

  getLatestTasks() {
    return this.http.get<TaskSchema>('http://localhost:3000/api/task/latest');
  }

  getOverdueTasks() {
    return this.http.get<TaskSchema>('http://localhost:3000/api/task/overdue');
  }

  getDoneTasks() {
    return this.http.get<TaskSchema>('http://localhost:3000/api/task/done');
  }

  getTask(id: string | number) {
    return this.http.get<TaskSchema>(`http://localhost:3000/api/task/details/${id}`);
  }

  deleteTask(id: string | number) {
    return this.http.delete<TaskDelete>(`http://localhost:3000/api/task/${ id }`);
  }

}
