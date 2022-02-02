import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LoginComponent } from './login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegistroComponent } from './registro/registro.component';

export const routesLogin: Routes = [
  {
    path: "login", component: LoginComponent
  }
]

@NgModule({
    declarations: [
        LoginComponent,
        RegistroComponent
    ],
    imports: [
      CommonModule,
      RouterModule.forChild(routesLogin),
      // routing,
      FontAwesomeModule,
      FormsModule,
      ReactiveFormsModule
    ],
    exports: [
        LoginComponent,
        RegistroComponent
    ],
    providers: [{ provide: LOCALE_ID, useValue: 'es' }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
  })
  export class LoginModule {}