import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TaskService } from './../../../services/task.service';
import { ToastsManager } from 'ng2-toastr/src/toast-manager';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css']
})
export class ViewTaskComponent implements OnInit, OnDestroy {
  subscription: any = {};
  task: any = {};
  color: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private taskService: TaskService,
    private toastr: ToastsManager
  ) { }

  ngOnInit() {
    const date = new Date();
    const currentDate = new Date(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`).toISOString();

    const id = this.route.snapshot.paramMap.get('id');
    this.subscription = this.taskService.getTask(id).subscribe((res) => {
      if (res.success) {
        this.task = res.tasks;
        console.log(this.task);
        switch (this.task.done) {
          case false:
            if (new Date(this.task.endDate).toISOString() < currentDate) {
              this.color = 'bg-danger';
            } else {
              this.color = '';
            }
            break;
          case true:
            this.color = 'bg-success';
            break;
          default:
            this.color = '';
            break;
        }
      } else {
        this.toastr.warning(res.msg, 'Opps!', { toastLife: 5000 });
        this.router.navigate(['/task/all/today']);
      }
    });
  }

  deleteTask(id: string | number) {
    this.taskService.deleteTask(id).subscribe((res) => {
      if (res.success) {
        this.toastr.success(res.msg, 'Yay!', { toastLife: 5000 });
        this.router.navigate(['/task/all/today']);
      } else {
        this.toastr.warning(res.msg, 'Opps!', { toastLife: 5000 });
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
