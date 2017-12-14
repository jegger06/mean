import { Component, OnInit, OnDestroy } from '@angular/core';
import { TaskService } from '../../../../services/task.service';

@Component({
  selector: 'app-overdue',
  templateUrl: './overdue.component.html',
  styleUrls: ['./overdue.component.css']
})
export class OverdueComponent implements OnInit, OnDestroy {
  private subscription: any = {};

  errorMsg: string;
  tasks: any = [];

  constructor(private taskService: TaskService) { }

  ngOnInit() {
    this.subscription = this.taskService.getOverdueTasks().subscribe((res) => {
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
