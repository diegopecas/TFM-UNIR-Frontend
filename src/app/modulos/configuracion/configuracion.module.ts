import {
  CUSTOM_ELEMENTS_SCHEMA,
  NgModule,
  NO_ERRORS_SCHEMA,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { routesConfiguracion } from "./configuracion-routing.module";
import { ConsultarDominiosComponent } from "./dominios/consultar-dominios/consultar-dominios.component";
import { GuardarDominiosComponent } from "./dominios/guardar-dominios/guardar-dominios.component";
import { ConfiguracionComponent } from "./configuracion.component";
import { DataTablesModule } from "angular-datatables";
import { NgSelect2Module } from "ng-select2";
import { ConsultarPruebasComponent } from "./pruebas/consultar-pruebas/consultar-pruebas.component";
import { GuardarPruebasComponent } from "./pruebas/guardar-pruebas/guardar-pruebas.component";
import { DatatableModule } from "src/app/common/tables/datatable.module";
import { LayoutModule } from "src/app/common/layout/layout.module";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ConsultarPasosComponent } from "./pruebas/pasos/consultar-pasos/consultar-pasos.component";
import { GuardarPasosComponent } from "./pruebas/pasos/guardar-pasos/guardar-pasos.component";
import { ConsultarPreguntasComponent } from "./pruebas/preguntas/consultar-preguntas/consultar-preguntas.component";
import { GuardarPreguntasComponent } from "./pruebas/preguntas/guardar-preguntas/guardar-preguntas.component";
import { AngularEditorModule } from '@kolkov/angular-editor';

@NgModule({
  declarations: [
    ConfiguracionComponent,
    ConsultarDominiosComponent,
    GuardarDominiosComponent,
    ConsultarPruebasComponent,
    GuardarPruebasComponent,
    ConsultarPasosComponent,
    GuardarPasosComponent,
    ConsultarPreguntasComponent,
    GuardarPreguntasComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routesConfiguracion),
    NgSelect2Module,
    DatatableModule,
    LayoutModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    AngularEditorModule
  ],
  exports: [
    ConfiguracionComponent,
    ConsultarDominiosComponent,
    GuardarDominiosComponent,
    ConsultarPruebasComponent,
    GuardarPruebasComponent,
    ConsultarPasosComponent,
    GuardarPasosComponent,
    ConsultarPreguntasComponent,
    GuardarPreguntasComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class ConfiguracionModule {}
