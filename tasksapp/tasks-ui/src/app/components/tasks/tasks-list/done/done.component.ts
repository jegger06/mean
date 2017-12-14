import { Component, OnInit, OnDestroy } from '@angular/core';
import { TaskService } from './../../../../services/task.service';

@Component({
  selector: 'app-done',
  templateUrl: './done.component.html',
  styleUrls: ['./done.component.css']
})
export class DoneComponent implements OnInit, OnDestroy {
  private subscription: any = {};

  errorMsg: string;
  tasks: any = [];

  constructor(private taskService: TaskService) { }

  ngOnInit() {
    this.subscription = this.taskService.getDoneTasks().subscribe((res) => {
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
