import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { IPregunta } from "../models/pregunta";
import { HandlerExceptions } from "../utils/handlerexception";

@Injectable({
  providedIn: "root",
})
export class PreguntaService {
  constructor(private http: HttpClient) {}

  httpHeaders = new HttpHeaders({ "Content-Type": "application/json" });

  read(): Observable<any[]> {
    const httpTemp = this.httpHeaders.append("Usuario", "");

    return this.http.get<any>(`${environment.urlBackend}preguntas/read.php`, {
      headers: httpTemp,
    }).pipe(
      map((response) => response.body),
      catchError((e) => {
        // HandlerExceptions.validarExcepcionesHTTP(e);
        return throwError(e);
      })
    );
  }

  read_paso(paso:any): Observable<any[]> {
    const httpTemp = this.httpHeaders.append("Usuario", "");

    return this.http.get<any>(`${environment.urlBackend}preguntas/read_paso.php?paso=${paso}`, {
      headers: httpTemp,
    }).pipe(
      /*map((response) => {
        if (response.body) {
          return response.body;
        } else {
          return null;
        }
      }),*/
      catchError((e) => {
        // HandlerExceptions.validarExcepcionesHTTP(e);
        return throwError(e);
      })
    );
  }

  singleRead(id: Number): Observable<any[]> {
    return this.http
      .get<any>(
        `${environment.urlBackend}preguntas/single_read.php/?id=${id}`
      )
      .pipe(
        map((response) => response.body),
        catchError((e) => {
          // HandlerExceptions.validarExcepcionesHTTP(e);
          return throwError(e);
        })
      );
  }

  create(item: IPregunta): Observable<any> {
    return this.http
      .post<any>(`${environment.urlBackend}preguntas/create.php`, item)
      .pipe(
        catchError((e) => {
          // HandlerExceptions.validarExcepcionesHTTP(e);
          return throwError(e);
        })
      );
  }

  update(item: IPregunta): Observable<any> {
    return this.http
      .post<any>(`${environment.urlBackend}preguntas/update.php`, item)
      .pipe(
        catchError((e) => {
          // HandlerExceptions.validarExcepcionesHTTP(e);
          return throwError(e);
        })
      );
  }

  delete(id: Number): Observable<any> {
    return this.http
      .post<any>(`${environment.urlBackend}preguntas/delete.php`, { id: id })
      .pipe(
        catchError((e) => {
          // HandlerExceptions.validarExcepcionesHTTP(e);
          return throwError(e);
        })
      );
  }
}
