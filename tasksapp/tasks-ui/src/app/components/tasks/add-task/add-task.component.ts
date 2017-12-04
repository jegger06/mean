import { Component, OnInit } from '@angular/core';
import { Task } from './../../../models/task';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  task: Task = {
    name: '',
    startDate: '',
    endDate: '',
    details: ''
  };
  startDateErr: any = '';

  constructor() { }

  ngOnInit() {
  }

  addTask(f) {

    console.log(new Date(f.value.startDate).toISOString() <= new Date(f.value.endDate).toISOString());
  }

}
