import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css']
})
export class ViewTaskComponent implements OnInit {
  task: any = {};

  constructor() { }

  ngOnInit() {
    this.task.done = false;
  }

  delete() {
    alert(123);
  }

}
