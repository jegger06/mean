import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Task } from './../../../models/task';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { TaskService } from '../../../services/task.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  taskDate = true;

  task: Task = {
    name: '',
    startDate: '',
    endDate: '',
    details: ''
  };
  dateSelected: any = '';

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
    this.dateSelected = this.task.startDate + ' - ' + this.task.endDate;
  }

  constructor(
    private router: Router,
    private taskService: TaskService,
    private toastr: ToastsManager
  ) { }

  ngOnInit() {
  }

  addTask(f) {
    if (f.valid) {
      const task: Task = {
        name: this.task.name,
        startDate: this.task.startDate,
        endDate: this.task.endDate,
        details: this.task.details
      };
      this.taskService.addTask(task).subscribe((data) => {
        if (data.success) {
          console.log(data.data);
          this.toastr.success(data.msg, 'Success!');
          this.router.navigate(['/task/all']);
        } else {
          this.toastr.error(data.msg, 'Opps!');
        }
      });
    } else {
      this.toastr.error('Please check the fields and try again.', 'Opps!');
      return false;
    }
  }


}
