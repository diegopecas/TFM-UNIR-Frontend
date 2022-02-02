import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { IEjecucion } from "../models/ejecucion";
import { HandlerExceptions } from "../utils/handlerexception";

@Injectable({
  providedIn: "root",
})
export class EjecucionService {
  constructor(private http: HttpClient) {}

  read(): Observable<any[]> {
    return this.http.get<any>(`${environment}ejecuciones/read.php`).pipe(
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
        `${environment.urlBackend}ejecuciones/single_read.php/?id=${id}`
      )
      .pipe(
        map((response) => response.body),
        catchError((e) => {
          // HandlerExceptions.validarExcepcionesHTTP(e);
          return throwError(e);
        })
      );
  }

  create(item: IEjecucion): Observable<any> {
    return this.http
      .post<any>(`${environment.urlBackend}ejecuciones/create.php`, item)
      .pipe(
        catchError((e) => {
          // HandlerExceptions.validarExcepcionesHTTP(e);
          return throwError(e);
        })
      );
  }

  update(item: IEjecucion): Observable<any> {
    return this.http
      .post<any>(`${environment.urlBackend}ejecuciones/update.php`, item)
      .pipe(
        catchError((e) => {
          // HandlerExceptions.validarExcepcionesHTTP(e);
          return throwError(e);
        })
      );
  }

  delete(id: Number): Observable<any> {
    return this.http
      .post<any>(`${environment.urlBackend}ejecuciones/delete.php`, { id: id })
      .pipe(
        catchError((e) => {
          // HandlerExceptions.validarExcepcionesHTTP(e);
          return throwError(e);
        })
      );
  }
}
