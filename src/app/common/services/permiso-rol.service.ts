import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { IPermisoRol } from "../models/permiso-rol";
import { HandlerExceptions } from "../utils/handlerexception";

@Injectable({
  providedIn: "root",
})
export class PermisoRolService {
  constructor(private http: HttpClient) {}

  read(): Observable<any[]> {
    return this.http.get<any>(`${environment}permiso-rol/read.php`).pipe(
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
        `${environment.urlBackend}permiso-rol/single_read.php/?id=${id}`
      )
      .pipe(
        map((response) => response.body),
        catchError((e) => {
          // HandlerExceptions.validarExcepcionesHTTP(e);
          return throwError(e);
        })
      );
  }

  create(item: IPermisoRol): Observable<any> {
    return this.http
      .post<any>(`${environment.urlBackend}permiso-rol/create.php`, item)
      .pipe(
        catchError((e) => {
          // HandlerExceptions.validarExcepcionesHTTP(e);
          return throwError(e);
        })
      );
  }

  update(item: IPermisoRol): Observable<any> {
    return this.http
      .post<any>(`${environment.urlBackend}permiso-rol/update.php`, item)
      .pipe(
        catchError((e) => {
          // HandlerExceptions.validarExcepcionesHTTP(e);
          return throwError(e);
        })
      );
  }

  delete(id: Number): Observable<any> {
    return this.http
      .post<any>(`${environment.urlBackend}permiso-rol/delete.php`, { id: id })
      .pipe(
        catchError((e) => {
          // HandlerExceptions.validarExcepcionesHTTP(e);
          return throwError(e);
        })
      );
  }
}
