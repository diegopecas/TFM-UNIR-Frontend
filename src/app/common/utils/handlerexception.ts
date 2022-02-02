import { HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import Swal from 'sweetalert2';


export class HandlerExceptions {
    static validarExcepcionesHTTP(e: HttpErrorResponse): Observable<any> {
        if (e.status == 0) {
            Swal.fire('Error inesperado', 'Por favor intente más tarde', 'error');
        }else if  (e.status == 204) {           
            Swal.fire('Error inesperado', 'Por favor intente más tarde', 'error');
        } else if (e.status == 401) {
            Swal.fire(e.error.title, 'Por favor autenticarse otra vez', 'error');        
        } else if (e.status == 400) {
            Swal.fire(e.statusText, e.message, 'error');
        } else if (e.status == 403) {
            Swal.fire('Permisos insuficientes', 'No tiene permisos para acceder a la funcionalidad', 'warning');
        } else if (e.status == 404) {
            Swal.fire('Error de autenticación', 'Usuario o clave incorrectas', 'error');
        } else if (e.status == 500) {
            Swal.fire('Error de autenticación', 'Por favor intente más tarde', 'error');
        }
        else {
            Swal.fire('Error', 'Error no controlado', 'error');
        }
        return throwError(e);
    }
}