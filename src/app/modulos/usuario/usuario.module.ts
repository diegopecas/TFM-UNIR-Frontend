import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { routesUsuarios } from './usuario-routing.module';
import { DataTablesModule } from 'angular-datatables';
import { NgSelect2Module } from 'ng-select2';
import { DatatableModule } from 'src/app/common/tables/datatable.module';
import { InicioComponent } from './inicio/inicio.component';
import { LayoutModule } from 'src/app/common/layout/layout.module';
import { UsuarioComponent } from './usuario.component';

@NgModule({
  declarations: [
    UsuarioComponent,
    InicioComponent
  ],
  imports: [
    RouterModule.forChild(routesUsuarios),
    // RouterModule,
    // routing,
    /*CommonModule,
    DataTablesModule,
    DatatableModule,
    NgSelect2Module,
    */
   LayoutModule,
  ],
  exports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class UsuarioModule { }
