import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from './../../../services/task.service';
import { ToastsManager } from 'ng2-toastr/src/toast-manager';
import { Task } from '../../../models/task';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit {
  taskDate = true;

  dateSelected: any = '';

  daterange: any = {};

  qwerty: any = '';

  task = {
    name: '',
    startDate: '',
    endDate: '',
    details: '',
    done: false
  };

  options: any = {};

  selectedDate(value: any, daterange?: any) {
    daterange.start = value.start;
    daterange.end = value.end;
    this.task.startDate = daterange.start.format().split('T')[0];
    this.task.endDate = daterange.end.format().split('T')[0];
    this.dateSelected = this.task.startDate + ' - ' + this.task.endDate;
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private taskService: TaskService,
    private toastr: ToastsManager
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.taskService.getTask(id).subscribe((res) => {
      if (!res.success) {
        this.toastr.warning(res.msg, 'Opps!', { toastLife: 5000 });
        this.router.navigate(['/task/all/today']);
      } else {
        this.task.name = res.tasks.name;
        this.task.details = res.tasks.details;
        this.task.done = res.tasks.done;
        this.dateSelected = `${this.formatDate(res.tasks.startDate)} - ${this.formatDate(res.tasks.endDate)}`;
        this.qwerty = '2017-12-06T12:00:00Z';

        this.options = {
          minDate: new Date(this.formatDate(res.tasks.startDate)).toISOString(),
          locale: { format: 'YYYY-MM-DD' },
          alwaysShowCalendars: false,
          startDate: new Date(this.formatDate(res.tasks.startDate)),
          endDate: new Date(this.formatDate(res.tasks.endDate))
        };
      }
    });


  }

  formatDate(date: any) {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();

    if (month.length < 2) {
      month = '0' + month;
    }
    if (day.length < 2) {
      day = '0' + day;
    }

    return `${year}-${month}-${day}`;
  }


  editTask(f) {
    if (f.valid) {
      console.log(f.value);
    }
  }

}
