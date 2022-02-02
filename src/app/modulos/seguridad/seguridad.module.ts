import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { routesSeguridad } from './seguridad-routing.module';
import { GuardarRolesComponent } from './roles/guardar-roles/guardar-roles.component';
import { ConsultarRolesComponent } from './roles/consultar-roles/consultar-roles.component';
import { SeguridadComponent } from './seguridad.component';
import { DataTablesModule } from 'angular-datatables';
import { NgSelect2Module } from 'ng-select2';
import { ConsultarPermisosComponent } from './permisos/consultar-permisos/consultar-permisos.component';
import { DatatableModule } from 'src/app/common/tables/datatable.module';
import { ConsultarUsuariosComponent } from './usuarios/consultar-usuarios/consultar-usuarios.component';
import { LayoutModule } from 'src/app/common/layout/layout.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';
import { ConsultarPermisosRolComponent } from './permisos-rol/consultar-permisos-rol/consultar-permisos-rol.component';
@NgModule({
  declarations: [
    SeguridadComponent,
    GuardarRolesComponent,
    ConsultarRolesComponent,
    ConsultarPermisosComponent,
    ConsultarUsuariosComponent,
    ConsultarPermisosRolComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routesSeguridad),
    DatatableModule,
    NgSelect2Module,
    LayoutModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  exports: [
    SeguridadComponent,
    GuardarRolesComponent,
    ConsultarRolesComponent,
    ConsultarPermisosComponent,
    ConsultarUsuariosComponent,
    ConsultarPermisosRolComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class SeguridadModule { }
