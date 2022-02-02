import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
// import { routing } from 'src/app/app-routing.module';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { MenuIzquierdoComponent } from './menu-izquierdo/menu-izquierdo.component';
import { NavbarComponent } from './navbar/navbar.component';


@NgModule({
    declarations: [
      HeaderComponent,
      FooterComponent,
      NavbarComponent,
      MenuIzquierdoComponent
    ],
    imports: [
      CommonModule,
      RouterModule,
      // routing,
      FontAwesomeModule,
    ],
    exports: [
      HeaderComponent,
      FooterComponent,
      NavbarComponent,
      MenuIzquierdoComponent
    ],
    providers: [{ provide: LOCALE_ID, useValue: 'es' }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  })
  export class LayoutModule {}