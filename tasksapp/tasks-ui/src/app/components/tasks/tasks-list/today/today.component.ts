import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../../../services/task.service';
import { TaskSchema } from '../../../../models/task.response';

@Component({
  selector: 'app-today',
  templateUrl: './today.component.html',
  styleUrls: ['./today.component.css']
})
export class TodayComponent implements OnInit {

  constructor(private taskService: TaskService) { }

  ngOnInit() {
    this.taskService.getTodaysTasks().subscribe((tasks) => {
      
    })
  }

}
