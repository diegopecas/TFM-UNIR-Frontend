import { ModuleWithProviders } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
// import { LoginComponent } from './modulos/login/login.component';
import { PageNotFoundComponent } from './pagenotfound/pagenotfound.component';

export const routes: Routes = [
  // { path: '**', component: LoginComponent },
  //{ path: '', component: LoginComponent },
  //{ path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: '**',
    redirectTo: ''
  }
];