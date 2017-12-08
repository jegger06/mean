import { Component, OnInit, OnDestroy } from '@angular/core';
import { TaskService } from '../../../services/task.service';
import { TaskList } from '../../../models/task';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.css']
})
export class TasksListComponent implements OnInit, OnDestroy {
  private subscription: any = {};

  success: boolean;
  errorMsg: any;
  todaysTask: Array<TaskList> = [];
  latestTask: Array<TaskList> = [];
  overdueTask: Array<TaskList> = [];
  doneTask: Array<TaskList> = [];

  constructor(
    private taskService: TaskService
  ) { }

  ngOnInit() {
    this.subscription = this.taskService.getAllTask().subscribe((data) => {
      // this.success = data.success;
      if (data.success) {
        this.todaysTask = data.todaysTask;
        this.latestTask = data.latestTask;
        this.overdueTask = data.overdueTask;
        this.doneTask = data.doneTask;
      } else {
        this.errorMsg = data.msg;
      }
    });

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
