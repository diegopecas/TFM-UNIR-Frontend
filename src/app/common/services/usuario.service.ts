import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { IUsuario } from "../models/usuario";
import { HandlerExceptions } from "../utils/handlerexception";

@Injectable({
  providedIn: "root",
})
export class UsuarioService {
  constructor(private http: HttpClient) {}

  read(): Observable<any[]> {
    return this.http.get<any>(`${environment}usuarios/read.php`).pipe(
      map((response) => response.body),
      catchError((e) => {
        // HandlerExceptions.validarExcepcionesHTTP(e);
        return throwError(e);
      })
    );
  }

  read_pw(item: IUsuario): Observable<any> {
    return this.http
      .post<any>(`${environment.urlBackend}usuarios/read_pw.php`, item)
      .pipe(
        catchError((e) => {
          // HandlerExceptions.validarExcepcionesHTTP(e);
          return throwError(e);
        })
      );
  }  

  singleRead(id: Number): Observable<any[]> {
    return this.http
      .get<any>(
        `${environment.urlBackend}usuarios/single_read.php/?id=${id}`
      )
      .pipe(
        map((response) => response.body),
        catchError((e) => {
          // HandlerExceptions.validarExcepcionesHTTP(e);
          return throwError(e);
        })
      );
  }

  create(item: IUsuario): Observable<any> {
    return this.http
      .post<any>(`${environment.urlBackend}usuarios/create.php`, item)
      .pipe(
        catchError((e) => {
          // HandlerExceptions.validarExcepcionesHTTP(e);
          return throwError(e);
        })
      );
  }

  update(item: IUsuario): Observable<any> {
    return this.http
      .post<any>(`${environment.urlBackend}usuarios/update.php`, item)
      .pipe(
        catchError((e) => {
          // HandlerExceptions.validarExcepcionesHTTP(e);
          return throwError(e);
        })
      );
  }

  delete(id: Number): Observable<any> {
    return this.http
      .post<any>(`${environment.urlBackend}usuarios/delete.php`, { id: id })
      .pipe(
        catchError((e) => {
          // HandlerExceptions.validarExcepcionesHTTP(e);
          return throwError(e);
        })
      );
  }
}
