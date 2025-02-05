import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from '../task';
import { TaskServiceService } from '../task-service.service';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-taskdetail',
  imports: [MatCardModule, MatChipsModule],
  templateUrl: './taskdetail.component.html',
  styleUrl: './taskdetail.component.css',
})
export class TaskdetailComponent implements OnInit {
  id: string = '';
  tasks: Task[] = [];
  task: Task = {
    id: 0,
    title: '',
    completed: false,
  };
  constructor(
    private route: ActivatedRoute,
    private taskService: TaskServiceService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getTasks();
  }
  getTasks() {
    this.tasks = this.taskService.getTasks();
    this.id = this.route.snapshot.paramMap.get('id')!;
    this.task = this.tasks.find((task: Task) => task.id === Number(this.id))!;
  }
  goToTasks() {
    this.router.navigate(['/']);
  }
}
