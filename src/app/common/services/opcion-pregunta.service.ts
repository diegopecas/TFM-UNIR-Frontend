import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { IOpcionPregunta } from "../models/opcion-pregunta";
import { HandlerExceptions } from "../utils/handlerexception";

@Injectable({
  providedIn: "root",
})
export class OpcionPreguntaService {
  constructor(private http: HttpClient) {}

  read(): Observable<any[]> {
    return this.http.get<any>(`${environment}opciones-pregunta/read.php`).pipe(
      map((response) => response.body),
      catchError((e) => {
        // HandlerExceptions.validarExcepcionesHTTP(e);
        return throwError(e);
      })
    );
  }

  singleRead(id: Number): Observable<any[]> {
    return this.http
      .get<any>(
        `${environment.urlBackend}opciones-pregunta/single_read.php/?id=${id}`
      )
      .pipe(
        map((response) => response.body),
        catchError((e) => {
          // HandlerExceptions.validarExcepcionesHTTP(e);
          return throwError(e);
        })
      );
  }

  create(item: IOpcionPregunta): Observable<any> {
    return this.http
      .post<any>(`${environment.urlBackend}opciones-pregunta/create.php`, item)
      .pipe(
        catchError((e) => {
          // HandlerExceptions.validarExcepcionesHTTP(e);
          return throwError(e);
        })
      );
  }

  update(item: IOpcionPregunta): Observable<any> {
    return this.http
      .post<any>(`${environment.urlBackend}opciones-pregunta/update.php`, item)
      .pipe(
        catchError((e) => {
          // HandlerExceptions.validarExcepcionesHTTP(e);
          return throwError(e);
        })
      );
  }

  delete(id: Number): Observable<any> {
    return this.http
      .post<any>(`${environment.urlBackend}opciones-pregunta/delete.php`, { id: id })
      .pipe(
        catchError((e) => {
          // HandlerExceptions.validarExcepcionesHTTP(e);
          return throwError(e);
        })
      );
  }
}
