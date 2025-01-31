import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Task } from '../task';

@Component({
  selector: 'app-task-item',
  imports: [MatIconModule],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.css',
})
export class TaskItemComponent {
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
}
