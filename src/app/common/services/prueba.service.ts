import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { IPrueba } from "../models/prueba";
import { HandlerExceptions } from "../utils/handlerexception";

@Injectable({
  providedIn: "root",
})
export class PruebaService {
  constructor(private http: HttpClient) {}

  httpHeaders = new HttpHeaders({ "Content-Type": "application/json" });

  read(): Observable<any[]> {
    const httpTemp = this.httpHeaders.append("Usuario", "");

    return this.http
      .get<any>(`${environment.urlBackend}pruebas/read.php`, {
        headers: httpTemp,
      })
      .pipe(
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
        `${environment.urlBackend}pruebas/single_read.php/?id=${id}`
      )
      .pipe(
        map((response) => response.body),
        catchError((e) => {
          // HandlerExceptions.validarExcepcionesHTTP(e);
          return throwError(e);
        })
      );
  }

  create(item: IPrueba): Observable<any> {
    return this.http
      .post<any>(`${environment.urlBackend}pruebas/create.php`, item)
      .pipe(
        catchError((e) => {
          // HandlerExceptions.validarExcepcionesHTTP(e);
          return throwError(e);
        })
      );
  }

  update(item: IPrueba): Observable<any> {
    return this.http
      .post<any>(`${environment.urlBackend}pruebas/update.php`, item)
      .pipe(
        catchError((e) => {
          // HandlerExceptions.validarExcepcionesHTTP(e);
          return throwError(e);
        })
      );
  }

  delete(id: Number): Observable<any> {
    return this.http
      .post<any>(`${environment.urlBackend}pruebas/delete.php`, { id: id })
      .pipe(
        catchError((e) => {
          // HandlerExceptions.validarExcepcionesHTTP(e);
          return throwError(e);
        })
      );
  }
}
