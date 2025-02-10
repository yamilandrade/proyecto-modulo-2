import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiToDosService {
  //configuramos url de los JSON de prueba
  configUrl = 'https://dummyjson.com/todos';
  constructor(private http: HttpClient) {}
  getToDo(id: number): Observable<any> {
    return this.http
      .get<any>(`${this.configUrl}/${id}`)
      .pipe(catchError((error: HttpErrorResponse) => this.handleError(error)));
  }
  private handleError(error: HttpErrorResponse): Observable<never> {
    //obteniendo error del servidor API
    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente o de red
      alert(error.error.message);
    } else {
      // El backend devolvió un código de error
      alert(
        `Código de error: ${error.status}, ` + `Mensaje: ${error.error.message}`
      );
    }
    return throwError(() => new Error('mono'));
  }
}
