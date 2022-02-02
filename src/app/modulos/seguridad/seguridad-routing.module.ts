import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SeguridadComponent } from './seguridad.component';
import { ConsultarRolesComponent } from './roles/consultar-roles/consultar-roles.component';
import { GuardarRolesComponent } from './roles/guardar-roles/guardar-roles.component';
import { ConsultarPermisosComponent } from './permisos/consultar-permisos/consultar-permisos.component';
import { ConsultarUsuariosComponent } from './usuarios/consultar-usuarios/consultar-usuarios.component';
import { ConsultarPermisosRolComponent } from './permisos-rol/consultar-permisos-rol/consultar-permisos-rol.component';

export const routesSeguridad: Routes = [
  {
    path: 'seguridad', component: SeguridadComponent,
    children: [
      { path: 'roles', component: ConsultarRolesComponent },
      { path: 'roles/guardar', component: GuardarRolesComponent },
      { path: 'roles/guardar/:id', component: GuardarRolesComponent },
      { path: 'permisos', component: ConsultarPermisosComponent },
      { path: 'permisos-rol/:rol', component: ConsultarPermisosRolComponent },
      { path: 'usuarios', component: ConsultarUsuariosComponent },
    ],
  },
];

// export const routing: ModuleWithProviders<any> = RouterModule.forChild(routes);