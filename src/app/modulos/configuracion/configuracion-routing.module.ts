import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConfiguracionComponent } from './configuracion.component';
import { ConsultarPruebasComponent } from './pruebas/consultar-pruebas/consultar-pruebas.component';
import { GuardarPruebasComponent } from './pruebas/guardar-pruebas/guardar-pruebas.component';
import { ConsultarPasosComponent } from './pruebas/pasos/consultar-pasos/consultar-pasos.component';
import { GuardarPasosComponent } from './pruebas/pasos/guardar-pasos/guardar-pasos.component';
import { ConsultarPreguntasComponent } from './pruebas/preguntas/consultar-preguntas/consultar-preguntas.component';
import { GuardarPreguntasComponent } from './pruebas/preguntas/guardar-preguntas/guardar-preguntas.component';

export const routesConfiguracion: Routes = [
  {
    path: 'configuracion',
    component: ConfiguracionComponent,
    children: [
      { path: 'pruebas', component: ConsultarPruebasComponent },
      { path: 'pruebas/guardar', component: GuardarPruebasComponent },
      { path: 'pruebas/guardar/:id', component: GuardarPruebasComponent },
      { path: 'pasos/:prueba', component: ConsultarPasosComponent },
      { path: 'pasos/guardar/:prueba', component: GuardarPasosComponent },
      { path: 'pasos/guardar/:prueba/:id', component: GuardarPasosComponent },
      { path: 'preguntas/:prueba/:paso', component: ConsultarPreguntasComponent },
      { path: 'preguntas/guardar/:prueba/:paso', component: GuardarPreguntasComponent },
      { path: 'preguntas/guardar/:prueba/:paso/:id', component: GuardarPreguntasComponent },
    ],
  },
];

// export const routing: ModuleWithProviders<any> = RouterModule.forChild(routes);
