import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SesionService } from '../services/sesion.service';
import { CONFIG } from '../constants/constants';

@Injectable({
  providedIn: 'root'
})
export class SesionGuard implements CanActivate {

  constructor(private sesionService: SesionService,
    private router: Router) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.sesionService.isAuthenticated()) {
      if(this.isTokenExpirado()){
        this.sesionService.logOut();
        this.router.navigate(CONFIG.LOGIN_PAGE);
        return false;
      }
      return true;
    }
    this.router.navigate(CONFIG.LOGIN_PAGE);
    return false;
  }

  isTokenExpirado():boolean{
    let payLoad = this.sesionService.obtenerDatosToken(this.sesionService.token);
    let now = new Date().getTime()/1000;
    if(payLoad.exp < now){
      return true;
    }
    return false;
  }
}
