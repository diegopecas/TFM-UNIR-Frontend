import { CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { routes } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './common/layout/header/header.component';
import { FooterComponent } from './common/layout/footer/footer.component';
import { NavbarComponent } from './common/layout/navbar/navbar.component';
import { MenuIzquierdoComponent } from './common/layout/menu-izquierdo/menu-izquierdo.component';
import { PageNotFoundComponent } from './pagenotfound/pagenotfound.component';
import { DataTablesModule } from 'angular-datatables';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LoginComponent } from './modulos/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from './common/layout/layout.module';
import { PruebasModule } from './modulos/pruebas/pruebas.module';
import { UsuarioModule } from './modulos/usuario/usuario.module';
import { LoginModule } from './modulos/login/login.module';
import { ConfiguracionModule } from './modulos/configuracion/configuracion.module';
import { SeguridadModule } from './modulos/seguridad/seguridad.module';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes, { useHash: true, enableTracing: false }),
    DataTablesModule,
    LayoutModule,
    FontAwesomeModule,
    FormsModule, 
    ReactiveFormsModule,
    PruebasModule,
    UsuarioModule,
    LoginModule,
    ConfiguracionModule,
    SeguridadModule
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'es' }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule {}
