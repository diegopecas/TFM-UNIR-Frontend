import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { IRol } from "../models/rol";
import { HandlerExceptions } from "../utils/handlerexception";

@Injectable({
  providedIn: "root",
})
export class RolService {
  constructor(private http: HttpClient) {}

  httpHeaders = new HttpHeaders({ "Content-Type": "application/json" });

  read(): Observable<any[]> {
    const httpTemp = this.httpHeaders.append("Usuario", "");

    return this.http
      .get<any>(`${environment.urlBackend}roles/read.php`, {
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
      .get<any>(`${environment.urlBackend}roles/single_read.php/?id=${id}`)
      .pipe(
        map((response) => response.body),
        catchError((e) => {
          // HandlerExceptions.validarExcepcionesHTTP(e);
          return throwError(e);
        })
      );
  }

  create(item: IRol): Observable<any> {
    return this.http
      .post<any>(`${environment.urlBackend}roles/create.php`, item)
      .pipe(
        catchError((e) => {
          // HandlerExceptions.validarExcepcionesHTTP(e);
          return throwError(e);
        })
      );
  }

  update(item: IRol): Observable<any> {
    return this.http
      .post<any>(`${environment.urlBackend}roles/update.php`, item)
      .pipe(
        catchError((e) => {
          // HandlerExceptions.validarExcepcionesHTTP(e);
          return throwError(e);
        })
      );
  }

  delete(id: Number): Observable<any> {
    return this.http
      .post<any>(`${environment.urlBackend}roles/delete.php`, { id: id })
      .pipe(
        catchError((e) => {
          // HandlerExceptions.validarExcepcionesHTTP(e);
          return throwError(e);
        })
      );
  }
}
