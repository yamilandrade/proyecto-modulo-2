// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-tasks',
//   imports: [],
//   templateUrl: './tasks.component.html',
//   styleUrl: './tasks.component.css'
// })
// export class TasksComponent {

// }

//REFACTORIZACION
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { TaskItemComponent } from '../task-item/task-item.component';
import { Task } from '../task';
import { TaskServiceService } from '../task-service.service';
import { ApiToDosService } from '../api-to-dos.service';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [
    TaskItemComponent,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
})
export class TasksComponent {
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
  loading: boolean = false;

  constructor(
    private _FormBuilder: FormBuilder,
    private taskService: TaskServiceService,
    private apiToDosService: ApiToDosService
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
  getToDo() {
    this.loading = true;
    const id = Math.floor(Math.random() * 254); //obtenemos una tarea aleatoria de la API
    //const id = 300;
    this.apiToDosService.getToDo(id).subscribe((data: any) => {
      this.myForm.patchValue({ title: data.todo });
      this.loading = false;
    });
  }
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
    // console.log(this.myForm);
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
