import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { IPermiso } from "../models/permiso";
import { HandlerExceptions } from "../utils/handlerexception";

@Injectable({
  providedIn: "root",
})
export class PermisoService {
  constructor(private http: HttpClient) {}

  httpHeaders = new HttpHeaders({ "Content-Type": "application/json" });

  read(): Observable<any[]> {
    const httpTemp = this.httpHeaders.append("Usuario", "");

    return this.http
      .get<any>(`${environment.urlBackend}permisos/read.php`, {
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
    const httpTemp = this.httpHeaders.append("Usuario", "");

    return this.http
      .get<any>(`${environment.urlBackend}permisos/single_read.php/?id=${id}`, {
        headers: httpTemp,
        observe: "response",
      })
      .pipe(
        map((response) => response.body),
        catchError((e) => {
          // HandlerExceptions.validarExcepcionesHTTP(e);
          return throwError(e);
        })
      );
  }
}
