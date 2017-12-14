import { Component, OnInit, OnDestroy } from '@angular/core';
import { TaskService } from '../../../../services/task.service';

@Component({
  selector: 'app-today',
  templateUrl: './today.component.html',
  styleUrls: ['./today.component.css']
})
export class TodayComponent implements OnInit, OnDestroy {
  private subscription: any = {};

  errorMsg: string;
  tasks: any = [];

  constructor(private taskService: TaskService) { }

  ngOnInit() {
    this.subscription = this.taskService.getTodaysTasks().subscribe((res) => {
      if (res.success) {
        this.tasks = res.tasks;
      } else {
        this.errorMsg = res.msg;
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
