import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MapaComponent } from './mapa.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        MapaComponent
    ],
    imports: [
      CommonModule,
      // routing,
      FontAwesomeModule,
      FormsModule,
      ReactiveFormsModule
    ],
    exports: [
        MapaComponent
    ],
    providers: [{ provide: LOCALE_ID, useValue: 'es' }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
  })
  export class MapaModule {}