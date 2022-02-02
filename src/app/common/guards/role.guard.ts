import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SesionService } from '../services/sesion.service';
import Swal from 'sweetalert2';
import { CONFIG } from '../constants/constants';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private sesionService: SesionService,
    private router: Router) {

  }
  
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let role = next.data['role'] as string;
    if (!this.sesionService.isAuthenticated()) {
      this.router.navigate(CONFIG.LOGIN_PAGE);
      return false;
    }
    if(this.sesionService.hasRol(role)){
      return true;
    }
    Swal.fire('Acceso denegado','No puede ingresar a esta funcionalidad','error');
    return false;
  }
  
}
