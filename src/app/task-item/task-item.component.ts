import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Task } from '../task';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-item',
  imports: [MatIconModule],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.css',
})
export class TaskItemComponent {
  constructor(private router: Router) {}
  @Input() task: Task = {
    id: 0,
    title: '',
    completed: false,
  };
  @Output() completeTask = new EventEmitter<number>();
  @Output() deleteTask = new EventEmitter<number>();
  @Output() editTask = new EventEmitter<number>();

  onToggleComplete() {
    this.completeTask.emit(this.task?.id);
  }

  onDelete() {
    this.deleteTask.emit(this.task?.id);
  }
  onEdit() {
    this.editTask.emit(this.task?.id);
  }
  goToDetail(task: Task) {
    console.log(task);
    this.router.navigate(['/detail/' + task.id]);
  }
}
