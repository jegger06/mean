import { Component, OnInit, OnDestroy } from '@angular/core';
import { TaskService } from '../../../../services/task.service';

@Component({
  selector: 'app-latest',
  templateUrl: './latest.component.html',
  styleUrls: ['./latest.component.css']
})
export class LatestComponent implements OnInit, OnDestroy {
  private subscription: any = {};

  errorMsg: string;
  tasks: any = [];

  constructor(private taskService: TaskService) { }

  ngOnInit() {
    this.subscription = this.taskService.getLatestTasks().subscribe((res) => {
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
