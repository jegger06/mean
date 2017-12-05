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
  daterangeInput: any;

  daterange: any = {};

  options: any = {
    minDate: new Date().toISOString(),
    locale: {
      format: 'YYYY-MM-DD'
    },
    alwaysShowCalendars: false
  };

  selectedDate(value: any, daterange?: any) {
    daterange.start = value.start;
    daterange.end = value.end;
    this.task.startDate = daterange.start.format().split('T')[0];
    this.task.endDate = daterange.end.format().split('T')[0];
  }

  constructor() { }

  ngOnInit() {
  }

  addTask(f) {
    console.log(f);
  }


}
