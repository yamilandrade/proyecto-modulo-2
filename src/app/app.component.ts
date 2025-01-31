import { Component, signal, ViewEncapsulation } from '@angular/core';
import { TaskItemComponent } from './task-item/task-item.component';
import { MatButtonModule } from '@angular/material/button';
import { TaskServiceService } from './task-service.service';
import {
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Task } from './task';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    TaskItemComponent,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  // declaración de variable para utilizar formularios reactivos
  myForm: FormGroup;
  title = 'todo-app';
  tasks: Task[] = [];
  //taskInput: string = '';
  statusEdit: boolean = false;
  task: Task = {
    id: 0,
    title: '',
    completed: false,
  };

  constructor(
    private _FormBuilder: FormBuilder,
    private taskService: TaskServiceService
  ) {
    this.myForm = this._FormBuilder.group({
      // declaramos que el campo es obligatorio, no vacio, lingitud mínima de 4 caracteres
      title: ['', [Validators.required, Validators.minLength(4)]],
    });
  }
  //Llamado de la función cuando inicia el componente
  ngOnInit(): void {
    this.getTasks();
  }
  // getTasks() {
  //   this.taskService.getData().subscribe(
  //     (data) => (this.tasks = data),
  //     (error) => console.error('Error fetching data:', error)
  //   );
  // }

  getTasks() {
    this.tasks = this.taskService.getTasks();
  }

  addTask() {
    if (this.myForm.invalid) {
      return;
    }
    //console.log(this.myForm.value.newTask);
    //se envia el valor dentro del myForm como nueva tarea
    if (this.myForm.value.title.trim()) {
      const newTask = {
        id: Date.now(),
        title: this.myForm.value.title,
        completed: false,
      };
      this.tasks.push(newTask);
      this.taskService.addTask(newTask);
      this.clearInput();
    }
  }

  deleteTask(taskId: number) {
    this.tasks = this.tasks.filter((task: Task) => task.id !== taskId);
    this.taskService.deleteTask(taskId);
  }

  editTask(taskId: number) {
    this.task = this.tasks.find((task: Task) => task.id === taskId)!;
    this.myForm.patchValue(this.task);
    console.log(this.myForm);
    this.statusEdit = true;
  }

  updateTask() {
    const task = this.tasks.find((task: Task) => task.id === this.task.id);
    if (task) {
      task.title = this.myForm.value.title;
    }
    this.taskService.updateTask(this.task.id, this.myForm.value.title);
    this.statusEdit = false;
    this.clearInput();
  }

  toggleComplete(taskId: number) {
    const task = this.tasks.find((task: Task) => task.id === taskId);
    if (task) {
      task.completed = !task.completed;
    }
    this.taskService.toogleTask(taskId, true);
  }
  //función para limpiar el input
  clearInput() {
    this.myForm.patchValue({ title: '' });
  }
}
