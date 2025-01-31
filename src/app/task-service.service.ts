import { Injectable } from '@angular/core';
// import tasks from './Data/data.json';
//import { HttpClient } from '@angular/common/http';
//import { Observable } from 'rxjs';
import { Init } from './init-task';
import { Task } from './task';

@Injectable({
  providedIn: 'root',
})
export class TaskServiceService extends Init {
  //se comenta las líneas, solamente fueron utilizadas para probar HttpClient
  //constructor(private http: HttpClient) {}
  //public url = '/data.json';
  //getData(): Observable<any[]> {
  //return this.http.get<any[]>(this.url);
  //}
  constructor() {
    super();
    this.load();
  }
  getTasks() {
    // let tasks = JSON.parse(localStorage.getItem('tasks'));
    // return tasks;
    return JSON.parse(localStorage.getItem('tasks')!!);
  }

  addTask(newTask: Task) {
    let tasks = JSON.parse(localStorage.getItem('tasks')!!);
    // Add New TodoService
    tasks.push(newTask);
    // Set New task
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  deleteTask(id: number) {
    let tasks = JSON.parse(localStorage.getItem('tasks')!!);

    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].id == id) {
        tasks.splice(i, 1);
      }
    }
    // Set New Todos
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  updateTask(id: number, title: string) {
    let tasks = JSON.parse(localStorage.getItem('tasks')!!);

    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].id == id) {
        tasks[i].title = title;
      }
    }
    // Set New Task
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
  toogleTask(id: number, completed: boolean) {
    let tasks = JSON.parse(localStorage.getItem('tasks')!!);

    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].id == id) {
        tasks[i].completed = completed;
      }
    }
    // Set New Task
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
}
