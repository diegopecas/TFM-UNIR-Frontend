import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { IPaso } from "../models/paso";
import { HandlerExceptions } from "../utils/handlerexception";

@Injectable({
  providedIn: "root",
})
export class PasoService {
  constructor(private http: HttpClient) {}

  httpHeaders = new HttpHeaders({ "Content-Type": "application/json" });

  read(): Observable<any[]> {
    const httpTemp = this.httpHeaders.append("Usuario", "");

    return this.http.get<any>(`${environment.urlBackend}pasos/read.php`, {
      headers: httpTemp,
    }).pipe(
      map((response) => response.body),
      catchError((e) => {
        // HandlerExceptions.validarExcepcionesHTTP(e);
        return throwError(e);
      })
    );
  }

  read_prueba(prueba:any): Observable<any[]> {
    const httpTemp = this.httpHeaders.append("Usuario", "");

    return this.http.get<any>(`${environment.urlBackend}pasos/read_prueba.php?prueba=${prueba}`, {
      headers: httpTemp,
    }).pipe(
      map((response) => response.body),
      catchError((e) => {
        // HandlerExceptions.validarExcepcionesHTTP(e);
        return throwError(e);
      })
    );
  }

  singleRead(id: Number): Observable<any[]> {
    console.log('buscar paso', id, `${environment.urlBackend}pasos/single_read.php/?id=${id}`);
    const httpTemp = this.httpHeaders.append("Usuario", "");
    
    return this.http
      .get<any>(
        `${environment.urlBackend}pasos/single_read.php/?id=${id}`
        , {
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

  create(item: IPaso): Observable<any> {
    return this.http
      .post<any>(`${environment.urlBackend}pasos/create.php`, item)
      .pipe(
        catchError((e) => {
          // HandlerExceptions.validarExcepcionesHTTP(e);
          return throwError(e);
        })
      );
  }

  update(item: IPaso): Observable<any> {
    return this.http
      .post<any>(`${environment.urlBackend}pasos/update.php`, item)
      .pipe(
        catchError((e) => {
          // HandlerExceptions.validarExcepcionesHTTP(e);
          return throwError(e);
        })
      );
  }

  delete(id: Number): Observable<any> {
    return this.http
      .post<any>(`${environment.urlBackend}pasos/delete.php`, { id: id })
      .pipe(
        catchError((e) => {
          // HandlerExceptions.validarExcepcionesHTTP(e);
          return throwError(e);
        })
      );
  }
}
