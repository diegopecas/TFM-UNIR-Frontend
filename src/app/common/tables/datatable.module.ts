import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';
import { NgSelect2Module } from 'ng-select2';
import { DatatableComponent } from 'src/app/common/tables/datatable.component';

@NgModule({
  declarations: [
      DatatableComponent
  ],
  imports: [
    CommonModule,
    DataTablesModule,
    NgSelect2Module
  ],
  exports: [
    DatatableComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class DatatableModule { }
