import {
  CUSTOM_ELEMENTS_SCHEMA,
  NgModule,
  NO_ERRORS_SCHEMA,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { routesPruebas } from "./pruebas-routing.module";
import { PruebasComponent } from "./pruebas.component";
import { DataTablesModule } from "angular-datatables";
import { NgSelect2Module } from "ng-select2";
import { HistoricoUsuarioComponent } from "./historico-usuario/historico-usuario.component";
import { EjecutarPruebaComponent } from "./ejecutar-prueba/ejecutar-prueba.component";
import { DatatableComponent } from "src/app/common/tables/datatable.component";
import { LayoutModule } from "src/app/common/layout/layout.module";
import { DatatableModule } from "src/app/common/tables/datatable.module";
import { PruebasDisponiblesComponent } from "./pruebas-disponibles/pruebas-disponibles.component";
import { PasoComponent } from "./ejecutar-prueba/paso/paso.component";
import { PreguntaAbiertaComponent } from "./ejecutar-prueba/pregunta-abierta/pregunta-abierta.component";
import { PreguntaCerradaComponent } from "./ejecutar-prueba/pregunta-cerrada/pregunta-cerrada.component";
import { PreguntaCerradaMultiComponent } from "./ejecutar-prueba/pregunta-cerrada-multi/pregunta-cerrada-multi.component";
import { PreguntaSiNoComponent } from "./ejecutar-prueba/pregunta-sino/pregunta-sino.component";
import { MapaModule } from "src/app/common/mapa/mapa.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
// import { DatatableModule } from 'src/app/common/tables/datatable.module';

@NgModule({
  declarations: [
    PruebasComponent,
    HistoricoUsuarioComponent,
    EjecutarPruebaComponent,
    PruebasDisponiblesComponent,
    PasoComponent,
    PreguntaAbiertaComponent,
    PreguntaCerradaComponent,
    PreguntaCerradaMultiComponent,
    PreguntaSiNoComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routesPruebas),
    DatatableModule,
    LayoutModule,
    MapaModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    PruebasComponent,
    HistoricoUsuarioComponent,
    EjecutarPruebaComponent,
    PruebasDisponiblesComponent,
    PasoComponent,
    PreguntaAbiertaComponent,
    PreguntaCerradaComponent,
    PreguntaCerradaMultiComponent,
    PreguntaSiNoComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PruebasModule {}
