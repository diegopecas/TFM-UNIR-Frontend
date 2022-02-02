import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { InicioComponent } from "./inicio/inicio.component";
import { UsuarioComponent } from "./usuario.component";

export const routesUsuarios: Routes = [
  {
    path: "usuarios", component: UsuarioComponent,
    children: [{ path: "inicio", component: InicioComponent }],
  },
];

// export const routing: ModuleWithProviders<any> = RouterModule.forChild(routes);
