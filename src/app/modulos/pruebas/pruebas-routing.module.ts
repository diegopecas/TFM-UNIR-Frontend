import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { EjecutarPruebaComponent } from "./ejecutar-prueba/ejecutar-prueba.component";
import { HistoricoUsuarioComponent } from "./historico-usuario/historico-usuario.component";
import { PruebasDisponiblesComponent } from "./pruebas-disponibles/pruebas-disponibles.component";
import { PruebasComponent } from "./pruebas.component";

export const routesPruebas: Routes = [
  {
    path: "pruebas",
    component: PruebasComponent,
    children: [
      { path: "disponibles", component: PruebasDisponiblesComponent },
      { path: "ejecutar/:prueba", component: EjecutarPruebaComponent },
      { path: "historico-usuario", component: HistoricoUsuarioComponent },
    ],
  },
];

// export const routing: ModuleWithProviders<any> = RouterModule.forChild(routes);
