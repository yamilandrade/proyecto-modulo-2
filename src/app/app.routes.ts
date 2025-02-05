import { Routes } from '@angular/router';
import { TaskdetailComponent } from './taskdetail/taskdetail.component';
// import { NotFoundComponentComponent } from './not-found-component/not-found-component.component';
import { TasksComponent } from './tasks/tasks.component';
import { AboutComponent } from './about/about.component';
//creamos rutas para la aplicación

export const routes: Routes = [
  { path: '', component: TasksComponent },
  { path: 'detail/:id', component: TaskdetailComponent },
  { path: 'about', component: AboutComponent },
  // { path: '**', component: NotFoundComponentComponent, pathMatch: 'full' }, // ruta por defecto si no coincide con ninguna otra
];
